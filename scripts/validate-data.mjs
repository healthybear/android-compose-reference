import { readFileSync, readdirSync, statSync } from 'node:fs'
import { createRequire } from 'node:module'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryDir = dirname(dirname(fileURLToPath(import.meta.url)))
const webDir = join(repositoryDir, 'web')
const componentsDir = join(webDir, 'src', 'data', 'components')
const guidesFile = join(webDir, 'src', 'data', 'guides', 'index.ts')
const requireFromWeb = createRequire(join(webDir, 'package.json'))
const ts = requireFromWeb('typescript')

const errors = []
const componentIds = new Map()
const guideIds = new Map()
const components = new Map()

const validCategories = new Set([
  'Layout', 'LazyList', 'Foundation', 'Modifier', 'Theme', 'Form', 'Material',
  'Feedback', 'Navigation', 'Animation', 'Gestures', 'State', 'Advanced', 'Ecosystem',
])
const validDifficulties = new Set(['beginner', 'intermediate', 'advanced'])
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function listFiles(directory, predicate) {
  return readdirSync(directory).flatMap((name) => {
    const file = join(directory, name)
    return statSync(file).isDirectory()
      ? listFiles(file, predicate)
      : predicate(file) ? [file] : []
  })
}

function parseFile(file) {
  return ts.createSourceFile(
    file,
    readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  )
}

function location(source, node) {
  const position = source.getLineAndCharacterOfPosition(node.getStart(source))
  return `${source.fileName}:${position.line + 1}`
}

function propertyName(property) {
  if (!property.name) return undefined
  if (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) return property.name.text
}

function objectProperty(object, name) {
  return object.properties.find(property =>
    ts.isPropertyAssignment(property) && propertyName(property) === name,
  )
}

function stringValue(source, object, name, required = true) {
  const property = objectProperty(object, name)
  if (!property) {
    if (required) errors.push(`${location(source, object)}: missing required field '${name}'`)
    return undefined
  }
  if (!ts.isPropertyAssignment(property) || !isStringLiteral(property.initializer)) {
    errors.push(`${location(source, property)}: field '${name}' must be a string literal`)
    return undefined
  }
  const value = property.initializer.text
  if (value.trim() === '') {
    errors.push(`${location(source, property)}: field '${name}' must not be empty`)
  }
  return value
}

function isStringLiteral(node) {
  return ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)
}

function arrayValue(source, object, name, required = true) {
  const property = objectProperty(object, name)
  if (!property) {
    if (required) errors.push(`${location(source, object)}: missing required field '${name}'`)
    return undefined
  }
  if (!ts.isPropertyAssignment(property) || !ts.isArrayLiteralExpression(property.initializer)) {
    errors.push(`${location(source, property)}: field '${name}' must be an array literal`)
    return undefined
  }
  return property.initializer
}

function booleanValue(source, object, name) {
  const property = objectProperty(object, name)
  if (!property) return undefined
  if (!ts.isPropertyAssignment(property) || (property.initializer.kind !== ts.SyntaxKind.TrueKeyword && property.initializer.kind !== ts.SyntaxKind.FalseKeyword)) {
    errors.push(`${location(source, property)}: field '${name}' must be a boolean literal`)
  }
}

function validateStringArray(source, array, field, options = {}) {
  const values = []
  for (const [index, element] of array.elements.entries()) {
    if (!isStringLiteral(element)) {
      errors.push(`${location(source, element)}: ${field}[${index}] must be a string literal`)
      continue
    }
    const value = element.text
    if (value.trim() === '') errors.push(`${location(source, element)}: ${field}[${index}] must not be empty`)
    values.push(value)
  }
  if (options.unique) {
    const seen = new Set()
    for (const value of values) {
      if (seen.has(value)) errors.push(`${location(source, array)}: duplicate value '${value}' in ${field}`)
      seen.add(value)
    }
  }
  return values
}

function findObjectEntries(source) {
  const entries = []
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const declaration of statement.declarationList.declarations) {
      if (declaration.initializer && ts.isObjectLiteralExpression(declaration.initializer)) {
        entries.push(declaration.initializer)
      }
    }
  }
  return entries.filter(entry => objectProperty(entry, 'id') && objectProperty(entry, 'name'))
}

function validateComponent(source, object) {
  const id = stringValue(source, object, 'id')
  const name = stringValue(source, object, 'name')
  const category = stringValue(source, object, 'category')
  stringValue(source, object, 'description')
  const tags = arrayValue(source, object, 'tags')
  const params = arrayValue(source, object, 'params')
  const examples = arrayValue(source, object, 'examples')

  if (id) {
    if (!idPattern.test(id)) errors.push(`${location(source, object)}: component ID '${id}' must use kebab-case`)
    if (componentIds.has(id)) errors.push(`${location(source, object)}: duplicate component ID '${id}', first declared at ${componentIds.get(id)}`)
    componentIds.set(id, location(source, object))
    components.set(id, { source, object })
  }
  if (name && name.trim() === '') errors.push(`${location(source, object)}: component name must not be empty`)
  if (category && !validCategories.has(category)) errors.push(`${location(source, object)}: unknown component category '${category}'`)

  if (tags) {
    if (tags.elements.length === 0) errors.push(`${location(source, tags)}: tags must not be empty`)
    validateStringArray(source, tags, 'tags', { unique: true })
  }

  if (params) {
    const names = new Set()
    for (const [index, element] of params.elements.entries()) {
      if (!ts.isObjectLiteralExpression(element)) {
        errors.push(`${location(source, element)}: params[${index}] must be an object literal`)
        continue
      }
      const paramName = stringValue(source, element, 'name')
      stringValue(source, element, 'type')
      stringValue(source, element, 'description')
      stringValue(source, element, 'default', false)
      booleanValue(source, element, 'required')
      if (paramName) {
        if (names.has(paramName)) errors.push(`${location(source, element)}: duplicate parameter '${paramName}'`)
        names.add(paramName)
      }
    }
  }

  if (examples) {
    if (examples.elements.length === 0) errors.push(`${location(source, examples)}: examples must not be empty`)
    for (const [index, element] of examples.elements.entries()) {
      if (!ts.isObjectLiteralExpression(element)) {
        errors.push(`${location(source, element)}: examples[${index}] must be an object literal`)
        continue
      }
      stringValue(source, element, 'title')
      stringValue(source, element, 'code')
      stringValue(source, element, 'description', false)
    }
  }
}

const componentFiles = listFiles(componentsDir, file => file.endsWith('.ts') && basename(file) !== 'index.ts')
for (const file of componentFiles) {
  const source = parseFile(file)
  const entries = findObjectEntries(source)
  if (entries.length === 0) {
    errors.push(`${file}: ComponentEntry object was not found`)
    continue
  }
  if (entries.length > 1) errors.push(`${file}: expected one ComponentEntry object, found ${entries.length}`)
  validateComponent(source, entries[0])
}

function findGuidesArray(source) {
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const declaration of statement.declarationList.declarations) {
      if (
        ts.isIdentifier(declaration.name)
        && declaration.name.text === 'guides'
        && declaration.initializer
        && ts.isArrayLiteralExpression(declaration.initializer)
      ) return declaration.initializer
    }
  }
}

function validateGuide(source, object, index) {
  const id = stringValue(source, object, 'id')
  stringValue(source, object, 'title')
  stringValue(source, object, 'description')
  stringValue(source, object, 'icon')
  const difficulty = stringValue(source, object, 'difficulty')
  const related = arrayValue(source, object, 'relatedComponents', false)
  const steps = arrayValue(source, object, 'steps')

  if (id) {
    if (!idPattern.test(id)) errors.push(`${location(source, object)}: guide ID '${id}' must use kebab-case`)
    if (guideIds.has(id)) errors.push(`${location(source, object)}: duplicate guide ID '${id}', first declared at ${guideIds.get(id)}`)
    guideIds.set(id, location(source, object))
  }
  if (difficulty && !validDifficulties.has(difficulty)) errors.push(`${location(source, object)}: unknown guide difficulty '${difficulty}'`)
  if (related) validateStringArray(source, related, `guides[${index}].relatedComponents`, { unique: true })

  if (!steps) return
  if (steps.elements.length === 0) errors.push(`${location(source, steps)}: guides[${index}].steps must not be empty`)
  for (const [stepIndex, element] of steps.elements.entries()) {
    if (!ts.isObjectLiteralExpression(element)) {
      errors.push(`${location(source, element)}: guides[${index}].steps[${stepIndex}] must be an object literal`)
      continue
    }
    stringValue(source, element, 'title')
    stringValue(source, element, 'content')
    stringValue(source, element, 'code', false)
    stringValue(source, element, 'tip', false)
    const previewUrl = stringValue(source, element, 'previewUrl', false)
    if (previewUrl && !previewUrl.startsWith('/demos/index.html?demo=')) {
      errors.push(`${location(source, element)}: previewUrl must target /demos/index.html?demo=...`)
    }
  }
}

const guideSource = parseFile(guidesFile)
const guidesArray = findGuidesArray(guideSource)
if (!guidesArray) {
  errors.push(`${guidesFile}: guides array was not found`)
} else {
  for (const [index, element] of guidesArray.elements.entries()) {
    if (!ts.isObjectLiteralExpression(element)) {
      errors.push(`${location(guideSource, element)}: guides[${index}] must be an object literal`)
      continue
    }
    validateGuide(guideSource, element, index)
  }
}

for (const [guideId, guideLocation] of guideIds) {
  const guide = guidesArray?.elements.find(element =>
    ts.isObjectLiteralExpression(element)
    && stringValue(guideSource, element, 'id', false) === guideId,
  )
  const related = guide && objectProperty(guide, 'relatedComponents')
  if (!related || !ts.isPropertyAssignment(related) || !ts.isArrayLiteralExpression(related.initializer)) continue
  for (const componentId of validateStringArray(guideSource, related.initializer, `guide '${guideId}'.relatedComponents`)) {
    if (!components.has(componentId)) {
      errors.push(`${location(guideSource, related)}: guide '${guideId}' references unknown component '${componentId}'`)
    }
  }
}

for (const [componentId, entry] of components) {
  const related = objectProperty(entry.object, 'relatedComponents')
  if (!related) continue
  if (!ts.isPropertyAssignment(related) || !ts.isArrayLiteralExpression(related.initializer)) {
    errors.push(`${location(entry.source, related)}: component '${componentId}'.relatedComponents must be an array literal`)
    continue
  }
  for (const relatedId of validateStringArray(entry.source, related.initializer, `component '${componentId}'.relatedComponents`, { unique: true })) {
    if (!components.has(relatedId)) {
      errors.push(`${location(entry.source, related)}: component '${componentId}' references unknown component '${relatedId}'`)
    }
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`Validated ${components.size} components and ${guideIds.size} guides with schema and reference checks.`)

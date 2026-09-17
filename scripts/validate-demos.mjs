import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { createRequire } from 'node:module'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryDir = dirname(dirname(fileURLToPath(import.meta.url)))
const webDir = join(repositoryDir, 'web')
const componentsDir = join(webDir, 'src', 'data', 'components')
const demosDir = join(repositoryDir, 'compose-demos', 'src', 'wasmJsMain', 'kotlin', 'demos')
const registryFile = join(demosDir, 'DemoRegistry.kt')
const demoProgressFile = join(repositoryDir, 'docs', 'demo-progress.md')
const requireFromWeb = createRequire(join(webDir, 'package.json'))
const ts = requireFromWeb('typescript')

const errors = []

function listFiles(directory, predicate) {
  return readdirSync(directory).flatMap((name) => {
    const file = join(directory, name)
    return statSync(file).isDirectory()
      ? listFiles(file, predicate)
      : predicate(file) ? [file] : []
  })
}

function propertyName(property) {
  if (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) {
    return property.name.text
  }
}

function findProperty(object, name) {
  return object.properties.find(property =>
    ts.isPropertyAssignment(property) && propertyName(property) === name,
  )
}

function stringProperty(object, name, file) {
  const property = findProperty(object, name)
  if (!property || !ts.isPropertyAssignment(property) || !ts.isStringLiteral(property.initializer)) {
    errors.push(`${file}: expected ${name} to be a string literal`)
    return undefined
  }
  return property.initializer.text
}

function componentEntry(file) {
  const source = ts.createSourceFile(
    file,
    readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  )

  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const declaration of statement.declarationList.declarations) {
      if (!declaration.initializer || !ts.isObjectLiteralExpression(declaration.initializer)) continue
      const object = declaration.initializer
      if (findProperty(object, 'id') && findProperty(object, 'name')) return object
    }
  }

  errors.push(`${file}: ComponentEntry object was not found`)
}

const componentIds = new Map()
const webDemos = new Map()
const componentFiles = listFiles(componentsDir, file =>
  file.endsWith('.ts') && basename(file) !== 'index.ts',
)

for (const file of componentFiles) {
  const entry = componentEntry(file)
  if (!entry) continue

  const componentId = stringProperty(entry, 'id', file)
  if (!componentId) continue
  if (componentIds.has(componentId)) {
    errors.push(`Duplicate component ID '${componentId}': ${componentIds.get(componentId)} and ${file}`)
  }
  componentIds.set(componentId, file)

  const demoProperty = findProperty(entry, 'demo')
  if (!demoProperty || !ts.isPropertyAssignment(demoProperty)) continue
  if (!ts.isObjectLiteralExpression(demoProperty.initializer)) {
    errors.push(`${file}: demo must be an object literal`)
    continue
  }

  const demoId = stringProperty(demoProperty.initializer, 'id', file)
  const sourceFile = stringProperty(demoProperty.initializer, 'sourceFile', file)
  if (!demoId || !sourceFile) continue
  if (webDemos.has(demoId)) {
    errors.push(`Duplicate Demo ID '${demoId}': ${webDemos.get(demoId).file} and ${file}`)
  }
  webDemos.set(demoId, { file, sourceFile })
}

const registryText = readFileSync(registryFile, 'utf8')
const registryPattern = /^\s*"([^"]+)"\s+to\s+\{\s*([A-Za-z0-9_]+)\(\)\s*\},$/gm
const registryDemos = new Map()

for (const match of registryText.matchAll(registryPattern)) {
  const [, demoId, functionName] = match
  const sourceFile = `${functionName}.kt`
  if (registryDemos.has(demoId)) errors.push(`Duplicate DemoRegistry ID '${demoId}'`)
  registryDemos.set(demoId, sourceFile)
}

for (const [demoId, metadata] of webDemos) {
  const registrySource = registryDemos.get(demoId)
  if (!registrySource) {
    errors.push(`${metadata.file}: Demo ID '${demoId}' is missing from DemoRegistry`)
    continue
  }
  if (metadata.sourceFile !== registrySource) {
    errors.push(
      `${metadata.file}: sourceFile '${metadata.sourceFile}' does not match DemoRegistry source '${registrySource}'`,
    )
  }
  if (!existsSync(join(demosDir, metadata.sourceFile))) {
    errors.push(`${metadata.file}: source file '${metadata.sourceFile}' does not exist`)
  }
}

for (const [demoId, sourceFile] of registryDemos) {
  if (!webDemos.has(demoId)) errors.push(`DemoRegistry ID '${demoId}' is missing from component metadata`)
  if (!existsSync(join(demosDir, sourceFile))) {
    errors.push(`DemoRegistry source file '${sourceFile}' does not exist`)
  }
}

const registeredSourceFiles = new Set(registryDemos.values())
const demoSourceFiles = readdirSync(demosDir).filter(file => file.endsWith('Demo.kt'))
for (const sourceFile of demoSourceFiles) {
  if (!registeredSourceFiles.has(sourceFile)) {
    errors.push(`Kotlin Demo source '${sourceFile}' is missing from DemoRegistry`)
  }
}

const progressText = readFileSync(demoProgressFile, 'utf8')
const completedRowPattern = /^\| \[x\] \| `([^`]+)` \| `([^`]+)` \|/gm
const documentedDemos = new Map()

for (const match of progressText.matchAll(completedRowPattern)) {
  const [, sourceFile, demoId] = match
  if (documentedDemos.has(demoId)) {
    errors.push(`${demoProgressFile}: duplicate completed Demo ID '${demoId}'`)
  }
  documentedDemos.set(demoId, sourceFile)
}

for (const [demoId, metadata] of webDemos) {
  const documentedSource = documentedDemos.get(demoId)
  if (!documentedSource) {
    errors.push(`${demoProgressFile}: Demo ID '${demoId}' is missing from the completed rows`)
  } else if (documentedSource !== metadata.sourceFile) {
    errors.push(
      `${demoProgressFile}: Demo ID '${demoId}' documents '${documentedSource}', expected '${metadata.sourceFile}'`,
    )
  }
}

for (const demoId of documentedDemos.keys()) {
  if (!webDemos.has(demoId)) {
    errors.push(`${demoProgressFile}: completed Demo ID '${demoId}' is missing from component metadata`)
  }
}

function documentedCount(pattern, expected, label) {
  const match = progressText.match(pattern)
  if (!match) {
    errors.push(`${demoProgressFile}: missing summary value '${label}'`)
  } else if (Number(match[1]) !== expected) {
    errors.push(`${demoProgressFile}: ${label} is ${match[1]}, expected ${expected}`)
  }
}

const skippedCount = [...progressText.matchAll(/^\| \[-\] \|/gm)].length
documentedCount(/- 组件文档条目：\*\*(\d+)\*\*/, componentIds.size, '组件文档条目')
documentedCount(/- 已完成并注册 Demo：\*\*(\d+)\*\*/, webDemos.size, '已完成并注册 Demo')
documentedCount(/- 明确跳过项：\*\*(\d+)\*\*/, skippedCount, '明确跳过项')

const coverage = progressText.match(/- 交互预览覆盖：\*\*(\d+) \/ (\d+)\*\*/)
if (!coverage) {
  errors.push(`${demoProgressFile}: missing summary value '交互预览覆盖'`)
} else if (Number(coverage[1]) !== webDemos.size || Number(coverage[2]) !== componentIds.size) {
  errors.push(
    `${demoProgressFile}: 交互预览覆盖 is ${coverage[1]} / ${coverage[2]}, expected ${webDemos.size} / ${componentIds.size}`,
  )
}

if (errors.length > 0) {
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(
  `Validated ${webDemos.size} Demo metadata, registry, Kotlin source, and progress document entries.`,
)

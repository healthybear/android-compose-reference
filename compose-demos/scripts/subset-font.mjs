import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

const projectDir = resolve(import.meta.dirname, '..')
const sourceFont = join(projectDir, 'fonts', 'NotoSansSC-Regular.otf')
const kotlinSourcesDir = join(projectDir, 'src', 'wasmJsMain', 'kotlin')
const outputFont = join(projectDir, 'build', 'generated', 'composeResources', 'font', 'NotoSansSC-Regular.otf')
const charactersFile = join(projectDir, 'build', 'generated', 'font-subset-characters.txt')
const python = process.env.PYTHON ?? (process.platform === 'win32' ? 'python' : 'python3')

function kotlinFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? kotlinFiles(path) : entry.name.endsWith('.kt') ? [path] : []
  })
}

if (!existsSync(sourceFont)) {
  throw new Error(`Missing source font: ${sourceFont}`)
}

// Include every character in the compiled source as a conservative, reproducible
// superset of UI strings, plus printable ASCII for runtime-generated labels.
const compiledSource = kotlinFiles(kotlinSourcesDir)
  .map(path => readFileSync(path, 'utf8'))
  .join('')
const fallbackCharacters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  + ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~…·•—–“”‘’（）【】《》、，。！？：；￥％＋＝＜＞'
const characters = [...new Set((compiledSource + fallbackCharacters))]
  .sort((left, right) => left.codePointAt(0) - right.codePointAt(0))
  .join('')

mkdirSync(dirname(outputFont), { recursive: true })
writeFileSync(charactersFile, characters)

const result = spawnSync(python, [
  '-m', 'fontTools.subset',
  sourceFont,
  `--output-file=${outputFont}`,
  `--text-file=${charactersFile}`,
  '--layout-features=*',
  '--name-IDs=*',
  '--name-legacy',
  '--glyph-names',
  '--symbol-cmap',
  '--legacy-cmap',
  '--notdef-glyph',
  '--notdef-outline',
  '--recommended-glyphs',
], { stdio: 'inherit' })

if (result.error) throw result.error
if (result.status !== 0 || !existsSync(outputFont)) {
  throw new Error('Font subsetting failed. Install FontTools with: python -m pip install fonttools')
}

const validation = spawnSync(python, ['-c', `
from pathlib import Path
from fontTools.ttLib import TTFont
import sys

def codepoints(path):
    font = TTFont(path)
    return set().union(*(table.cmap.keys() for table in font['cmap'].tables))

source, subset, characters = sys.argv[1:]
source_codepoints = codepoints(source)
subset_codepoints = codepoints(subset)
missing = [character for character in set(Path(characters).read_text())
           if ord(character) in source_codepoints and ord(character) not in subset_codepoints]
if missing:
    raise SystemExit(f'Subset is missing {len(missing)} glyphs present in the source font')
`, sourceFont, outputFont, charactersFile], { stdio: 'inherit' })

if (validation.error) throw validation.error
if (validation.status !== 0) throw new Error('Subset font glyph validation failed')

const sourceBytes = statSync(sourceFont).size
const outputBytes = statSync(outputFont).size
if (outputBytes >= sourceBytes) {
  rmSync(outputFont)
  throw new Error(`Subset font (${outputBytes} B) is not smaller than source (${sourceBytes} B)`)
}

console.log(`Subset Noto Sans SC: ${sourceBytes} B -> ${outputBytes} B (${[...characters].length} characters)`)

import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryDir = dirname(dirname(fileURLToPath(import.meta.url)))
const distDir = join(repositoryDir, 'web', 'dist')
const demosDir = join(distDir, 'demos')
const requiredFiles = [
  join(distDir, 'index.html'),
  join(demosDir, 'index.html'),
  join(demosDir, 'compose-demos.js'),
]

const missingFiles = requiredFiles.filter(file => !existsSync(file))
const wasmFiles = existsSync(demosDir)
  ? readdirSync(demosDir).filter(file => file.endsWith('.wasm'))
  : []
const demoBundle = join(demosDir, 'compose-demos.js')
const referencedWasmFiles = existsSync(demoBundle)
  ? [...new Set(readFileSync(demoBundle, 'utf8').match(/[a-f0-9]{20}\.wasm/gi) ?? [])]
  : []
const unreferencedWasmFiles = wasmFiles.filter(file => !referencedWasmFiles.includes(file))
const missingWasmFiles = referencedWasmFiles.filter(file => !wasmFiles.includes(file))

if (
  missingFiles.length > 0
  || wasmFiles.length === 0
  || referencedWasmFiles.length === 0
  || unreferencedWasmFiles.length > 0
  || missingWasmFiles.length > 0
) {
  for (const file of missingFiles) {
    console.error(`Missing build artifact: ${file}`)
  }
  if (wasmFiles.length === 0) {
    console.error(`No Wasm artifacts found in: ${demosDir}`)
  }
  if (referencedWasmFiles.length === 0) {
    console.error(`No Wasm references found in: ${demoBundle}`)
  }
  for (const file of unreferencedWasmFiles) {
    console.error(`Unreferenced Wasm artifact: ${join(demosDir, file)}`)
  }
  for (const file of missingWasmFiles) {
    console.error(`Missing referenced Wasm artifact: ${join(demosDir, file)}`)
  }
  process.exit(1)
}

console.log(`Verified Web bundle with ${wasmFiles.length} referenced Wasm artifacts.`)

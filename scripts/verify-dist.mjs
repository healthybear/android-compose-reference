import { existsSync, readdirSync } from 'node:fs'
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

if (missingFiles.length > 0 || wasmFiles.length === 0) {
  for (const file of missingFiles) {
    console.error(`Missing build artifact: ${file}`)
  }
  if (wasmFiles.length === 0) {
    console.error(`No Wasm artifacts found in: ${demosDir}`)
  }
  process.exit(1)
}

console.log(`Verified Web bundle with ${wasmFiles.length} Wasm artifacts.`)

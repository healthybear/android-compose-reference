import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryDir = dirname(dirname(fileURLToPath(import.meta.url)))
const projectDir = join(repositoryDir, 'compose-demos')
const isWindows = process.platform === 'win32'
const wrapper = isWindows ? join(projectDir, 'gradlew.bat') : './gradlew'
const args = process.argv.slice(2)

if (args.length === 0) {
  console.error('Usage: node scripts/run-gradle.mjs <task> [...args]')
  process.exit(1)
}

const result = spawnSync(wrapper, args, {
  cwd: projectDir,
  stdio: 'inherit',
  shell: isWindows,
})

if (result.error) {
  console.error(`Failed to start Gradle Wrapper: ${result.error.message}`)
  process.exit(1)
}

process.exit(result.status ?? 1)

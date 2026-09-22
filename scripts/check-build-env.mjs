#!/usr/bin/env node
import { spawnSync } from 'node:child_process'

console.log('检查构建环境...\n')

const checks = [
  {
    name: 'Node.js',
    command: 'node',
    args: ['--version'],
    required: '22.x',
    validate: (output) => {
      const match = output.match(/v(\d+)\./)
      return match && match[1] === '22'
    }
  },
  {
    name: 'pnpm',
    command: 'pnpm',
    args: ['--version'],
    required: '10.15.1',
    validate: (output) => {
      const version = output.trim()
      return version.startsWith('10.') || version.startsWith('10')
    }
  },
  {
    name: 'JDK',
    command: 'java',
    args: ['-version'],
    required: '17',
    validate: (output) => {
      const match = output.match(/version "(\d+)/)
      return match && match[1] === '17'
    }
  },
  {
    name: 'Python',
    command: process.platform === 'win32' ? 'python' : 'python3',
    args: ['--version'],
    required: '3.8+',
    validate: (output) => {
      const match = output.match(/Python (\d+)\.(\d+)/)
      if (!match) return false
      const major = parseInt(match[1])
      const minor = parseInt(match[2])
      return major === 3 && minor >= 8 || major > 3
    }
  },
  {
    name: 'FontTools',
    command: process.platform === 'win32' ? 'python' : 'python3',
    args: ['-m', 'pip', 'list'],
    required: '已安装',
    validate: (output) => output.includes('fonttools')
  }
]

let allPassed = true

for (const check of checks) {
  process.stdout.write(`✓ ${check.name.padEnd(12)} `)

  const result = spawnSync(check.command, check.args, {
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
    shell: true
  })

  const output = result.stdout || result.stderr || ''

  if (result.error) {
    console.log(`❌ 未安装`)
    console.log(`  要求: ${check.required}`)
    allPassed = false
    continue
  }

  // 某些命令（如 java -version）输出到 stderr 但退出码为 0
  if (result.status !== 0 && !output) {
    console.log(`❌ 未安装或执行失败`)
    console.log(`  要求: ${check.required}`)
    allPassed = false
    continue
  }

  const isValid = check.validate(output)
  if (isValid) {
    const version = output.split('\n')[0].trim()
    console.log(`✅ ${version}`)
  } else {
    console.log(`⚠️  版本不符`)
    console.log(`  当前: ${output.split('\n')[0].trim()}`)
    console.log(`  要求: ${check.required}`)
    allPassed = false
  }
}

console.log('')

if (allPassed) {
  console.log('✅ 所有环境检查通过！可以执行 pnpm run build')
} else {
  console.log('❌ 部分环境检查未通过，请按要求安装或升级相关工具')
  console.log('')
  console.log('安装指引：')
  console.log('  - Node.js 22.x: https://nodejs.org/')
  console.log('  - pnpm: corepack enable && corepack prepare pnpm@10.15.1 --activate')
  console.log('  - JDK 17: https://adoptium.net/')
  console.log('  - Python 3.8+: https://www.python.org/')
  console.log('  - FontTools: python -m pip install fonttools')
  process.exit(1)
}

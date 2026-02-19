import { defineConfig, presetUno, presetAttributify } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
  ],
  // 让 UnoCSS 扫描 Vue 文件
  content: {
    filesystem: ['./src/**/*.{vue,ts}'],
  },
  // 用 CSS 变量映射 EP 设计 token，方便在类名中直接引用
  theme: {
    colors: {
      'el-primary':           'var(--el-color-primary)',
      'el-bg':                'var(--el-bg-color)',
      'el-border':            'var(--el-border-color)',
      'el-fill':              'var(--el-fill-color)',
      'el-fill-light':        'var(--el-fill-color-light)',
      'el-text':              'var(--el-text-color-primary)',
      'el-text-secondary':    'var(--el-text-color-secondary)',
      'el-text-regular':      'var(--el-text-color-regular)',
      'el-text-placeholder':  'var(--el-text-color-placeholder)',
      'el-success-dark':      'var(--el-color-success-dark-2)',
    },
  },
  shortcuts: {
    // 代码标签通用样式
    'code-tag': 'font-mono text-13px bg-el-fill px-6px py-2px rounded',
  },
})

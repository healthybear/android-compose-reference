import { ref, watch } from 'vue'

// 使用 Element Plus 的暗色模式类名 'dark'
const isDark = ref(localStorage.getItem('theme') === 'dark')

watch(
  isDark,
  (val) => {
    document.documentElement.classList.toggle('dark', val)
    localStorage.setItem('theme', val ? 'dark' : 'light')
  },
  { immediate: true }
)

export function useTheme() {
  return {
    isDark,
    toggle: () => {
      isDark.value = !isDark.value
    },
  }
}

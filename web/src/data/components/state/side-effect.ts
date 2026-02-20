import type { ComponentEntry } from '../../types'

export const sideEffectComponent: ComponentEntry = {
  id: 'side-effect',
  name: 'SideEffect',
  category: 'State',
  description: '每次重组成功后同步执行副作用，用于将 Compose 状态同步到非 Compose 管理的对象（如 Analytics、View 系统）。',
  tags: ['effect', 'side-effect', 'sync', 'analytics', '同步副作用'],
  params: [
    { name: 'effect', type: '() -> Unit', required: true, description: '每次重组成功后执行的副作用块，在主线程同步执行' },
  ],
  examples: [
    {
      title: '同步状态到 Analytics',
      code: `@Composable
fun ScreenTracker(screenName: String, analytics: Analytics) {
    SideEffect {
        // 每次重组后更新 Analytics 的当前页面
        analytics.setCurrentScreen(screenName)
    }
}`,
    },
    {
      title: '同步到非 Compose 对象',
      code: `@Composable
fun MapView(mapController: MapController, cameraPosition: CameraPosition) {
    SideEffect {
        // 将 Compose 状态同步到传统 View 系统的 MapController
        mapController.moveTo(cameraPosition)
    }
    // ...
}`,
    },
  ],
}

import type { ComponentEntry } from '../../types'

export const produceStateComponent: ComponentEntry = {
  id: 'produce-state',
  name: 'produceState',
  category: 'State',
  description: '将非 Compose 的异步数据源（Flow、suspend 函数、回调）转换为 Compose State，在协程中更新值。',
  tags: ['state', 'async', 'coroutine', 'flow', '异步状态'],
  params: [
    { name: 'initialValue', type: 'T', required: true, description: '初始值，在异步数据到达前显示' },
    { name: 'keys', type: 'vararg Any?', default: '（无）', description: '依赖键，键变化时重新启动协程' },
    { name: 'producer', type: 'suspend ProduceStateScope<T>.() -> Unit', required: true, description: '协程块，通过 value = ... 更新状态' },
  ],
  examples: [
    {
      title: '加载网络数据',
      code: `val uiState by produceState<Result<User>>(initialValue = Result.Loading, userId) {
    value = try {
        Result.Success(userRepository.getUser(userId))
    } catch (e: Exception) {
        Result.Failure(e)
    }
}

when (val state = uiState) {
    is Result.Loading  -> CircularProgressIndicator()
    is Result.Success  -> Text(state.data.name)
    is Result.Failure  -> Text("加载失败：${state.error.message}")
}`,
    },
    {
      title: '监听回调 API',
      code: `// 将基于回调的 API 转为 State
val location by produceState<Location?>(initialValue = null) {
    val listener = LocationListener { loc -> value = loc }
    locationManager.requestUpdates(listener)
    awaitDispose { locationManager.removeUpdates(listener) }
}

location?.let { Text("位置：${it.latitude}, ${it.longitude}") }`,
    },
  ],
}

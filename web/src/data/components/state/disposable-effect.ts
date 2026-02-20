import type { ComponentEntry } from '../../types'

export const disposableEffectComponent: ComponentEntry = {
  id: 'disposable-effect',
  name: 'DisposableEffect',
  category: 'State',
  description: '需要清理的副作用，在 key 变化或组件离开组合时执行 onDispose 清理块，适合注册/注销监听器。',
  tags: ['effect', 'dispose', 'cleanup', 'lifecycle', '清理副作用'],
  params: [
    { name: 'key1', type: 'Any?', required: true, description: '依赖键，变化时先执行 onDispose 再重新执行 effect' },
    { name: 'effect', type: 'DisposableEffectScope.() -> DisposableEffectResult', required: true, description: '副作用块，必须以 onDispose { } 结尾' },
  ],
  examples: [
    {
      title: '注册/注销生命周期监听',
      code: `@Composable
fun LifecycleObserver(onResume: () -> Unit, onPause: () -> Unit) {
    val lifecycleOwner = LocalLifecycleOwner.current

    DisposableEffect(lifecycleOwner) {
        val observer = LifecycleEventObserver { _, event ->
            when (event) {
                Lifecycle.Event.ON_RESUME -> onResume()
                Lifecycle.Event.ON_PAUSE  -> onPause()
                else -> {}
            }
        }
        lifecycleOwner.lifecycle.addObserver(observer)

        onDispose {
            lifecycleOwner.lifecycle.removeObserver(observer)
        }
    }
}`,
    },
    {
      title: '注册广播接收器',
      code: `@Composable
fun NetworkStatusObserver(onStatusChange: (Boolean) -> Unit) {
    val context = LocalContext.current

    DisposableEffect(Unit) {
        val receiver = object : BroadcastReceiver() {
            override fun onReceive(ctx: Context, intent: Intent) {
                onStatusChange(isNetworkAvailable(ctx))
            }
        }
        val filter = IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION)
        context.registerReceiver(receiver, filter)

        onDispose {
            context.unregisterReceiver(receiver)
        }
    }
}`,
    },
  ],
}

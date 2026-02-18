# Jetpack Compose 速查站

Vue 3 + Element Plus 文档站，Compose Multiplatform (Kotlin/Wasm) 交互预览。

## 项目结构

```
web/              Vue 3 + Vite 前端
compose-demos/    Kotlin/Wasm Demo 源码（Compose Multiplatform）
```

## 快速开始

### 1. 安装依赖并启动 Vue 开发服务器

```bash
pnpm install
pnpm dev
```

访问 http://localhost:5173

### 2. 编译 Compose Demo（需要 JDK 17+）

```bash
cd compose-demos

# Windows
./gradlew.bat wasmJsBrowserDistribution

# macOS / Linux
./gradlew wasmJsBrowserDistribution
```

编译完成后产物自动复制到 `web/public/demos/`，刷新页面即可看到交互预览。

### 3. 生产构建

```bash
pnpm build:demos   # 编译 Wasm（需要 JDK）
pnpm build:web     # 打包 Vue
```

---

## 开发示例：添加一个新组件条目

以添加 `LazyColumn` 为例。

**第一步**：在 [web/src/data/components/index.ts](web/src/data/components/index.ts) 追加一条数据：

```ts
{
  id: 'lazy-column',
  name: 'LazyColumn',
  category: 'Layout',
  description: '只渲染可见区域的垂直滚动列表，适合大量数据场景。',
  tags: ['lazy', 'list', 'scroll', 'recyclerview'],
  params: [
    { name: 'modifier', type: 'Modifier', default: 'Modifier', description: '修饰符' },
    {
      name: 'state',
      type: 'LazyListState',
      default: 'rememberLazyListState()',
      description: '列表滚动状态',
    },
    {
      name: 'content',
      type: 'LazyListScope.() -> Unit',
      required: true,
      description: '列表内容，使用 items / item 构建',
    },
  ],
  examples: [
    {
      title: '基础用法',
      code: `LazyColumn {
    items(100) { index ->
        Text("Item $index")
    }
}`,
    },
    {
      title: '带 key 优化',
      code: `LazyColumn {
    items(
        items = myList,
        key = { it.id }
    ) { item ->
        Text(item.name)
    }
}`,
    },
  ],
},
```

保存后 Vite 热更新，侧边栏和首页立即出现 `LazyColumn`。

---

## 开发示例：添加一个 Compose 交互 Demo

继续以 `LazyColumn` 为例，给它加一个可交互的 Wasm 预览。

**第一步**：新建 [compose-demos/src/wasmJsMain/kotlin/demos/LazyColumnDemo.kt](compose-demos/src/wasmJsMain/kotlin/demos/LazyColumnDemo.kt)：

```kotlin
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun LazyColumnDemo() {
    val items = remember { (1..30).map { "Item $it" } }

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(8.dp),
        verticalArrangement = Arrangement.spacedBy(4.dp)
    ) {
        items(items) { item ->
            Card(modifier = Modifier.fillMaxWidth()) {
                Text(
                    text = item,
                    modifier = Modifier.padding(12.dp)
                )
            }
        }
    }
}
```

**第二步**：在 [compose-demos/src/wasmJsMain/kotlin/Main.kt](compose-demos/src/wasmJsMain/kotlin/Main.kt) 的 `when` 里注册：

```kotlin
"lazy-column" -> LazyColumnDemo()
```

**第三步**：在组件数据里加上 `demoId`：

```ts
demoId: 'lazy-column',
```

**第四步**：重新编译（自动复制到 Vue）：

```bash
cd compose-demos && ./gradlew.bat wasmJsBrowserDistribution
```

刷新页面，`LazyColumn` 详情页底部会出现可滚动的交互预览。

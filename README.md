# Jetpack Compose 速查站

Vue 3 + Element Plus 文档站，Compose Multiplatform (Kotlin/Wasm) 交互预览。

## 项目结构

```
web/              Vue 3 + Vite 前端（Element Plus + UnoCSS）
compose-demos/    Kotlin/Wasm Demo 源码（Compose Multiplatform）
docs/             项目文档（架构、数据模型、开发进度）
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

## 常见问题

### gradle-wrapper.jar 缺失

**报错**：`错误: 找不到或无法加载主类 org.gradle.wrapper.GradleWrapperMain`

`gradle/wrapper/gradle-wrapper.jar` 未提交到仓库（被 .gitignore 排除）。从 GitHub 下载对应版本：

```bash
# 查看当前需要的版本
cat compose-demos/gradle/wrapper/gradle-wrapper.properties | grep distributionUrl

# 下载 jar（以 8.11.1 为例）
curl -L "https://github.com/gradle/gradle/raw/v8.11.1/gradle/wrapper/gradle-wrapper.jar" \
  -o compose-demos/gradle/wrapper/gradle-wrapper.jar
```

### 编译内存不足

**报错**：`Not enough memory to run compilation. Try to increase it via 'gradle.properties'`

`compose-demos/gradle.properties` 中已配置：

```properties
kotlin.daemon.jvmargs=-Xmx2g
org.gradle.jvmargs=-Xmx2g -XX:MaxMetaspaceSize=512m
```

如果仍然失败，可适当调大（机器内存充足时改为 `-Xmx4g`）。

### Compose Wasm 中文不显示

Compose for Web 不内置中文字体。项目已将 Noto Sans SC 字体打包进 `compose-demos/src/commonMain/composeResources/font/`，通过 `Res.font` 加载并注入 `MaterialTheme`。

如需更换字体，替换该目录下的 `.otf` 文件，并更新 `Main.kt` 中的引用名称，重新编译即可。

---

## 开发示例：添加一个新组件条目

以添加 `LazyColumn` 为例。

**第一步**：在对应分类目录（如 [web/src/data/components/lazy-list/](web/src/data/components/lazy-list/)）新建或编辑组件文件，导出组件数据：

```ts
// web/src/data/components/lazy-list/lazy-column.ts
import type { ComponentEntry } from '../../types'

export const lazyColumnEntry: ComponentEntry = {
  id: 'lazy-column',
  name: 'LazyColumn',
  category: 'LazyList',
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
  ],
}
```

**第二步**：在该分类的 `index.ts` 中引入并导出：

```ts
// web/src/data/components/lazy-list/index.ts
import { lazyColumnEntry } from './lazy-column'
// ...其他导入

export const lazyListComponents = [lazyColumnEntry, /* ... */]
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

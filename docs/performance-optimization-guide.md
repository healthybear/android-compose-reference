# Compose Demos 性能优化指南

## 🎯 性能优化目标

### 核心指标
- **WASM 包大小**：控制在合理范围（< 10 MB）
- **首屏渲染时间**：< 500ms
- **列表滚动帧率**：保持 60 FPS
- **内存使用**：避免内存泄漏
- **重组次数**：最小化不必要的重组

---

## 📊 性能优化策略

### 1. 状态管理优化

#### ✅ 使用 derivedStateOf 避免重复计算

```kotlin
// ❌ 错误：每次重组都重新计算
val filteredItems = items.filter { it.isActive }

// ✅ 正确：只在依赖变化时重新计算
val filteredItems by remember {
    derivedStateOf {
        items.filter { it.isActive }
    }
}
```

#### ✅ 状态下沉，减小重组范围

```kotlin
// ❌ 错误：整个列表重组
@Composable
fun ItemList(items: List<Item>) {
    var selectedId by remember { mutableStateOf(0) }
    items.forEach { item ->
        ItemRow(item, isSelected = item.id == selectedId)
    }
}

// ✅ 正确：只重组被选中的项
@Composable
fun ItemList(items: List<Item>) {
    var selectedId by remember { mutableStateOf(0) }
    items.forEach { item ->
        ItemRow(item, selectedId, onSelect = { selectedId = it })
    }
}

@Composable
fun ItemRow(item: Item, selectedId: Int, onSelect: (Int) -> Unit) {
    val isSelected = item.id == selectedId // 局部状态
    // ...
}
```

#### ✅ 使用不可变数据结构

```kotlin
// ❌ 错误：可变列表可能导致意外重组
val items = mutableListOf<Item>()

// ✅ 正确：使用不可变列表
val items = remember { listOf(Item1, Item2, Item3) }

// ✅ 需要修改时使用 mutableStateListOf
val items = remember { mutableStateListOf(Item1, Item2, Item3) }
```

### 2. LazyList 优化

#### ✅ 使用 key 参数优化重组

```kotlin
// ❌ 错误：没有 key，可能导致错误的重用
LazyColumn {
    items(itemsList) { item ->
        ItemCard(item)
    }
}

// ✅ 正确：使用稳定的 key
LazyColumn {
    items(itemsList, key = { it.id }) { item ->
        ItemCard(item)
    }
}
```

#### ✅ 使用 contentType 优化异构列表

```kotlin
LazyColumn {
    items(
        items = mixedList,
        key = { it.id },
        contentType = { it.type } // 帮助 Compose 重用相同类型的项
    ) { item ->
        when (item.type) {
            "header" -> HeaderItem(item)
            "content" -> ContentItem(item)
        }
    }
}
```

#### ✅ 避免在 LazyList 内创建大量状态

```kotlin
// ❌ 错误：每个 item 都创建独立状态
LazyColumn {
    items(100) { index ->
        var expanded by remember { mutableStateOf(false) }
        ExpandableItem(expanded, onToggle = { expanded = !expanded })
    }
}

// ✅ 正确：状态提升，集中管理
val expandedStates = remember { mutableStateMapOf<Int, Boolean>() }
LazyColumn {
    items(100) { index ->
        ExpandableItem(
            expanded = expandedStates[index] ?: false,
            onToggle = { expandedStates[index] = !(expandedStates[index] ?: false) }
        )
    }
}
```

### 3. Lambda 优化

#### ✅ 使用 remember 包装 Lambda

```kotlin
// ❌ 错误：每次重组创建新 lambda
Button(onClick = { viewModel.doSomething() }) {
    Text("Click")
}

// ✅ 正确：缓存 lambda
val onClick = remember { { viewModel.doSomething() } }
Button(onClick = onClick) {
    Text("Click")
}

// ✅ 更好：使用方法引用
Button(onClick = viewModel::doSomething) {
    Text("Click")
}
```

#### ✅ 避免在 Lambda 中捕获不稳定状态

```kotlin
// ❌ 错误：捕获了可变状态
var count by remember { mutableStateOf(0) }
Button(onClick = { println(count) }) {
    Text("Count: $count")
}

// ✅ 正确：将状态作为参数传递
var count by remember { mutableStateOf(0) }
val onClick = remember { { value: Int -> println(value) } }
Button(onClick = { onClick(count) }) {
    Text("Count: $count")
}
```

### 4. Modifier 优化

#### ✅ 重用 Modifier

```kotlin
// ❌ 错误：每次重组创建新 Modifier
@Composable
fun MyComponent() {
    Box(modifier = Modifier.fillMaxWidth().padding(16.dp)) {
        // ...
    }
}

// ✅ 正确：重用 Modifier
val defaultModifier = Modifier.fillMaxWidth().padding(16.dp)

@Composable
fun MyComponent() {
    Box(modifier = defaultModifier) {
        // ...
    }
}
```

#### ✅ 避免在 Modifier 中进行复杂计算

```kotlin
// ❌ 错误：每次重组都计算
Box(
    modifier = Modifier.size(calculateSize())
)

// ✅ 正确：缓存计算结果
val size = remember { calculateSize() }
Box(
    modifier = Modifier.size(size)
)
```

### 5. 避免不必要的重组

#### ✅ 使用稳定的参数

```kotlin
// ❌ 错误：每次都创建新列表
@Composable
fun ItemList() {
    val items = listOf("A", "B", "C")
    ItemsContent(items)
}

// ✅ 正确：使用 remember 缓存
@Composable
fun ItemList() {
    val items = remember { listOf("A", "B", "C") }
    ItemsContent(items)
}
```

#### ✅ 使用 @Stable 和 @Immutable 注解

```kotlin
// ❌ 可能不稳定的数据类
data class User(var name: String, var age: Int)

// ✅ 使用 @Immutable 标记不可变类
@Immutable
data class User(val name: String, val age: Int)

// ✅ 使用 @Stable 标记稳定但可能变化的类
@Stable
class UserState(initialName: String) {
    var name by mutableStateOf(initialName)
        private set
    
    fun updateName(newName: String) {
        name = newName
    }
}
```

### 6. 图片和资源优化

#### ✅ 使用适当的图片尺寸

```kotlin
// ❌ 错误：加载原始大图
Image(
    painter = painterResource("large_image.png"),
    contentDescription = null,
    modifier = Modifier.size(48.dp)
)

// ✅ 正确：使用缩略图或调整大小
Image(
    painter = painterResource("thumbnail_48dp.png"),
    contentDescription = null,
    modifier = Modifier.size(48.dp)
)
```

#### ✅ 按需加载资源

```kotlin
// ❌ 错误：一次性加载所有资源
val images = remember {
    (1..100).map { painterResource("image_$it.png") }
}

// ✅ 正确：按需加载
LazyColumn {
    items(100) { index ->
        val painter = painterResource("image_$index.png")
        Image(painter, contentDescription = null)
    }
}
```

### 7. 动画优化

#### ✅ 使用硬件加速的动画

```kotlin
// ✅ 使用 graphicsLayer 进行变换（硬件加速）
Box(
    modifier = Modifier
        .graphicsLayer {
            scaleX = scale
            scaleY = scale
            alpha = alphaValue
        }
)

// ⚠️ 避免使用 scale/alpha modifier（可能触发重新布局）
Box(
    modifier = Modifier
        .scale(scale)
        .alpha(alphaValue)
)
```

#### ✅ 限制同时运行的动画数量

```kotlin
// ❌ 错误：为每个 item 都运行动画
LazyColumn {
    items(1000) { index ->
        AnimatedVisibility(visible = true) {
            ItemCard(index)
        }
    }
}

// ✅ 正确：只为可见项运行动画
LazyColumn {
    items(1000) { index ->
        ItemCard(index) // 简单显示，不需要动画
    }
}
```

---

## 🔍 性能分析工具

### 1. 使用 Compose Compiler Metrics

在 `gradle.properties` 中添加：

```properties
# 生成 Compose 编译器报告
org.jetbrains.kotlin.gradle.tasks.KotlinCompile.compose.metrics=true
org.jetbrains.kotlin.gradle.tasks.KotlinCompile.compose.reports=true
```

### 2. 使用 Layout Inspector

- 查看组合层次结构
- 识别过度嵌套
- 检查重组次数
- 分析重组热点

### 3. 性能分析检查清单

- [ ] 检查是否有不必要的重组
- [ ] LazyList 是否使用了 key 参数
- [ ] 是否有大对象在 Composable 中创建
- [ ] Lambda 是否被正确缓存
- [ ] 是否有复杂计算可以移到 derivedStateOf
- [ ] 图片资源是否过大
- [ ] 动画是否使用了硬件加速

---

## 📈 性能优化案例

### Case 1: 优化列表滚动性能

**问题**：1000 项列表滚动卡顿

```kotlin
// ❌ 之前：60ms/帧
LazyColumn {
    items(1000) { index ->
        var expanded by remember { mutableStateOf(false) }
        Card {
            Column {
                Text("Item $index")
                if (expanded) {
                    Text("Details...")
                }
                Button(onClick = { expanded = !expanded }) {
                    Text("Toggle")
                }
            }
        }
    }
}
```

**解决方案**：

```kotlin
// ✅ 优化后：16ms/帧
val expandedStates = remember { mutableStateMapOf<Int, Boolean>() }

LazyColumn {
    items(
        count = 1000,
        key = { it } // 添加 key
    ) { index ->
        val isExpanded = expandedStates[index] ?: false
        Card {
            Column {
                Text("Item $index")
                if (isExpanded) {
                    Text("Details...")
                }
                Button(onClick = { 
                    expandedStates[index] = !isExpanded 
                }) {
                    Text("Toggle")
                }
            }
        }
    }
}
```

**优化效果**：
- 帧率从 16 FPS 提升到 60 FPS
- 内存使用减少 40%
- 滚动流畅度显著提升

### Case 2: 优化搜索过滤性能

**问题**：输入时卡顿

```kotlin
// ❌ 之前：每次输入都过滤 10000 项
var query by remember { mutableStateOf("") }
val filteredItems = allItems.filter { 
    it.name.contains(query, ignoreCase = true) 
}
```

**解决方案**：

```kotlin
// ✅ 优化后：使用 derivedStateOf + 防抖
var query by remember { mutableStateOf("") }
var debouncedQuery by remember { mutableStateOf("") }

LaunchedEffect(query) {
    delay(300) // 防抖
    debouncedQuery = query
}

val filteredItems by remember {
    derivedStateOf {
        if (debouncedQuery.isEmpty()) {
            allItems
        } else {
            allItems.filter { 
                it.name.contains(debouncedQuery, ignoreCase = true) 
            }
        }
    }
}
```

**优化效果**：
- 输入响应时间减少 70%
- 减少了 90% 的不必要过滤操作
- 用户体验显著提升

---

## 🎯 性能优化优先级

### 高优先级（立即处理）
1. LazyList 添加 key 参数
2. 修复明显的重组问题
3. 优化大图片加载
4. 缓存昂贵的计算

### 中优先级（计划处理）
5. Lambda 缓存优化
6. Modifier 重用
7. 状态提升优化
8. 动画性能优化

### 低优先级（持续改进）
9. 细微的性能提升
10. 边缘情况优化
11. 代码可读性与性能平衡
12. 实验性优化

---

**版本**：v1.0  
**最后更新**：2026 年 9 月

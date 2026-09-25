# Compose Demos 代码质量清单

## 📋 代码审查清单

### 文件结构

- [ ] 文件名与组件名匹配（如 `ButtonDemo.kt` 对应 `ButtonDemo()`）
- [ ] Package 声明为 `package demos`
- [ ] 导入语句按字母顺序排列
- [ ] 使用通配符导入（`import androidx.compose.material3.*`）

### 文档注释（KDoc）

- [ ] 文件顶部有完整的 KDoc 注释
- [ ] 包含组件简介（1-2 句话）
- [ ] 列出核心参数及说明
- [ ] 包含学习要点（3-5 个）
- [ ] 如有相似组件，说明区别
- [ ] 复杂逻辑有行内注释

### 代码结构

- [ ] 使用 `Column(verticalArrangement = Arrangement.spacedBy(20.dp))` 作为主容器
- [ ] 标题使用 `Text("[组件名] 示例", style = MaterialTheme.typography.titleMedium)`
- [ ] 每个示例用 `SectionLabel("标题")` 分隔
- [ ] 使用 `HorizontalDivider()` 分隔不同部分
- [ ] 至少包含 3-5 个示例部分
- [ ] 最后一部分为实际场景演示

### 状态管理

- [ ] 使用 `remember { mutableStateOf() }` 管理状态
- [ ] 状态变量命名清晰（如 `isEnabled`, `selectedIndex`, `showDialog`）
- [ ] 使用 `by` 委托简化状态访问
- [ ] 复杂状态使用 `mutableStateListOf` 或 `mutableStateMapOf`
- [ ] 异步操作使用 `LaunchedEffect` 或 `rememberCoroutineScope`

### UI 组件使用

- [ ] 遵循 Material3 设计规范
- [ ] 使用 MaterialTheme.colorScheme 获取颜色
- [ ] 使用 MaterialTheme.typography 获取文字样式
- [ ] 使用 MaterialTheme.shapes 获取形状
- [ ] 正确使用 Modifier 链
- [ ] Modifier 顺序合理（size → padding → background → clickable）

### 实际场景

- [ ] 至少包含一个真实应用场景
- [ ] 场景包装在 Card 中
- [ ] 展示完整的用户交互流程
- [ ] 包含加载、成功、失败等状态
- [ ] 有清晰的用户反馈

### 错误处理

- [ ] 演示输入验证
- [ ] 展示错误状态（isError = true）
- [ ] 包含边界情况处理
- [ ] 空状态和加载状态展示

### 可访问性

- [ ] Icon 组件有 contentDescription（装饰性图标可为 null）
- [ ] 交互元素有合理的点击区域（至少 48dp）
- [ ] 颜色对比度符合标准
- [ ] 使用语义化组件（Button 而非可点击的 Box）

### 命名规范

- [ ] 变量使用小驼峰命名（camelCase）
- [ ] 布尔变量以 is/has/should 开头
- [ ] 列表变量使用复数形式
- [ ] 函数名动词开头（如 onClick, onValueChange）

### 性能优化

- [ ] 避免在 Composable 中创建大对象
- [ ] 使用 `key` 参数优化 LazyColumn/LazyRow
- [ ] 使用 `derivedStateOf` 避免重复计算
- [ ] Lambda 使用 `remember` 包装避免重组时重新创建

### 代码风格

- [ ] 缩进使用 4 个空格
- [ ] 每行不超过 120 字符
- [ ] 括号风格一致（K&R 风格）
- [ ] 空行使用合理，增强可读性
- [ ] 注释与代码同步更新

---

## 🎯 示例评分标准

### 优秀（90-100 分）
- ✅ 完整的 KDoc 文档
- ✅ 5+ 个不同的使用示例
- ✅ 至少 2 个实际场景
- ✅ 完善的错误处理
- ✅ 良好的性能优化
- ✅ 完全符合可访问性标准

### 良好（80-89 分）
- ✅ 基本完整的 KDoc
- ✅ 3-4 个使用示例
- ✅ 至少 1 个实际场景
- ✅ 基本的错误处理
- ✅ 符合基本可访问性标准

### 合格（70-79 分）
- ✅ 简单的 KDoc
- ✅ 2-3 个使用示例
- ✅ 基础功能演示
- ⚠️ 缺少实际场景
- ⚠️ 错误处理不完整

### 需要改进（< 70 分）
- ❌ 缺少或不完整的文档
- ❌ 少于 2 个示例
- ❌ 只有基础演示
- ❌ 无错误处理
- ❌ 无可访问性考虑

---

## 🔍 常见问题检查

### 导入问题
```kotlin
// ❌ 错误：缺少导入
Text("Hello") // Unresolved reference

// ✅ 正确：添加导入
import androidx.compose.material3.Text
```

### 状态管理
```kotlin
// ❌ 错误：状态不会触发重组
var count = 0

// ✅ 正确：使用 remember
var count by remember { mutableStateOf(0) }
```

### Modifier 顺序
```kotlin
// ❌ 错误：padding 在 background 之后
Modifier.background(color).padding(16.dp)

// ✅ 正确：padding 在 background 之前
Modifier.padding(16.dp).background(color)
```

### 可访问性
```kotlin
// ❌ 错误：缺少 contentDescription
Icon(Icons.Filled.Delete, contentDescription = null)

// ✅ 正确：添加描述（装饰性除外）
Icon(Icons.Filled.Delete, contentDescription = "删除")
```

### 性能优化
```kotlin
// ❌ 错误：每次重组都创建新对象
val items = listOf("A", "B", "C")

// ✅ 正确：使用 remember 缓存
val items = remember { listOf("A", "B", "C") }
```

---

## 📝 提交前检查清单

在提交代码前，请确保：

- [ ] 代码编译通过，无错误
- [ ] 所有警告已处理或有合理解释
- [ ] 在浏览器中测试过演示
- [ ] 检查了不同屏幕尺寸的显示效果
- [ ] 验证了所有交互功能正常
- [ ] 文档注释准确且完整
- [ ] 遵循了项目的代码风格
- [ ] 更新了 DemoRegistry.kt
- [ ] Git commit message 清晰明确

---

## 🚀 持续改进

### 定期审查
- 每月审查代码质量
- 识别重复代码并提取为工具函数
- 更新过时的示例
- 添加新的最佳实践

### 用户反馈
- 收集用户对演示的反馈
- 识别难以理解的部分
- 根据反馈调整示例
- 添加更多实用场景

### 性能监控
- 定期检查 WASM 包大小
- 监控运行时性能
- 优化慢速演示
- 减少不必要的重组

---

**版本**：v1.0  
**最后更新**：2026 年 9 月

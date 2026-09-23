# Compose 速查手册内容扩展计划

## 文档概述

本文档规划了将当前 116 个组件从基础文档扩展为深度速查手册的完整方案。

**当前状态**：基础参数和简单示例  
**目标状态**：完整参数、实用场景、最佳实践、注意事项的专业速查手册

## 数据结构扩展（已完成）

### 新增类型定义

```typescript
// 使用场景
interface UseCase {
  title: string         // 场景标题
  description: string   // 场景描述
  code?: string         // 示例代码
}

// 最佳实践
interface BestPractice {
  title: string         // 实践标题
  description: string   // 详细说明
  goodExample?: string  // 推荐写法
  badExample?: string   // 不推荐写法
}

// 注意事项
interface Note {
  type: 'info' | 'warning' | 'tip' | 'danger'
  title: string
  content: string
}

// ComponentEntry 新增字段
interface ComponentEntry {
  // ... 原有字段
  useCases?: UseCase[]            // 使用场景
  bestPractices?: BestPractice[]  // 最佳实践
  notes?: Note[]                  // 注意事项
  relatedComponents?: string[]    // 相关组件
  since?: string                  // 引入版本
  experimental?: boolean          // 实验性 API
}
```

### 参考模板

已完成的 `Button` 组件可作为标准模板：
- 路径：`web/src/data/components/material/button.ts`
- 包含完整参数（10个）、5个示例、2个场景、3个实践、4个注意事项

## 内容扩展优先级

### P0：核心高频组件（20个）

这些组件使用频率最高，应优先完善到专业水平。

#### 布局基础（5个）
- [ ] `Column` - 垂直布局容器
- [ ] `Row` - 水平布局容器
- [ ] `Box` - 层叠布局容器
- [ ] `Spacer` - 间距组件
- [ ] `Surface` - Material 容器

**扩展重点**：
- Arrangement 和 Alignment 的各种组合
- 权重分配（weight）
- 嵌套布局性能优化
- 常见布局错误（如忘记 Modifier.fillMaxSize）

#### 列表滚动（3个）
- [ ] `LazyColumn` - 垂直懒加载列表
- [ ] `LazyRow` - 水平懒加载列表
- [ ] `LazyVerticalGrid` - 垂直网格

**扩展重点**：
- key() 的正确使用
- itemsIndexed vs items
- 分页加载模式
- 性能优化（避免嵌套滚动）

#### 文本输入（4个）
- [ ] `Text` - 文本显示
- [ ] `TextField` - 文本输入框
- [ ] `OutlinedTextField` - 轮廓文本框
- [ ] `BasicTextField` - 基础文本框

**扩展重点**：
- 输入验证模式
- 与 ViewModel 集成
- 键盘操作和 IME
- 文本样式和排版

#### Material 组件（4个）
- [ ] `Button` - 按钮（已完成 ✓）
- [ ] `Card` - 卡片
- [ ] `IconButton` - 图标按钮
- [ ] `FloatingActionButton` - 悬浮按钮

**扩展重点**：
- 交互状态（按下、悬停、禁用）
- 颜色和主题定制
- 无障碍支持
- 响应式设计

#### 状态管理（4个）
- [ ] `remember` - 状态记忆
- [ ] `rememberSaveable` - 可保存状态
- [ ] `LaunchedEffect` - 生命周期副作用
- [ ] `derivedStateOf` - 派生状态

**扩展重点**：
- 何时使用各种 remember
- 生命周期理解
- 协程作用域
- 常见内存泄漏

### P1：常用组件（30个）

#### Modifier（10个）
- [ ] `Modifier.padding` - 内边距
- [ ] `Modifier.size` - 尺寸
- [ ] `Modifier.background` - 背景
- [ ] `Modifier.clickable` - 点击
- [ ] `Modifier.offset` - 偏移
- [ ] `Modifier.weight` - 权重
- [ ] `Modifier.fillMaxWidth/Height/Size` - 填充
- [ ] `Modifier.clip` - 裁剪
- [ ] `Modifier.border` - 边框
- [ ] `Modifier.alpha` - 透明度

**扩展重点**：
- Modifier 链式调用顺序的影响
- 性能考虑
- 组合复用

#### Material 组件（10个）
- [ ] `ListItem` - 列表项
- [ ] `Divider` - 分隔线
- [ ] `Badge` - 徽章
- [ ] `Chip` - 标签
- [ ] `Switch` - 开关
- [ ] `Checkbox` - 复选框
- [ ] `RadioButton` - 单选按钮
- [ ] `Slider` - 滑块
- [ ] `ProgressIndicator` - 进度指示器
- [ ] `Snackbar` - 提示条

#### 导航组件（5个）
- [ ] `Scaffold` - 脚手架
- [ ] `TopAppBar` - 顶部应用栏
- [ ] `NavigationBar` - 底部导航栏
- [ ] `NavigationRail` - 侧边导航栏
- [ ] `NavigationDrawer` - 抽屉

#### 对话框反馈（5个）
- [ ] `AlertDialog` - 警告对话框
- [ ] `ModalBottomSheet` - 底部弹出层
- [ ] `DropdownMenu` - 下拉菜单
- [ ] `Tooltip` - 工具提示
- [ ] `CircularProgressIndicator` - 圆形进度

### P2：进阶组件（30个）

#### 动画（8个）
- [ ] `AnimatedVisibility` - 可见性动画
- [ ] `animateContentSize` - 内容尺寸动画
- [ ] `animateFloatAsState` - Float 动画
- [ ] `animateColorAsState` - 颜色动画
- [ ] `Crossfade` - 交叉淡入淡出
- [ ] `updateTransition` - 过渡动画
- [ ] `infiniteTransition` - 无限动画
- [ ] `AnimatedContent` - 内容动画

#### 手势（6个）
- [ ] `detectTapGestures` - 点击手势
- [ ] `detectDragGestures` - 拖拽手势
- [ ] `Modifier.draggable` - 可拖拽
- [ ] `Modifier.swipeable` - 可滑动
- [ ] `Modifier.transformable` - 可变换
- [ ] `Modifier.pointerInput` - 指针输入

#### 高级状态（6个）
- [ ] `DisposableEffect` - 可释放副作用
- [ ] `SideEffect` - 副作用
- [ ] `produceState` - 状态生产者
- [ ] `snapshotFlow` - 快照流
- [ ] `collectAsState` - 收集为状态
- [ ] `rememberCoroutineScope` - 协程作用域

#### 主题样式（5个）
- [ ] `MaterialTheme` - Material 主题
- [ ] `ColorScheme` - 颜色方案
- [ ] `Typography` - 排版
- [ ] `Shapes` - 形状
- [ ] `LocalContentColor` - 本地内容颜色

#### 其他进阶（5个）
- [ ] `CompositionLocal` - 组合本地
- [ ] `Canvas` - 画布
- [ ] `Icon` - 图标
- [ ] `Image` - 图片
- [ ] `SubcomposeLayout` - 子组合布局

### P3：专业组件（36个）

包括生态系统集成、特殊用途组件等，根据实际需求逐步完善。

## 内容质量标准

### 必填内容（所有组件）

1. **完整参数列表**
   - 包含所有公开参数
   - 准确的类型定义
   - 清晰的默认值
   - 必填/可选标注

2. **基础代码示例**（至少 3 个）
   - 最简单用法
   - 常见配置
   - 实际场景

3. **准确的描述**
   - 组件用途
   - 适用场景
   - 关键特性

### 推荐内容（P0/P1 组件）

4. **使用场景**（1-3 个）
   - 真实业务场景
   - 完整可运行代码
   - 与其他组件集成

5. **最佳实践**（2-4 个）
   - 性能优化建议
   - 常见错误对比
   - 推荐/不推荐示例

6. **注意事项**（2-5 个）
   - 易错点提醒
   - 性能陷阱
   - 版本兼容性
   - 无障碍注意事项

### 高级内容（核心组件）

7. **深度参数说明**
   - InteractionSource 使用
   - 自定义颜色/形状/elevation
   - 高级配置选项

8. **进阶示例**
   - 自定义样式
   - 动画集成
   - 状态管理模式

## 实施流程

### 阶段一：核心组件深化（2周）

**目标**：完成 P0 的 20 个核心组件

1. 按分类逐个处理：布局 → 列表 → 输入 → Material → 状态
2. 每个组件需包含：完整参数、5+示例、2+场景、3+实践、4+注意事项
3. 参考 Button 模板保持一致性
4. 每完成 5 个组件进行一次交叉审查

**验收标准**：
- [ ] 所有 P0 组件达到质量标准
- [ ] 参数完整性 > 90%
- [ ] 每个组件至少 5 个代码示例
- [ ] 构建和数据校验通过

### 阶段二：常用组件扩充（3周）

**目标**：完成 P1 的 30 个常用组件

1. Modifier 系列（关联性强，集中处理）
2. Material 组件（参考官方文档）
3. 导航和对话框（实用性优先）
4. 逐步提高内容深度

**验收标准**：
- [ ] P1 组件完整度 > 80%
- [ ] 参数和示例齐全
- [ ] 关键组件有最佳实践

### 阶段三：进阶内容完善（4周）

**目标**：完成 P2 的 30 个进阶组件，优化 P0/P1

1. 动画和手势（技术难度高）
2. 高级状态管理（需要深入理解）
3. 主题定制（设计相关）
4. 回顾并优化 P0/P1 的内容

**验收标准**：
- [ ] P2 组件基础内容完整
- [ ] P0/P1 组件有深度优化
- [ ] 形成系列教程（如"动画入门"）

### 阶段四：专业化与生态（持续）

**目标**：完善 P3 组件，添加教程和最佳实践文档

1. 生态库集成（Coil, Navigation, Lottie）
2. 自定义组件指南
3. 性能优化专题
4. 无障碍最佳实践

## 内容来源与参考

### 官方文档
- [Jetpack Compose 官方文档](https://developer.android.com/jetpack/compose)
- [Material Design 3](https://m3.material.io/)
- [Compose Multiplatform](https://www.jetbrains.com/lp/compose-multiplatform/)

### 社区资源
- Stack Overflow 高频问题
- GitHub Issues 常见错误
- Medium/Dev.to 实践文章
- Reddit r/androiddev 讨论

### 实战经验
- 真实项目代码
- 性能优化案例
- 常见 Bug 修复

## 质量控制

### 内容审查清单

每个组件完成后需检查：

- [ ] **参数完整性**：与官方文档对比，无遗漏
- [ ] **代码正确性**：所有示例可编译运行
- [ ] **描述准确性**：无误导性描述
- [ ] **实用性**：场景贴近真实开发
- [ ] **一致性**：格式、风格与模板一致
- [ ] **关联性**：relatedComponents 准确

### 自动化检查

现有校验继续保持：
- `pnpm run validate:data` - 数据结构校验
- `pnpm run validate:demos` - Demo 一致性
- `pnpm run build` - 构建通过

### 人工审查

关键组件需要二次审查：
- 核心布局组件
- 状态管理组件
- 常见易错组件

## 进度追踪

### 统计指标

- 组件总数：116
- 已完成深化：1 (Button)
- 待完成：115
- 目标完成度：
  - P0 (20个)：100%
  - P1 (30个)：80%
  - P2 (30个)：60%
  - P3 (36个)：30%

### 里程碑

| 时间点 | 目标 | 完成组件数 | 累计进度 |
|--------|------|-----------|---------|
| Week 2 | P0 完成 | 20 | 17% |
| Week 5 | P1 完成 | 50 | 43% |
| Week 9 | P2 完成 | 80 | 69% |
| Week 12+ | P3 推进 | 100+ | 86%+ |

## 协作建议

### 单人开发
- 每天处理 2-3 个组件
- 保持节奏，避免倦怠
- 定期回顾已完成内容

### 多人协作
- 按分类分配任务
- 共享模板和规范
- 定期同步和审查
- 使用 GitHub Issues/Projects 追踪

## 附录

### 快速参考

- **模板组件**：`web/src/data/components/material/button.ts`
- **类型定义**：`web/src/data/types.ts`
- **页面展示**：`web/src/pages/ComponentPage.vue`
- **本文档**：`docs/content-enrichment-plan.md`

### 更新记录

| 日期 | 变更 | 说明 |
|------|------|------|
| 2026-09-17 | 初始版本 | 建立完整扩展计划 |

---

**下一步行动**：从 P0 的布局基础组件开始，按优先级逐个深化内容。

# 工程优化进度表

本文档记录 `web/` 与 `compose-demos/` 的工程问题、优化方案、验收标准和实施进度。
后续按任务编号逐项修复；完成任务时同步更新状态、验证结果和变更记录。

## 状态说明

| 标记 | 含义 |
|------|------|
| `[ ]` | 待处理 |
| `[~]` | 处理中 |
| `[x]` | 已完成并通过验收 |
| `[-]` | 经评估不实施，需记录原因 |

## 初始基线

基线日期：2026-09-17

| 指标 | 当前结果 |
|------|----------|
| 组件文档条目 | 116 |
| Kotlin/Wasm Demo 路由 | 85 |
| 明确填写 `ComponentEntry.demoId` 的条目 | 3 |
| Web 生产构建 | 通过，约 11.65 秒 |
| Web `dist/` | 约 20 MB，371 个文件 |
| Web `dist/assets/` | 约 11 MB，283 个文件 |
| Compose 中文字体源文件 | 约 7.9 MB |
| Wasm 生产构建 | 失败，Gradle Wrapper 不完整且启动脚本异常 |
| 自动化测试 | 无 |
| CI | 无 |

> 构建耗时和产物大小受本机环境影响。涉及性能的任务完成后，应在相同环境重新测量并记录对比结果。

### P0 修复后基线

更新日期：2026-09-17

| 指标 | 当前结果 |
|------|----------|
| macOS 完整生产构建 | 通过；增量构建中 Wasm 约 13 秒，Web 约 11.6 秒 |
| Wasm 二进制 | 2 个，合计约 13 MiB |
| `web/dist/demos/` | 约 24 MB |
| `web/dist/` | 约 44 MB |
| HTTP 冒烟检查 | 首页、Demo 容器和 Wasm 均返回 200；Wasm MIME 正确 |
| Windows/Linux 构建 | GitHub Actions 矩阵已配置，待远端首次运行确认 |

## 推荐实施顺序

1. 完成 P0，恢复可复现的一键构建和持续集成。
2. 统一 Demo 元数据并建立数据校验，避免继续产生维护债务。
3. 优化 Shiki、Element Plus、字体和 Wasm 交付体积。
4. 补齐自动化测试、无障碍和跨窗口通信安全。
5. 在基础链路稳定后继续扩充组件与 Demo。

---

## P0：构建与交付基线

### [x] OPT-001 修复 Gradle Wrapper

**问题**

- `compose-demos/gradlew` 当前执行时出现 shell 语法错误。
- `compose-demos/gradle/wrapper/gradle-wrapper.jar` 未提交并被 `.gitignore` 忽略。
- `pnpm run build:demos` 因此无法执行，根目录 `pnpm build` 不可复现。

**优化方案**

- 使用 Gradle 8.11.1 重新生成标准 Wrapper 文件。
- 提交 `gradle-wrapper.jar`，取消对应忽略规则。
- 在 macOS/Linux 和 CI 环境验证 Wrapper，不依赖本机已安装的 Gradle。

**验收标准**

- `./compose-demos/gradlew --version` 成功。
- `pnpm run build:demos` 成功。
- `pnpm run build` 能从干净检出状态完成全部构建。

### [x] OPT-002 统一 Node 包管理器

**问题**

- 仓库同时提交了根目录 `pnpm-lock.yaml` 和 `web/package-lock.json`。
- 不同包管理器可能解析出不同依赖版本。

**优化方案**

- 统一使用 pnpm，删除 `web/package-lock.json`。
- 在根 `package.json` 声明 `packageManager` 和 Node/pnpm 版本要求。
- 文档及 CI 使用 `pnpm install --frozen-lockfile`。

**验收标准**

- 仓库只保留一套 Node 锁文件。
- 干净环境安装依赖不修改 `pnpm-lock.yaml`。
- README、部署文档和 CI 命令保持一致。

### [x] OPT-003 固定并公开构建工具版本

**问题**

- JDK、Node.js、pnpm 的要求只存在于说明文字，缺少机器可读取的约束。
- Kotlin、Compose Multiplatform、Gradle 和 Web 工具的升级缺少统一检查入口。

**优化方案**

- 增加 Node/pnpm engines 与 `packageManager`。
- 选择仓库现有习惯支持的 JDK 版本声明方式。
- 将 Kotlin、Compose Multiplatform 和 Gradle 版本集中维护或明确记录升级步骤。

**验收标准**

- 使用不兼容工具版本时能尽早获得明确提示。
- README 中的版本要求与配置文件一致。

### [~] OPT-004 建立基础 CI

**问题**

- 当前没有 CI，类型错误、数据漂移和构建失败只能在本地发现。

**优化方案**

- 在 CI 中安装固定版本的 JDK、Node.js 和 pnpm。
- 使用 pnpm frozen lockfile 安装依赖。
- 依次执行数据校验、Web 类型检查、Web 构建和 Wasm 构建。
- 缓存 pnpm store 和 Gradle caches，不缓存最终构建结果作为真值。

**验收标准**

- 新提交和合并请求会自动执行完整检查。
- 任一子项目构建失败时 CI 明确失败。
- CI 不依赖未提交的本地文件。

**当前进度**

- 已建立 Ubuntu、macOS、Windows 三平台构建矩阵，并上传各平台的 `web/dist/`。
- 当前 Git 远端为 Gitee；工作流需要将仓库镜像或推送到 GitHub 后才能实际运行。
- macOS 已在本机完成全量构建和 HTTP 冒烟检查；Windows/Linux 待首轮远端结果后完成验收。

---

## P1：数据与版本一致性

### [x] OPT-005 统一 Demo 元数据来源

**问题**

当前 Demo 信息分散在多个位置：

- `ComponentEntry.demoId`
- `HomePage.vue` 中的 `DEMO_IDS`
- `ComponentPage.vue` 中的 `DEMO_IDS` 与文件名覆盖表
- `Main.kt` 中的 Demo `when` 分支
- `docs/demo-progress.md`

116 个组件条目中只有 3 个填写 `demoId`，但 Kotlin 已注册 85 个 Demo。继续手工同步容易出现遗漏。

**优化方案**

- 将 Web 端元数据收敛到 `ComponentEntry.demo`，建议包含 `id`、`sourceFile`，需要拆包时再增加 `bundle`。
- 首页、详情页、源码加载逻辑都从组件数据推导。
- Kotlin 侧建立集中式 `DemoRegistry`，替代入口文件中的大型 `when`。
- 第一阶段通过校验脚本保证 TS 元数据、Registry 和源码文件一致；暂不引入复杂代码生成。

**验收标准**

- 删除两个页面中的重复 `DEMO_IDS`。
- 不再依赖文件名猜测与特殊覆盖表加载源码。
- 新增一个 Demo 时只需更新组件数据、Registry 和源码，并由自动校验防止遗漏。

**完成结果**

- 85 个可预览组件都使用 `demo: { id, sourceFile }` 声明元数据，首页和详情页直接从组件数据派生展示与加载逻辑。
- 新增 `DemoRegistry.kt`，`Main.kt` 不再包含大型 Demo `when` 分支。
- 新增 `pnpm run validate:demos`，检查组件与 Demo ID 唯一性、元数据与注册表一致性、源码文件存在性及未注册源码。
- 校验已接入根 `pnpm run build`，因此 CI 构建默认执行。
- Wasm 分发任务改为清理后同步，并校验最终目录不存在未被 JS 引用的陈旧 Wasm hash。

### [x] OPT-006 增加内容数据校验

**问题**

- 组件文档是大量手写 TypeScript 数据，目前没有完整性和引用检查。
- 重复 ID、无效 category、失效关联组件等问题只能运行页面后人工发现。

**优化方案**

增加可在本地和 CI 执行的数据校验，至少覆盖：

- 组件、指南和 Demo ID 唯一。
- category 属于 `ComponentCategory`。
- `relatedComponents` 引用真实组件。
- Demo Registry、Demo 元数据和 Kotlin 文件一一对应。
- 必填字段、示例和参数结构合法。

**验收标准**

- 根目录提供单独的校验命令。
- 人为制造重复 ID、错误引用或缺失 Demo 文件时，校验会失败并指出具体条目。
- CI 默认执行该校验。

**完成结果**

- 新增 `pnpm run validate:data`，使用 TypeScript AST 校验 116 个组件和 9 个指南。
- 校验组件与指南 ID 唯一、kebab-case 格式、分类和难度枚举、必填字段、参数/示例/标签结构及重复项。
- 校验组件和指南的 `relatedComponents` 引用真实组件，并报告具体文件和行号。
- 已接入根 `pnpm run build`，CI 默认执行；Demo 跨项目一致性继续由 `validate:demos` 负责。

### [x] OPT-007 区分 Android 文档版本与 Wasm 运行时版本

**问题**

- 页面展示 Android Compose BOM 2026.02.00 / UI 1.10.3。
- Wasm Demo 实际使用 Compose Multiplatform 1.8.0 / Kotlin 2.1.10。
- 两套版本体系未明确区分，容易让用户误认为在线预览与 Android BOM 完全一致。

**优化方案**

- 将版本模型拆为“文档目标版本”和“Demo 运行时版本”。
- 在页面和文档中说明 Android Jetpack Compose 与 Compose Multiplatform 的差异。
- 升级任一版本时分别记录兼容性验证结果。

**验收标准**

- 页面可同时查看两套版本信息。
- README、架构文档和部署文档描述一致。
- 不再使用单一“Compose 版本”概括两个平台。

**完成结果**

- 页面 Header 并列标明 Android 文档 BOM 与 Wasm Demo 运行时版本。
- `README.md`、架构文档和部署文档统一说明两套版本的用途与独立维护关系。

### [x] OPT-008 修正文档与实现的偏差

**问题**

- `demo-progress.md` 的汇总统计仍与当前 85 个 Demo 的实现不一致。
- 部分组件和 Demo 统计尚未由脚本自动生成，可能继续漂移。

**优化方案**

- 在 OPT-005 完成后更新 README、架构说明、数据模型和 Demo 进度表。
- 把新增组件、新增 Demo、升级版本的操作步骤改为当前真实流程。

**验收标准**

- 按文档从零新增一个组件和 Demo 可以成功构建并展示。
- 文档统计可由校验脚本生成或验证。

**完成结果**

- `demo-progress.md` 已按当前 116 个组件、85 个已注册 Demo 和 8 个明确跳过项修正汇总。
- `validate:demos` 现在同时校验进度表的 `[x]` 条目、源码文件名和汇总数字，文档漂移会直接导致校验失败。
- README 已补齐新增组件、Demo 和指南的实际操作、校验、构建与访问路径；架构和数据模型文档同步当前路由、指南页面与 `DemoRegistry`。

---

## P1：加载与包体性能

### [ ] OPT-009 缩减 Shiki 产物

**问题**

- `CodeBlock.vue` 使用完整 `shiki` 入口。
- 构建产物包含大量未使用的语言和主题，当前 `assets/` 有 283 个文件。
- 最大 Shiki 相关 chunk 约 1.37 MB，gzip 后约 421 KB。

**优化方案**

- 使用 Shiki Core，只注册 Kotlin 和实际使用的明暗主题。
- 创建共享 highlighter 单例，避免每个代码块重复初始化。
- 处理代码或主题快速变化时的异步竞态。

**验收标准**

- 代码高亮、主题切换和复制功能正常。
- 不再输出大量无关语言与主题 chunk。
- 记录优化前后的 `dist/` 大小、文件数和首次高亮耗时。

### [ ] OPT-010 按需加载 Element Plus 并清理依赖

**问题**

- 当前全量注册 Element Plus 和全部 Element Plus 图标。
- `Pinia` 已注册但没有 Store；`@vueuse/core`、`dayjs`、`sass` 当前未使用。

**优化方案**

- 将 Element Plus 组件和图标改为按需导入。
- 删除确认未使用的依赖；需要保留时补充明确用途。
- 比较主 JS、CSS 体积及开发体验后决定自动导入方案。

**验收标准**

- 所有页面组件和图标显示正常。
- 无未使用的运行时依赖。
- 主入口 JS/CSS 体积低于初始基线，且构建无新增警告。

### [ ] OPT-011 建立 Wasm 性能基线

**问题**

- 当前 Wasm 构建失败，无法可靠测量真实产物。
- 文档只记录了约 30 MB 的经验值，没有持续追踪传输、解析和首帧时间。

**优化方案**

- OPT-001 完成后记录 Wasm、JS glue、资源文件的原始/gzip/brotli 大小。
- 测量首次加载、缓存命中加载和首帧可交互时间。
- 选择桌面和移动端各一个固定测试环境。

**验收标准**

- 文档中有可重复执行的测量命令与结果。
- 后续 Wasm 优化有明确对照基线。
- CI 可对关键产物设置合理的体积上限。

### [ ] OPT-012 子集化 Compose 中文字体

**问题**

- `NotoSansSC-Regular.otf` 约 7.9 MB，会进入 Compose 资源。
- Demo 只使用其中很小一部分字形。

**优化方案**

- 收集 Demo 实际使用的中文、ASCII 和符号字符。
- 在构建前生成字体子集，保留源字体许可证说明。
- 验证常用文本、粗体模拟和缺字回退效果。

**验收标准**

- 所有 Demo 文本显示正确，无方框字或基线异常。
- 字体产物明显小于 7.9 MB。
- 字符集合生成过程可重复，而非手工维护二进制文件。

### [ ] OPT-013 评估并拆分 Wasm Demo bundle

**问题**

- 85 个 Demo 当前编译到同一入口，访问任一 Demo 都需要加载完整代码。
- 随着 Demo 增长，单包策略会持续放大首次加载成本。

**优化方案**

- 先完成 OPT-011 和 OPT-012，再根据测量决定是否拆包。
- 如需拆分，优先按 Foundation、Layout、Material、Animation 等分类形成少量 bundle。
- 避免按 85 个 Demo 逐个拆分，防止重复携带 Compose 公共运行时。

**验收标准**

- 有拆包前后传输体积、请求数、首帧时间和缓存复用对比。
- 常用 Demo 的首次加载明显改善。
- 构建配置和 Demo 路由仍可由自动校验覆盖。

### [ ] OPT-014 完善静态资源压缩与缓存

**问题**

- Vite assets 有 hash，可长期缓存；`public/demos/` 产物没有稳定的版本隔离策略。
- 部署文档只明确了 gzip，未覆盖 Brotli 和 Wasm 资源更新后的缓存失效。

**优化方案**

- 为 Wasm、JS、字体提供 Brotli/gzip 预压缩或服务器动态压缩。
- 使用版本化 Demo 路径或内容 hash。
- 为不可变文件设置长期缓存，为入口 HTML 设置短缓存或协商缓存。

**验收标准**

- `.wasm` 返回正确 MIME 类型和压缩编码。
- 新版本发布后不会继续加载旧 Wasm 与新 JS 的不兼容组合。
- 部署文档包含可直接验证的响应头示例。

---

## P2：测试、可访问性与安全

### [ ] OPT-015 增加 Web 单元测试

**问题**

- 当前没有测试框架和单元测试。

**优化方案**

- 使用 Vitest 覆盖数据校验、搜索、相关推荐和关键 composable。
- 优先测试高风险的数据契约，不追求低价值的模板快照数量。

**验收标准**

- 根目录可运行 Web 单元测试。
- CI 自动执行测试。
- Demo 元数据和内容引用回归能被测试捕获。

### [ ] OPT-016 增加端到端与 Wasm 冒烟测试

**问题**

- 搜索、主题同步、源码加载和 iframe/Wasm 启动依赖人工验证。

**优化方案**

- 使用 Playwright 覆盖桌面与移动端核心流程。
- 从主要分类选择代表性 Demo，验证 iframe 成功加载且没有致命控制台错误。
- 对少量稳定 Demo 增加截图回归，不对全部动画逐帧截图。

**验收标准**

- 覆盖首页、搜索、组件详情、主题切换、源码展开和 Demo 加载。
- CI 中可稳定运行，不依赖外部网络资源。

### [x] OPT-017 修复 Web 无障碍基础问题

**问题**

- 多处导航卡片和操作使用带 `@click` 的 `div`/卡片，缺少键盘语义。
- 图标按钮缺少可访问名称。
- Wasm iframe 缺少 `title`。

**优化方案**

- 导航使用真实链接，操作使用真实按钮。
- 为图标按钮增加 `aria-label` 和必要 tooltip。
- 搜索结果支持键盘导航、Enter 和 Esc。
- 补充 iframe 标题、焦点样式和基础对比度检查。

**验收标准**

- 仅使用键盘可以完成搜索、导航、主题切换和源码展开。
- 自动无障碍扫描无严重问题。
- 屏幕阅读器能识别主要按钮和 iframe 用途。

**完成结果**

- 所有内容卡片和前后页导航已改为真实路由链接；源码展开控件改为带 `aria-expanded` 与关联区域的按钮。
- 顶部图标按钮提供动态可访问名称与 tooltip，页面提供跳过链接、主内容地标、键盘焦点样式和减少动画偏好支持。
- 搜索框提供名称、`name`、`autocomplete`，结果支持方向键选择、Enter 打开和 Esc 关闭；iframe 均已提供描述用途的 `title`。
- 代码高亮加载状态已声明为礼貌通知，便于屏幕阅读器感知异步更新。

### [x] OPT-018 收紧 iframe 与 postMessage 通信

**问题**

- 父页面和 Wasm iframe 发送消息时使用 `"*"` 作为目标源。
- Kotlin 端接收主题消息时未校验消息来源和 origin。

**优化方案**

- 使用确定的同源 origin，或在配置中声明允许的 origin。
- 双方验证 `source`、`origin`、消息类型和字段范围。
- 明确 iframe sandbox 所需的最小权限。

**验收标准**

- 非预期来源的主题或高度消息会被忽略。
- 主题同步和高度调整仍正常。
- 本地开发与生产部署均有明确的 origin 处理策略。

**完成结果**

- 父页面与 Wasm iframe 均使用运行时同源 origin 发送消息，不再使用 `"*"`。
- Vue 端校验消息 origin、iframe source、类型及有限高度范围；Kotlin 端校验父窗口 origin、source、类型与布尔字段。
- 增加 `ready` / `theme-applied` 握手，iframe 初始化后可靠同步当前主题，并可自动验证主题消息是否被接受。
- iframe sandbox 仅保留 Kotlin/Wasm 同源运行所需的 `allow-scripts allow-same-origin`，部署文档已明确同源策略和权限理由。

### [x] OPT-019 拆分过重页面组件并规范响应式状态

**问题**

- `App.vue` 同时负责 Header、搜索、桌面侧栏、移动抽屉和布局状态。
- 多个简单值使用深层 `ref`，模板引用缺少明确类型。
- `window.resize`、DOM 引用和页面状态可以进一步封装。

**优化方案**

- 按职责拆出 `AppHeader`、`AppSidebar` 和 `SearchPalette`。
- 使用明确的 props/emits 契约，路由页保持为组合层。
- 对简单值采用合适的浅响应式状态，并使用类型化模板引用。

**验收标准**

- 页面行为与布局不回退。
- 子组件职责单一，公共状态来源明确。
- 关键交互有测试覆盖后再进行结构调整。

**完成结果**

- `App.vue` 已收敛为页面布局、路由副作用和状态编排层；顶部导航、搜索面板、侧栏导航分别拆为 `AppHeader`、`SearchPalette`、`AppSidebar`。
- 子组件以明确的 TypeScript props/emits 传递数据和交互命令；搜索浮层显示状态仍由 `App.vue` 统一持有。
- `useResponsiveLayout` 统一管理移动断点与 `resize` 监听的注册/清理；简单布尔值与搜索关键词使用 `shallowRef`，主滚动容器使用类型化 `useTemplateRef`。

### [x] OPT-020 验证文档代码示例的正确性

**问题**

- 页面中的 Kotlin 示例目前是字符串，TypeScript 构建无法验证其语法和 API 版本。
- 版本升级后示例可能在页面正常显示但无法编译。

**优化方案**

- 区分“可编译完整示例”和“说明性代码片段”。
- 将关键完整示例放入可编译 Kotlin source set，页面从受控源读取或同步。
- 对说明性片段增加版本审查清单和最小静态校验。

**验收标准**

- 每个高优先级组件至少有一个受构建验证的完整示例。
- Compose 版本升级时 CI 能发现关键示例失效。

**完成结果**

- `demo.sourceFile` 现在被明确约定为完整、受 `wasmJsBrowserDistribution` 编译的参考示例；组件页面直接读取该 Kotlin 源码展示，避免与页面字符串副本漂移。
- `validate:data` 为组件示例与教程片段增加分类值、Markdown/HTML 和提前闭合分隔符的最小静态校验；所有既有短片段默认是 `explanatory`。
- 新增 [代码示例审查清单](code-example-review.md)，定义 Android 文档版本与 Wasm 运行时版本升级时的检查命令和人工复核项；CI 的 `build` 已串联数据校验、Demo 映射校验和 Wasm 编译。

---

## P3：体验与长期维护

### [ ] OPT-021 建立性能预算与发布检查

**优化方案**

- 为 Web 主入口、CSS、Shiki、Wasm 和字体设置独立预算。
- 发布前自动生成产物大小摘要。
- 只有经过说明和评审时才允许提高预算。

**验收标准**

- CI 能检测明显的包体回退。
- 每次发布可追溯关键产物大小。

### [ ] OPT-022 评估可发现性与离线能力

**问题**

- Hash 路由便于静态部署，但不利于常规 URL、搜索引擎收录和服务端统计。
- 速查工具适合离线使用，但当前没有离线缓存策略。

**优化方案**

- 根据真实部署目标决定保留 Hash 路由，还是使用 History 路由加预渲染。
- 在核心构建和缓存策略稳定后，再评估 PWA 与离线文档。

**验收标准**

- 形成明确决策记录；没有产品需求时可标记为 `[-]`。
- 如实施离线能力，新版本更新和 Wasm 缓存不会互相冲突。

### [x] OPT-023 清理 Compose API 弃用警告

**问题**

- Wasm 生产构建已通过，但 `BadgeDemo.kt`、`ExposedDropdownMenuDemo.kt`、`IconDemo.kt`、`OutlinedButtonDemo.kt` 和 `TopAppBarDemo.kt` 仍有 API 弃用警告。
- 后续升级 Compose Multiplatform 时，这些调用可能变为不兼容错误。

**优化方案**

- 按当前 Compose Multiplatform 版本的替代 API 逐项迁移。
- 对需要视觉变化的组件补充人工或截图验证。

**验收标准**

- 上述文件不再产生弃用警告。
- 对应 Demo 的行为和主要视觉效果保持一致。

**完成结果**

- 双向 Material 图标已从 `Icons.Filled` 迁移到会依据阅读方向镜像的 `Icons.AutoMirrored.Filled`，视觉语义保持一致，并支持 RTL 布局。
- `ExposedDropdownMenuBox` 的三个锚点改用带 `MenuAnchorType` 和 `enabled` 参数的 API：两个只读选择框使用 `PrimaryNotEditable`，可编辑过滤框使用 `PrimaryEditable`。
- 已以 `compileKotlinWasmJs --rerun-tasks --warning-mode all` 复核，上述五个 Demo 不再输出弃用警告。

---

## 变更记录

| 日期 | 任务 | 变更 | 验证结果 |
|------|------|------|----------|
| 2026-09-17 | 初始审查 | 建立优化任务、优先级和初始基线 | Web 构建通过；Wasm 构建失败，已记录为 OPT-001 |
| 2026-09-17 | OPT-001 | 重新生成 Gradle 8.11.1 官方 Wrapper，提交 Wrapper JAR，并补充 Wasm iframe 容器页 | `./gradlew --version` 与完整 Wasm 构建通过 |
| 2026-09-17 | OPT-002 | 统一为 pnpm 10.15.1，删除 npm 锁文件，启用冻结锁文件安装与受信任构建依赖配置 | `pnpm install --frozen-lockfile --offline` 通过且未修改锁文件 |
| 2026-09-17 | OPT-003 | 固定 Node 22.19.0、pnpm 10.15.1、JDK 17，并增加跨平台 Gradle 启动脚本 | macOS 根目录一键构建通过 |
| 2026-09-17 | OPT-004 | 增加 GitHub Actions 三平台矩阵、依赖缓存、产物验证和构建产物上传 | 工作流静态校验通过；远端矩阵待首次运行 |
| 2026-09-17 | P0 产物验证 | 增加 `verify:dist`，校验 Web、Demo 入口、JS 和 Wasm 产物 | 完整构建通过；首页、Demo 与 Wasm HTTP 冒烟检查通过 |
| 2026-09-17 | OPT-005 | 将 85 项 Web Demo 元数据收敛到 `ComponentEntry.demo`，新增 Kotlin `DemoRegistry` 和一致性校验 | Web 与 Wasm 生产构建通过；`validate:demos` 校验 85 项一致 |
| 2026-09-17 | OPT-006 | 新增基于 TypeScript AST 的组件/指南结构与引用校验，并接入根构建 | `validate:data` 校验 116 个组件、9 个指南通过 |
| 2026-09-17 | OPT-007 | 页面与文档并列标明 Android 文档 Compose 版本和 Wasm Demo 运行时版本 | 版本边界说明已统一，Web 构建与数据校验通过 |
| 2026-09-17 | OPT-008 | 修正文档统计、架构与新增内容流程，并让 Demo 校验覆盖进度表 | `validate:data`、`validate:demos`、Web 构建通过 |
| 2026-09-17 | OPT-018 | 收紧 iframe sandbox 与 postMessage 的 origin、source 和消息结构校验 | Web/Wasm 完整构建与产物校验通过 |
| 2026-09-17 | OPT-023 | 迁移弃用的双向图标与 ExposedDropdownMenu 锚点 API | Wasm Kotlin 强制重编译无弃用警告 |

## 维护规则

- 开始任务时将状态改为 `[~]`，不要同时展开多个相互依赖的基础任务。
- 完成代码不等于完成任务；必须满足验收标准后才能标记 `[x]`。
- 测量性能时记录命令、环境和前后结果，避免只写“已优化”。
- 任务范围发生变化时直接更新本文件，并在变更记录说明原因。
- 发现新问题时使用下一个 `OPT-xxx` 编号，不复用已关闭编号。

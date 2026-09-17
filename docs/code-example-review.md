# 代码示例审查清单

本文档规定组件文档中 Kotlin 代码的两类来源，以及 Compose 版本升级时的审查方式。

## 1. 已构建验证的完整参考示例

组件数据中的 `demo.sourceFile` 指向 `compose-demos/src/wasmJsMain/kotlin/demos/` 下的完整 Kotlin 文件。该文件必须：

- 在 `DemoRegistry.kt` 中以同一 `demo.id` 注册；
- 被 `wasmJsBrowserDistribution` 编译；
- 在页面的“预览源码”中直接从 `/demo-sources/` 读取，而不是维护字符串副本。

`pnpm run validate:demos` 校验组件元数据、Registry、源码文件和 Demo 进度表的一致性；`pnpm run build:demos` 则实际编译这些参考示例。带有 Wasm Demo 的组件即拥有一个已构建验证的完整示例。

## 2. 说明性代码片段

组件 `examples` 和教程步骤 `code` 默认是说明性片段（可显式写为 `kind: 'explanatory'` 或 `codeKind: 'explanatory'`）。这类片段可以省略 import、宿主 `Activity`、状态来源等上下文，因此不承诺可单独编译。

`pnpm run validate:data` 会对所有片段执行最小静态检查：字段非空、分类值合法、不包含 Markdown 围栏或 HTML，以及不存在无法由省略外层上下文解释的提前闭合分隔符。它不是 Kotlin 编译器；API 可用性由同组件的完整参考示例和人工版本审查覆盖。

## 3. Compose 版本升级审查

修改 Android Compose BOM 或 Wasm Compose Multiplatform 版本时：

1. 更新 `web/src/data/components/index.ts` 中相应的 Android 文档版本或 Wasm 运行时版本，二者不可混写。
2. 执行 `pnpm run validate:data`、`pnpm run validate:demos` 和 `pnpm run build:demos`；最后一项必须成功，确保完整参考示例仍可编译。
3. 按 `docs/progress.md` 的“BOM 版本升级审查”优先处理标为高优先级的 API，并确认每项均有 `demo.sourceFile`。
4. 审查关联的说明性片段：参数名、废弃 API、实验性 API 注解和 import 路径应与目标 Android 文档版本一致。
5. 提交前执行 `pnpm run build`，让 CI 重复上述校验与 Wasm 构建。

## 4. 新增示例时

- 新增需要保证正确性的示例时，优先新增 `*Demo.kt` 并注册，而非复制代码到 TypeScript 字符串。
- 仅用于解释单个参数或模式时，使用说明性片段；保持最小、可读，并说明其依赖的上下文。

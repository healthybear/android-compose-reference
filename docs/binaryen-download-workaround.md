# Binaryen 下载问题解决方案

## 问题说明
- **不是优化导致的问题**，而是 Kotlin/Wasm 工具链需要从 GitHub 下载 Binaryen
- 中国大陆网络环境访问 GitHub 可能遇到 SSL 证书问题

## 推荐解决方案

### 方案 1：使用代理（最简单）

在 `compose-demos/gradle.properties` 中添加：

```properties
systemProp.https.proxyHost=127.0.0.1
systemProp.https.proxyPort=7890
systemProp.http.proxyHost=127.0.0.1
systemProp.http.proxyPort=7890
```

替换为你的代理地址和端口，然后运行：
```bash
pnpm run build
```

### 方案 2：临时切换网络环境

使用手机热点或其他能访问 GitHub 的网络环境，执行一次：
```bash
cd compose-demos
./gradlew kotlinBinaryenSetup
```

成功后 Binaryen 会永久缓存在 `~/.gradle/caches/`，以后无需重新下载。

### 方案 3：完全跳过 Wasm 构建（权宜之计）

如果只需要验证 Web 端优化效果：
```bash
pnpm run validate:demos && pnpm run validate:data && pnpm run build:web
```

这会跳过 Wasm 构建，只构建 Web 端。

## 已完成的优化仍然有效

优化的性价比**非常高**，不应该回退：

| 优化项 | 效果 |
|--------|------|
| OPT-009 Shiki | assets/ 文件从 283 降至 9 个 |
| OPT-012 字体子集 | 字体从 8.3MB 降至 287KB（-96.5%）|
| 总 dist/ 体积 | 从 44MB 降至 34MB（-23%）|

这些都是 Web 端优化，不影响 Wasm 构建失败的问题。

## 当前状态

- ✅ Web 端构建正常
- ✅ 数据校验正常
- ❌ Wasm 构建因 Binaryen 下载失败而阻塞（网络问题）

一旦解决 Binaryen 下载，完整构建就能通过。

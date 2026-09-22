# 部署文档

本项目采用**本地构建 + 上传产物**的方式部署，服务器只需要 Nginx，不需要安装 JDK 或 Node.js。

版本边界：文档内容对应 Android Compose BOM `2026.02.00`（UI `1.10.3`）；网页交互 Demo 使用 Compose Multiplatform `1.8.0` 与 Kotlin `2.1.10` 编译为 Wasm。两者是独立版本体系，构建或升级其中一套时请单独记录验证结果。

---

## 环境要求（本地构建机）

| 工具 | 版本要求 | 用途 |
|------|----------|------|
| JDK | 17 | 编译 Kotlin/Wasm |
| Node.js | 22.x（推荐 22.19.0） | 运行构建脚本和 Vite |
| pnpm | 10.15.1 | 依赖管理 |
| Python | 3.8+（推荐 3.13） | 字体子集化 |
| FontTools | 最新版 | Python 字体处理库 |

```bash
# 验证环境
java -version           # 需要 17
node -v                 # 需要 22.x
pnpm -v                 # 需要 10.15.1
python --version        # 需要 3.8+
python -m pip list | grep fonttools  # 确认已安装 FontTools

# 安装 FontTools（如未安装）
python -m pip install fonttools
```

### 特殊环境说明

#### Windows 用户
首次构建可能遇到 Binaryen（Kotlin/Wasm 工具链）从 GitHub 下载失败的问题。解决方案：
1. 配置网络代理：在 `compose-demos/gradle.properties` 中添加
   ```properties
   systemProp.https.proxyHost=你的代理地址
   systemProp.https.proxyPort=你的代理端口
   ```
2. 或使用能访问 GitHub 的网络环境执行一次 `cd compose-demos && gradlew kotlinBinaryenSetup`

详见 [Binaryen 下载问题解决方案](binaryen-download-workaround.md)。

#### 关于字体子集化
- **触发时机**：每次执行 `pnpm run build:demos` 或 `pnpm run build` 时，Gradle 会在 Kotlin 编译前自动运行字体子集化
- **工作原理**：扫描 `compose-demos/src/wasmJsMain/kotlin/` 下所有 `.kt` 文件，提取实际使用的字符（中文、ASCII、标点），从 `compose-demos/fonts/NotoSansSC-Regular.otf`（8.3MB）生成仅包含这些字符的子集字体（约 287KB）
- **缓存机制**：子集字体生成到 `compose-demos/build/generated/composeResources/font/`。只要源码字符集不变，不会重新生成。执行 `gradlew clean` 会清除缓存
- **增量构建**：修改已有 Demo 文本不会触发重新子集化，除非引入了新字符。新增 Demo 如果使用新字符，会在下次构建时重新生成子集字体
- **CI/CD**：GitHub Actions 会在每个平台上自动安装 FontTools，无需额外配置

---

## 构建步骤

### 1. 安装依赖

```bash
# 在项目根目录执行
pnpm install
```

### 2. 编译 Kotlin/WASM

```bash
pnpm run build:demos
```

该命令会在 Windows 上调用 `gradlew.bat`，在 macOS/Linux 上调用 `gradlew`。

编译完成后，Gradle 会自动将产物复制到 `web/public/demos/`，包括：
- `compose-demos.js`
- `*.wasm` 文件（当前 2 个，合计约 13 MiB）
- `composeResources/`（字体等资源）

> 首次编译需要下载 Gradle 依赖，耗时较长。后续增量编译会快很多。

### 3. 构建 Vue 前端

```bash
pnpm run build:web
```

等价于 `pnpm --filter web build`，输出到 `web/dist/`。

构建过程中 Vite 插件会自动将 `compose-demos/src/wasmJsMain/kotlin/demos/` 下的 `.kt` 源文件复制到 `web/dist/demo-sources/`，用于页面上的"查看预览源码"功能。

### 一步构建（推荐）

```bash
pnpm run build
```

等价于依次执行 `build:demos` 和 `build:web`。

仓库提供 `.github/workflows/build.yml`，在 Ubuntu、macOS 和 Windows 上执行同一构建。当前 Git 远端为 Gitee，因此需要先镜像或推送到 GitHub 才能运行该 GitHub Actions 工作流。

---

## 构建产物结构

```
web/dist/
├── index.html
├── assets/                  # Vue 编译产物（JS/CSS，带 hash）
├── demos/                   # WASM 相关文件
│   ├── index.html           # iframe 容器页
│   ├── compose-demos.js     # WASM JS 入口
│   ├── compose-demos.js.map
│   ├── *.wasm               # WASM 二进制文件
│   └── composeResources/    # 字体等资源
└── demo-sources/            # Kotlin 源文件（用于源码展示）
    ├── ButtonDemo.kt
    ├── TextDemo.kt
    └── ...
```

**部署时只需上传 `web/dist/` 目录的全部内容。**

### iframe 通信与部署域名

Wasm Demo 使用 `/demos/` 同源路径加载。父页面和 iframe 的 `postMessage` 均以运行时 `window.location.origin` 为唯一目标 origin，并同时校验发送窗口，因此本地 Vite、预览服务和生产域名无需分别配置白名单。不要将 `demos/` 单独部署到其他域名；如需跨域托管，应先增加显式允许源配置，而不是恢复为 `"*"`。

iframe sandbox 仅启用 `allow-scripts allow-same-origin`：前者用于运行 Kotlin/Wasm，后者用于按同源方式加载 Wasm 与 Compose 资源；未授予表单、弹窗、顶层导航、下载或摄像头等权限。

---

## 上传到服务器

### 方式一：rsync（推荐，增量同步）

```bash
rsync -avz --delete web/dist/ user@your-server:/var/www/compose-reference/
```

- `-a`：保留权限和时间戳
- `-v`：显示进度
- `-z`：传输时压缩
- `--delete`：删除服务器上已不存在的旧文件

### 方式二：scp

```bash
scp -r web/dist/ user@your-server:/var/www/compose-reference/
```

---

## Nginx 配置

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/compose-reference;
    index index.html;

    # SPA 路由：所有路径回退到 index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # WASM 文件需要正确的 MIME 类型
    location ~* \.wasm$ {
        add_header Content-Type application/wasm;
    }

    # 带 hash 的静态资源长期缓存
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 开启 gzip 压缩（WASM 文件压缩效果显著）
    gzip on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        application/javascript
        application/wasm
        application/json;
}
```

配置完成后重载 Nginx：

```bash
sudo nginx -t          # 检查配置语法
sudo nginx -s reload   # 重载配置
```

---

## 验证清单

部署完成后逐项检查：

- [ ] 访问首页，组件列表正常显示
- [ ] 搜索功能正常
- [ ] 点击任意带"可预览"标签的组件，效果预览 iframe 能加载
- [ ] 切换暗色模式，预览区域同步变化
- [ ] 点击"查看预览源码"，能展开 Kotlin 代码
- [ ] 刷新 `/component/button` 等子路由，页面正常（不返回 404）

---

## 常见问题

**Q：WASM 加载失败，控制台报 MIME 类型错误**

确认 Nginx 配置了 `.wasm` 的 Content-Type：
```nginx
location ~* \.wasm$ {
    add_header Content-Type application/wasm;
}
```

**Q：刷新页面返回 404**

缺少 SPA 路由回退配置，确认 `try_files $uri $uri/ /index.html;` 已生效。

**Q：Kotlin 编译内存不足**

修改 `compose-demos/gradle.properties`，增大 JVM 堆：
```properties
org.gradle.jvmargs=-Xmx4g -XX:MaxMetaspaceSize=512m
```

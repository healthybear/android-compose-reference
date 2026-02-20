# 部署文档

本项目采用**本地构建 + 上传产物**的方式部署，服务器只需要 Nginx，不需要安装 JDK 或 Node.js。

---

## 环境要求（本地构建机）

| 工具 | 版本要求 |
|------|----------|
| JDK | 17 或以上 |
| Node.js | 18 或以上 |
| pnpm | 9 或以上 |

```bash
# 验证环境
java -version    # 需要 17+
node -v          # 需要 18+
pnpm -v          # 需要 9+
```

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

等价于 `cd compose-demos && ./gradlew wasmJsBrowserDistribution`。

编译完成后，Gradle 会自动将产物复制到 `web/public/demos/`，包括：
- `compose-demos.js`
- `*.wasm` 文件（约 30MB+）
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

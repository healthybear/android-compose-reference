import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import path from 'path'
import fs from 'fs'

// 将 compose-demos 源文件在 dev 时作为虚拟静态资源提供，build 时复制到 dist
function demoSourcesPlugin() {
  const sourcesDir = path.resolve(__dirname, '../compose-demos/src/wasmJsMain/kotlin/demos')
  const urlPrefix = '/demo-sources/'

  return {
    name: 'demo-sources',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (!req.url?.startsWith(urlPrefix)) return next()
        const filename = decodeURIComponent(req.url.slice(urlPrefix.length))
        const filePath = path.join(sourcesDir, filename)
        if (!filePath.startsWith(sourcesDir) || !filename.endsWith('.kt')) return next()
        if (!fs.existsSync(filePath)) return next()
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end(fs.readFileSync(filePath, 'utf-8'))
      })
    },
    generateBundle() {
      if (!fs.existsSync(sourcesDir)) return
      const files = fs.readdirSync(sourcesDir).filter(f => f.endsWith('.kt'))
      for (const file of files) {
        const content = fs.readFileSync(path.join(sourcesDir, file), 'utf-8')
        this.emitFile({ type: 'asset', fileName: `demo-sources/${file}`, source: content })
      }
    }
  }
}

export default defineConfig({
  plugins: [UnoCSS(), vue(), demoSourcesPlugin()],
  server: {
    host: true,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  },
  optimizeDeps: {
    exclude: ['shiki']
  }
})

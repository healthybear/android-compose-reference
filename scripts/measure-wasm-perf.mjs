import { createServer } from 'node:http'
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { basename, extname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawn } from 'node:child_process'
import { once } from 'node:events'

const repositoryDir = new URL('..', import.meta.url).pathname
const publicDir = join(repositoryDir, 'web', 'public')
const mobile = process.argv.includes('--mobile')
const chromeCandidates = process.platform === 'darwin'
  ? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']
  : process.platform === 'win32'
    ? ['C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe']
    : ['google-chrome', 'chromium', 'chromium-browser']
const chrome = process.env.CHROME_PATH ?? chromeCandidates.find(existsSync) ?? chromeCandidates[0]
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.wasm': 'application/wasm',
  '.otf': 'font/otf',
  '.map': 'application/json; charset=utf-8',
}

function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function fetchJson(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${url} returned ${response.status}`)
  return response.json()
}

function startServer() {
  const server = createServer((request, response) => {
    const relativePath = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
      .replace(/^\/+/, '') || 'index.html'
    const file = join(publicDir, relativePath)
    if (!file.startsWith(publicDir) || !existsSync(file)) {
      response.writeHead(404).end()
      return
    }
    response.writeHead(200, {
      'Content-Type': mimeTypes[extname(file)] ?? 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000, immutable',
    })
    response.end(readFileSync(file))
  })
  return new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(server)))
}

class CdpClient {
  constructor(url) {
    this.nextId = 1
    this.pending = new Map()
    this.socket = new WebSocket(url)
    this.ready = new Promise((resolve, reject) => {
      this.socket.addEventListener('open', resolve, { once: true })
      this.socket.addEventListener('error', reject, { once: true })
    })
    this.socket.addEventListener('message', ({ data }) => {
      const message = JSON.parse(data)
      const pending = this.pending.get(message.id)
      if (!pending) return
      this.pending.delete(message.id)
      message.error ? pending.reject(new Error(message.error.message)) : pending.resolve(message.result)
    })
  }

  async command(method, params = {}) {
    await this.ready
    const id = this.nextId++
    const response = new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }))
    this.socket.send(JSON.stringify({ id, method, params }))
    return response
  }

  close() {
    this.socket.close()
  }
}

async function capture(client, url, reload = false) {
  if (reload) await client.command('Page.reload')
  else await client.command('Page.navigate', { url })

  for (let attempt = 0; attempt < 200; attempt += 1) {
    const result = await client.command('Runtime.evaluate', {
      expression: "performance.getEntriesByName('compose-demo:first-frame', 'mark').at(-1)?.startTime ?? null",
      returnByValue: true,
    })
    if (result.result.value !== null) break
    await wait(100)
  }

  await wait(1_000)

  const result = await client.command('Runtime.evaluate', {
    expression: `JSON.stringify({
      firstFrameMs: performance.getEntriesByName('compose-demo:first-frame', 'mark').at(-1)?.startTime ?? null,
      navigationMs: performance.getEntriesByType('navigation')[0]?.duration ?? null,
      resources: performance.getEntriesByType('resource')
        .filter(entry => /\\.(wasm|otf|js)(?:$|\\?)/.test(entry.name))
        .map(entry => ({ file: entry.name.split('/').pop(), transferBytes: entry.transferSize, durationMs: entry.duration }))
    })`,
    returnByValue: true,
  })
  return JSON.parse(result.result.value)
}

const server = await startServer()
const port = server.address().port
const debugPort = 9222 + Math.floor(Math.random() * 500)
const profileDir = mkdtempSync(join(tmpdir(), 'compose-wasm-perf-'))
const browser = spawn(chrome, [
  '--headless=new',
  `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${profileDir}`,
  '--no-first-run',
  '--enable-unsafe-swiftshader',
  'about:blank',
], { stdio: 'ignore' })

try {
  let pages
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      pages = await fetchJson(`http://127.0.0.1:${debugPort}/json/list`)
      if (pages.length > 0) break
    } catch {}
    await wait(100)
  }
  const page = pages?.find(candidate => candidate.type === 'page' && candidate.url === 'about:blank')
    ?? pages?.find(candidate => candidate.type === 'page')
  if (!page?.webSocketDebuggerUrl) {
    throw new Error(`Unable to start Chrome at ${chrome}. Set CHROME_PATH to a Chrome or Chromium executable.`)
  }

  const client = new CdpClient(page.webSocketDebuggerUrl)
  await client.command('Page.enable')
  await client.command('Runtime.enable')
  if (mobile) {
    await client.command('Emulation.setDeviceMetricsOverride', {
      width: 412,
      height: 915,
      deviceScaleFactor: 3,
      mobile: true,
    })
    await client.command('Emulation.setUserAgentOverride', {
      userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 Chrome/153 Mobile Safari/537.36',
    })
  }
  const url = `http://127.0.0.1:${port}/demos/index.html?demo=button`
  const result = {
    environment: { chrome: basename(chrome), device: mobile ? 'Pixel 7 viewport emulation' : 'Desktop', demo: 'button', url },
    cold: await capture(client, url),
    cached: await capture(client, url, true),
  }
  client.close()
  console.log(JSON.stringify(result, null, 2))
} finally {
  browser.kill()
  await once(browser, 'exit')
  server.close()
  rmSync(profileDir, { recursive: true, force: true })
}

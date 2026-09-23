import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'virtual:uno.css'
import './styles/design-system.css'
import router from './router'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.mount('#app')

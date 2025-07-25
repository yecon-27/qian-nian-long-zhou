import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Vant)

// 挂载应用
app.mount('#app')

// 开发环境下加载测试工具
if (import.meta.env.DEV) {
  import('./utils/testDailyReset.ts')
  import('./utils/testConnection.ts') // 加载后端连接测试工具
  import('./utils/beginnerTest.ts') // 加载初学者测试工具
}

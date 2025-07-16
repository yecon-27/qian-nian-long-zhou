import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import Rule from '../views/RulePage.vue'
import Vote from '../views/VotePage.vue'
import Rank from '../views/RankPage.vue'  
import Detail from '../views/DetailPage.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/rule', name: 'Rule', component: Rule },
  { path: '/vote', name: 'Vote', component: Vote },
  { path: '/rank', name: 'Rank', component: Rank },
  { path: '/detail/:id', name: 'DetailPage', component: Detail },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的滚动位置（比如用户点击浏览器的前进/后退按钮）
    if (savedPosition) {
      return savedPosition
    }
    // 否则总是滚动到页面顶部
    return { top: 0 }
  }
})

// 全局前置守卫，确保每次路由切换都滚动到顶部
router.beforeEach((to, from, next) => {
  // 在路由切换时立即滚动到顶部
  window.scrollTo(0, 0)
  next()
})

export default router

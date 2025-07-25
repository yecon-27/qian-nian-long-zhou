import { createRouter, createWebHistory } from 'vue-router';
// import { useAuthStore } from '@/stores/auth'; // 如果不需要认证，可以注释或删除这行

// 引入你的视图组件
import Home from '../views/HomePage.vue';
import Rule from '../views/RulePage.vue';
import Vote from '../views/VotePage.vue';
import Rank from '../views/RankPage.vue';
import Detail from '../views/DetailPage.vue';
// import Login from '../views/Login.vue'; // 如果不需要登录功能，登录页面也可以不引入或删除

const routes = [
  // 如果不需要登录功能，可以删除登录页面路由
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login,
  //   meta: {
  //     title: '登录'
  //   }
  // },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页' // 页面标题，可选
      // requiresAuth: false // 如果不设置，默认就是false，也可以明确写出
    }
  },
  {
    path: '/rule',
    name: 'Rule',
    component: Rule,
    meta: {
      title: '规则'
    }
  },
  {
    path: '/vote',
    name: 'Vote',
    component: Vote,
    meta: {
      title: '投票'
    }
  },
  {
    path: '/rank',
    name: 'Rank',
    component: Rank,
    meta: {
      title: '排行榜'
    }
  },
  {
    path: '/detail/:id',
    name: 'DetailPage',
    component: Detail,
    meta: {
      title: '详情页'
    }
  },
  // 可以添加一个404页面
  {
    path: '/:pathMatch(.*)*', // 匹配所有未定义路由
    name: 'NotFound',
    component: () => import('../views/NotFoundPage.vue') // 假设你有NotFoundPage.vue
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // 保持你原有的滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  }
});

// 全局前置守卫：现在只处理页面滚动到顶部，不再有认证逻辑
router.beforeEach((to, from, next) => {
  // 在路由切换时立即滚动到顶部
  window.scrollTo(0, 0);
  next(); // 直接放行所有路由
});

export default router;
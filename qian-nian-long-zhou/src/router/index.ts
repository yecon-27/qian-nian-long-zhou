import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

// 引入你的视图组件
import Home from '../views/HomePage.vue';
import Rule from '../views/RulePage.vue';
import Vote from '../views/VotePage.vue';
import Rank from '../views/RankPage.vue';
import Detail from '../views/DetailPage.vue';
import Login from '../views/LoginPage.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
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
      title: '投票',
      requiresAuth: true
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
  }
  // 删除或注释掉下面的404路由配置
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound', 
  //   component: () => import('../views/NotFoundPage.vue')
  // }
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

// 全局前置守卫：处理认证和页面滚动
router.beforeEach(async (to, from, next) => {
  // 在路由切换时立即滚动到顶部
  window.scrollTo(0, 0);
  
  const authStore = useAuthStore();
  
  // 如果访问登录页面且已经登录，跳转到首页
  if (to.name === 'Login' && authStore.isAuthenticated) {
    next('/');
    return;
  }
  
  // 检查页面是否需要认证
  if (to.meta.requiresAuth) {
    // 如果没有登录，跳转到登录页面
    if (!authStore.isAuthenticated) {
      next({
        name: 'Login',
        query: { redirect: to.fullPath }
      });
      return;
    }
  }
  
  next(); // 放行
});

export default router;
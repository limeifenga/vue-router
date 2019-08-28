
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//pc版
const pc = require.context('@/pages/pc', true, /pc_router\.js$/);
const routersArrayP = pc.keys().map(key => pc(key).default);

//web版
const web = require.context('@/pages/web', true, /web_router\.js$/);
const routersArrayW = web.keys().map(key => web(key).default);


const routers = [
  {
    path: '/',
    name: 'pc',
    component: r => require.ensure([], () => r(require('@/components/layout/layout-manage.vue')), 'layout_manage'),
    redirect: '/pc'
  },
  //企业版
  {
    path: '/pc',
    name: 'pc',
    component: r => require.ensure([], () => r(require('@/components/layout/layout-manage.vue')), 'layout-manage'),
    redirect: '/pc/pc_page1',
    children: routersArrayP,
  },
  {
    path: '/web',
    name: 'web',
    component: r => require.ensure([], () => r(require('@/components/layout/layout-manage.vue')), 'layout'),
    redirect: '/web/web_page1',
    children: routersArrayW,
  },
  {
    path: '*',
    redirect: '/portalPage/page404'
  }
]

const router = new Router({
  base: '/',
  routes: routers
});

router.beforeEach((to, from, next) => {
  // 输入不存在的页面跳转首页
  if (to.matched.length ===0) {
    next({
      path: '/portalPage'
    })
  } else {
    next()
  }
})

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  if(isChunkLoadFailed){
    location.reload();
  }
})

export default router


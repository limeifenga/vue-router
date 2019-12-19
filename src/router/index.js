
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//pc版
const pc = require.context('@/pages/pc', true, /pc_router\.js$/);
const routersArrayP = pc.keys().map(key => pc(key).default);

//web版
const web = require.context('@/pages/web', true, /web_router\.js$/);
const routersArrayW = web.keys().map(key => web(key).default);

const layoutManage = import('@/components/layout/layout-manage.vue')

// 几种常用路由写法【官方推荐最优写法在最后】
  // 一、基础写法，没有懒加载打包打包在一个JS中不分离代码
  //     当项目打包时路由里的所有component都会打包在一个js中
  // import HelloWorld from '@/components/HelloWorld'
  // component: HelloWorld

  // 二、路由懒加载，import()方法。（按需加载） 
  //     访问此路由时才加载这个js，会避免进入首页时加载内容过多
  // const HelloWorld = () => import('@/components/HelloWorld')
  // component: HelloWorld

  // 三、vue的异步组件，require()方法。（按需加载）
  // component: resolve => require(['@/components/HelloWorld'], resolve),

  // 四、vue的异步组件+webpack的ensure()方法。（按需加载+js打包分离）
  // const HelloWorld = r => require.ensure([], () => r(require('@/components/HelloWorld')), 'HelloWorld')
  // component: HelloWorld

  // 五、最优官方，懒加载和打包分离代码。（【官方推荐】按需加载+js打包分离）
  // vue官方的一种方法，import()方法和增加webpackChunkName。
  // 1.需要安装 cnpm i -s @babel/plugin-syntax-dynamic-import
  // 2.配置webpack，在webpack-base-conf.js的output加入chunkFilename: ‘[name].js’

  component: () => import(/* webpackChunkName: "HelloWorld" */ '@/components/HelloWorld')

const routers = [
  {
    path: '/',
    name: 'pc',
    // component: r => require.ensure([], () => r(require('@/components/layout/layout-manage.vue')), 'layout_manage'),
    // component: subVo.level === 1 ? Layout :  () =>  import(`@/components/layout/${layout-manage}.vue`),
    component: layoutManage,
    redirect: '/pc' 
  },
  //企业版
  {
    path: '/pc',
    name: 'pc',
    // component: r => require.ensure([], () => r(require('@/components/layout/layout-manage.vue')), 'layout-manage'),
    component: layoutManage,
    redirect: '/pc/pc_page1',
    children: routersArrayP,
  },
  {
    path: '/web',
    name: 'web',
    // component: r => require.ensure([], () => r(require('@/components/layout/layout-manage.vue')), 'layout-manage'),
    component: layoutManage,
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


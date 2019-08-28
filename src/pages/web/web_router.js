export default {
  path: '/account',
  name: 'account',
  component: r => require.ensure([], () => r(require('@/components/layout/layout.vue')), 'layout'),
  redirect: '/account/web_page1',
  children: [
    {
      path: 'web_page1',
      name: 'web_page1',
      component: r =>  require.ensure([], () => r(require('./web_page1')), 'web_page1'),
    },
    {
      path: 'web_page2',
      name: 'web_page2',
      component: r =>  require.ensure([], () => r(require('./web_page2')), 'web_page1'),
    },
  ]
};

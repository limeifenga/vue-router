export default {
  path: '/account',
  name: 'account',
  component: r => require.ensure([], () => r(require('@/components/layout/layout-manage.vue')), 'layout_manage'),
  redirect: '/account/pc_page1',
  children: [
    {
      path: 'pc_page1',
      name: 'pc_page1',
      component: r =>  require.ensure([], () => r(require('./pc_page1')), 'pc_page1'),
    },
    {
      path: 'pc_page2',
      name: 'pc_page2',
      component: r =>  require.ensure([], () => r(require('./pc_page2')), 'pc_page2'),
    },
  ]
};

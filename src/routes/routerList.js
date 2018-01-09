export default [
  {
    path: '/',
    component (resolve) {
      require(['@/views/'], resolve)
    },
    children: [
      {
        path: '/app-list',
        name: 'app-list',
        component (resolve) {
          require(['@/views/appList/'], resolve)
        }
      }
    ]
  }
]

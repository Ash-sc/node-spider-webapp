export default [
  {
    path: '/',
    component (resolve) {
      require(['@/views/'], resolve)
    },
    redirect: to => {
      return { name: 'dou-ban-movie' }
    },
    children: [
      {
        path: '/app-list',
        name: 'app-list',
        component (resolve) {
          require(['@/views/appList/'], resolve)
        }
      }, {
        path: '/dou-ban-movie',
        name: 'dou-ban-movie',
        component (resolve) {
          require(['@/views/doubanMovie/'], resolve)
        },
        redirect: to => {
          return { name: 'dou-ban-movie-list' }
        },
        children: [
          {
            path: '/dou-ban-movie/list',
            name: 'dou-ban-movie-list',
            component (resolve) {
              require(['@/views/doubanMovie/list'], resolve)
            }
          }, {
            path: '/dou-ban-movie/detail/:id',
            name: 'dou-ban-movie-detail',
            component (resolve) {
              require(['@/views/doubanMovie/detail'], resolve)
            }
          }
        ]
      }
    ]
  }
]

# node spider webapp
node爬虫webapp，主要为电影（数据来自豆瓣）讯息等。


# 安装与使用

```
$ npm install
$ npm start
```


# 打包编译
```
$ npm run build
```


# 目录结构
```
project
│   README.md
│   package.json
│   .eslintrc
│   ...
└───build  // webpack配置
│
└───src // source文件夹，主要代码
│   │   index.html // html入口
│   │   app.js // js入口
│   └───assets // css、font、image等
│   └───components // 公共组件
│   └───filter // 过滤器
│   └───routers // 路由
│   └───services // 数据请求
│   └───store // vuex
│   └───views // 页面模块
│
└───static // 静态资源（moment、bootstrap等）
│
└───server // Node服务端
│
```



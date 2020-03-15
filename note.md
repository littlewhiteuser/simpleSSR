## 服务端渲染 ssr
- 客户端渲染不利于SEO优化，服务端渲染的结果可以被浏览器抓取到
- SSR缺陷就是占用大量cpu和内存
- 客户端渲染首页会出现白屏，通过ssr可以减少白屏时间
- API不能用 只支持beforeCreate created

- npm install vue vue-router vuex vue-server-renderer
- npm install koa koa-router koa-static

## webpack 主要就是打包文件用的
- 模块规范也是node中的语法

- webpack webpack-cli 

## ssr 过程
- 通过配置两个webpack入口文件，打包出两个结果
- 服务端bundle.js给服务端使用，解析出一个字符串放入客户端
- 客户端bundle.js直接插入html中
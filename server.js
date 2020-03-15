// 需要node的模块规范
// require module.exports
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa() // 创建一个应用
const router = new Router // 创建一个路由系统

const fs = require('fs') // node中的内置模块，可以读取文件
const path = require('path') // 内置模块，用来操作路径的

const static = require('koa-static')

// 使用的html模块，用来承载渲染后的结果
// 这种手动引入的方式需要一直去打包，很麻烦，而且名字被定死了
// const serverBundle = fs.readFileSync(path.resolve(__dirname,'dist/server.bundle.js'),'utf-8') // 同步读取
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const template = fs.readFileSync(path.resolve(__dirname, 'dist/server.html'), 'utf-8')

const VueServerRenderer = require('vue-server-renderer') //vue的服务端渲染包

// 表示渲染时，使用我自己webpack服务端构建出来的包，并且客户端引用的是manifest文件
// 这样如果修改了client打包出来的名字，也会重新打包出一个新的文件，里面是新的文件名
const render = VueServerRenderer.createBundleRenderer(serverBundle, {
    template,
    clientManifest
}) // 创建一个渲染器
router.get('/', async (ctx) => { // 当访问/时，请求是get方法，可以执行回调，返回的是一个promise
    ctx.body = await new Promise((resolve, reject) => {
        render.renderToString({url:'/'}, (err, data) => { // 解析css必须写成回调的方式
            if (err) {
                console.log(err)
                reject(err)
            } else {
                // console.log(data)
                resolve(data)
            }
        })
    }) // 解析成一个字符串
})

app.use(static(path.resolve(__dirname, 'dist'))) // 告诉静态页去哪个目录下找
app.use(router.routes()) // 使用路由系统，必须使用

// 访问其它路径的设置
router.get('*', async (ctx) => {
    try {
        ctx.body = await new Promise((resolve, reject) => {
          render.renderToString({url:ctx.path}, (err, data) => {
            if (err) {
              console.log(err)
              reject(err)
            } else {
              resolve(data)
            }
          })
        })
    } catch (e) {
        console.log(e)
        ctx.body = "page not found"
    }
})

app.listen(3000) // 监听3000端口

// 每次修改服务器代码，都要重启服务器
// 通过nodemon 热更新 端口服务
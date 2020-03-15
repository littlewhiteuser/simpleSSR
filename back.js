// 需要node的模块规范
// require module.exports
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa() // 创建一个应用
const router = new Router // 创建一个路由系统

const Vue = require('vue')
const vm = new Vue({
    data() {
        return {
            name:'zf',
            age:'10'
        }
    },
    template:`
        <div>
            <p>{{name}}</p>
            <p>{{age}}</p>
        </div>
    `
})
const fs = require('fs') // node中的内置模块，可以读取文件
const path = require('path') // 内置模块，用来操作路径的

// 使用的html模块，用来承载渲染后的结果
const template = fs.readFileSync(path.resolve(__dirname,'template.html'),'utf-8') // 同步读取

const VueServerRenderer = require('vue-server-renderer') //vue的服务端渲染包
const render = VueServerRenderer.createRenderer({
    template
}) // 创建一个渲染器
router.get('/',async (ctx)=>{ // 当访问/时，请求是get方法，可以执行回调，返回的是一个promise
    ctx.body = await render.renderToString(vm) // 解析成一个字符串
})

app.use(router.routes()) // 使用路由系统，必须使用
app.listen(3000) // 监听3000端口

// 每次修改服务器代码，都要重启服务器
// 通过nodemon 热更新 端口服务
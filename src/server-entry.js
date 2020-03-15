import createApp from './app.js'

// 这里服务端渲染要求打包后的结果要返回一个函数

// 服务端稍后会调用这个函数 还可以传递一些参数
export default (context)=> {
    console.log(context) // 这个文件是node端执行的，所以在浏览器里看不见，只能在服务端看到
    // 不考虑动态组件里存在钩子
    // let {app, router} = createApp()
    // 渲染时 先让路由跳转到当前客户请求的路径
    // router.push(context.url)

    // 此时已经渲染完成 把当前路径对应的内容渲染好了
    // 这样就不会存在源代码里div内无内容的问题了
    // return app

    // 文档里提供了方法，考虑组价内有钩子的情况, return 一个promise
    return new Promise((resolve,reject) => {
        let {app, router, store} = createApp()
        router.push(context.url)

        router.onReady(() => {

            // 先看看是否能匹配到组件，有才会去渲染
            let matchComponents = router.getMatchedComponents()
            // 查看路由是否存在对应的组件
            if (!matchComponents.length) {
                return reject({code: 404})
            }
            Promise.all(matchComponents.map(comp => {
                return comp.asyncData && comp.asyncData(store)
                // 此时只是改变了状态，最终渲染时，我们还需要去拿到改变后的状态
            })).then(() => {
                // 这样可以让默认渲染时，加上window.__initState__
                context.state = store.state
                resolve(app)
            }, err=>{
                reject(err)
            })
        }, reject)
    })
}
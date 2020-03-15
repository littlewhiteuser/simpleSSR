import Vue from 'vue'
import App from './App.vue'
import CreateRouter from './router.js'
import CreateStore from './store.js'

export default function () { // 服务端和客户端都需要
    let router = CreateRouter()
    let store = CreateStore()
    let app = new Vue({
        // el: '#app', // 所以这个不需要了,因为服务端没有#app
        router, // 前端直接注入就可以了
        store, // 前端直接注入store
        render:h=>h(App)
    })
    return {app, router, store} // 服务端接收这两个
}

// 服务端渲染需要一个vm实例
// 加入只有一个实例，会被共享，所以每一个客户端访问都要有一个全新的实例
// 将new Vue这个代码包装成一个函数返回一个实例
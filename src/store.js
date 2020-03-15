import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => {
    let store = new Vuex.Store({
        state: {
            name: '',
            serverName: ''
        },
        mutations: {
            change(state){
                state.name = 'xxh'
            },
            changeServer(state){
                state.serverName = 'koa'
            }
        },
        actions: {
            changeName({commit}){
                console.log('客户端触发')
                // 返回一个promise，是ssr服务端asyncData要求的
                return new Promise((resolve,reject) => {
                    setTimeout(() => {
                        commit('change')
                        resolve()
                    }, 2000)
                })
            },
            changeServerName ({ commit }) {
                console.log('服务端触发')
                // 返回一个promise，是ssr服务端asyncData要求的
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        commit('changeServer')
                        resolve()
                    }, 2000)
                })
            }
        }
    })
    // 服务端环境没有window属性，只有客户端具备
    if (typeof window !== "undefined") {
        if (window.__INITIAL_STATE__) {
            store.replaceState(window.__INITIAL_STATE__)
        }
    }
    return store
}
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge')
const base = require('./webpack.base')
const VueServerRender = require('vue-server-renderer/server-plugin')

module.exports = merge(base,{
    entry: {
        server:path.resolve(__dirname, '../src/server-entry.js'), // webpack打包的入口
    },
    target:'node', // 输出的文件给node使用,告诉webpack不需要打包node自带的模块
    output:{
        // 用node的方式导出入口的函数，给node使用
        libraryTarget: 'commonjs2' // 最终打包的结果会变成module.exports = {}
    },
    plugins:[
        new VueServerRender(),
        new HtmlWebpackPlugin({ // 用html作为模板进行打包
            filename: 'server.html',
            template: path.resolve(__dirname,'../public/server.html'),
            excludeChunks:['server'] // 表示这个html不去引用打包出来的js，
        })
    ]
})

// 服务端配置文件
// 服务端打包出来的结果，是给koa用的，通过koa去渲染成一个字符串，给到客户端
// 再通过引用客户端打包出的js，来引用js的逻辑

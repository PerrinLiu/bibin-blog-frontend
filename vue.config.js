const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    //开发模式下错误显示对应行数
    devtool: 'source-map'
  },
  devServer: {
    port: 8080,
    client: {  // 解决页面弹出红色报错遮罩层
      overlay: false,//将overlay设置为false即可
    },
    proxy: {
      "/manager/api": {
        target: "http://localhost:10010/",
        changeOrigin: true,
        pathRewrite: {
          '^/manager/api': ''
        }
      },
      "/api": {
        target: "http://localhost:10010/",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    },
  }
})

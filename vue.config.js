const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    //开发模式下错误显示对应行数
    devtool: 'source-map'
  },
  devServer: {
    port: 8080,
    proxy: {
      "/manager/api/user": {
        target: "http://localhost:10010/user/user",
        changeOrigin: true,
        pathRewrite: {
          '^/manager/api/user': ''
        }
      },
      "/api/user": {
        target: "http://localhost:10010/user/user",
        changeOrigin: true,
        pathRewrite: {
          '^/api/user': ''
        }
      },
      "/api/text": {
        target: "http://localhost:10010/text",
        changeOrigin: true,
        pathRewrite: {
          '^/api/text': ''
        }
      },
      "/api/imageApi": {
        target: "https://api.lixingyong.com/api/images",
        changeOrigin: true,
        pathRewrite: {
          '^/api/imageApi': ''
        }
      }
    },
  }
})

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port:8080,
    proxy:{
      "/api/user":{
        target:"http://localhost:10010/user/user",
        changeOrigin:true,
        pathRewrite:{
          '^/api/user':''
        }
      },
      "/api/text":{
        target:"http://localhost:10010/text/text",
        changeOrigin:true,
        pathRewrite:{
          '^/api/text':''
        }
      },
      "/api/imageApi":{
        target:"https://api.lixingyong.com/api/images",
        changeOrigin:true,
        pathRewrite:{
          '^/api/imageApi':''
        }
      }
    },
  }
})

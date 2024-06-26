const { defineConfig } = require('@vue/cli-service')
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    //开发模式下错误显示对应行数
    devtool: 'source-map',
    plugins: [
      new CompressionWebpackPlugin({
        // 匹配需要进行Gzip压缩的文件类型
        algorithm: 'gzip', // 使用gzip压缩
        test: /\.(js|css|html|svg)$/,
        filename: '[path][base].gz',
        // 只有文件大小大于等于该值时才会生成Gzip文件
        threshold: 10240,
        minRatio: 0.8, // 压缩率小于1才会压缩
      }),
    ],
  },
  productionSourceMap: false, // 关闭 source map 以减少打包体积
  devServer: {
    port: 8080,
    client: {  // 解决页面弹出红色报错遮罩层
      overlay: false,//将overlay设置为false即可
    },
    proxy: {
      "/manager/api": {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/manager/api': ''
        }
      },
      "/api": {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    },
  }
})

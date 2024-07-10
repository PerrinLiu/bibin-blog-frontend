import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from '@/store'; // 导入 Vuex Store

Vue.config.productionTip = false
import { ifSuccess } from '@/utils/commonFunction'
import '@/assets/iconfont/iconfont.css'
//图片懒加载
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload,
  {
    preLoad: 1.3, //预加载的宽高比loading: 
    loadimage: require("@/assets/images/defaul.jpg"), //图片加载状态下显示的图片
    error: require("@/assets/images/defaul.jpg"), //图片加载失败时显示的图片
    dispatchEvent: true,
    attempt: 1, // 加载错误后最大尝试次数
  })

//图片预览
import hevueImgPreview from 'hevue-img-preview'
Vue.use(hevueImgPreview)

Vue.prototype.ifSuccess = ifSuccess


Vue.use(ElementUI);

// 在创建 Vue 实例之前修改全局配置
const messages = ['success', 'warning', 'info', 'error']
messages.forEach(type => {
  ElementUI.Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
      // 默认设置
      options.duration = 1000 // 显示多久,单位毫秒
      options.showClose = true // 是否显示关闭按钮
      options.offset = 200 // 距离顶部距离
    }
    if (type == null || type == undefined) {
      type = "error"
    }
    options.type = type
    return ElementUI.Message(options)
  }
})

// 在路由切换时动态修改页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '默认标题';
  next();
});

// 添加全局错误处理器
Vue.config.errorHandler = function (err, vm, info) {
  // 在这里处理错误，可以选择是否显示错误信息
  // 你可以自定义如何处理错误，例如发送错误日志给服务器等
  // 这里我们简单地不做任何处理，即阻止错误提示显示在页面上
  console.error('An error occurred:', err, info);
};

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')

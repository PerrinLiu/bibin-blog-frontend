import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from '@/store/store'; // 导入 Vuex Store

Vue.config.productionTip = false

Vue.use(ElementUI);

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
  el:'#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false


// 在路由切换时动态修改页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '默认标题';
  next();
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

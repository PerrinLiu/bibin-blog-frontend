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

new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')

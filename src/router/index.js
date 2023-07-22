import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../layout/layout.vue'

// 使用Vue Router插件
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'index',
        component: layout,
        meta: {
            title: 'Bibin'
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
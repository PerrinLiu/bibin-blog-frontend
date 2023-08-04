import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../layout/layout.vue'
import IndexViews from '../views/childViews/IndexView.vue'
import ArticleView from '../views/childViews/ArticleView.vue'
import DiaryView from '../views/childViews/DiaryView.vue'
import LoginView from '../views/childViews/LoginView.vue'
import PhotoView from '../views/childViews/PhotoView.vue'
import MessageView from '../views/childViews/MessageView.vue'

// 使用Vue Router插件
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'index',
        component: layout,
        meta: {
            title: 'Bibin'
        },
        children:[
            {
                path:'/',
                name: 'index',
                component: IndexViews,
                meta: {
                title: 'Bibin | 首页'
                }
            },
            {
                path:'/login',
                name: 'login',
                component: LoginView,
                meta: {
                title: 'Bibin | 登录'
                }
            },
            {
                path:'/article',
                name: 'article',
                component: ArticleView,
                meta: {
                title: 'Bibin | 文章'
                }
            },
            {
                path:'/message',
                name: 'message',
                component: MessageView,
                meta: {
                title: 'Bibin | 留言'
                }
            },
            {
                path:'/diary',
                name: 'diary',
                component: DiaryView,
                meta: {
                title: 'Bibin | 日记'
                }
            },
            {
                path:'/photo',
                name: 'photo',
                component: PhotoView,
                meta: {
                title: 'Bibin | 照片墙'
                }
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

// 在路由切换前执行逻辑（导航守卫 beforeEach）
router.beforeEach((to, from, next) => {
  
    // 继续路由导航
    next();
  });

export default router
import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../layout/layout.vue'
import IndexViews from '../views/childViews/IndexView.vue'
import ArticleView from '../views/childViews/ArticleView.vue'
import DiaryView from '../views/childViews/DiaryView.vue'
import LoginView from '../views/childViews/LoginView.vue'
import PhotoView from '../views/childViews/PhotoView.vue'
import MessageView from '../views/childViews/MessageView.vue'
import LoveView from '../views/childViews/LoveView.vue'

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
        children: [
            {
                path: '/',
                name: 'index',
                component: IndexViews,
                meta: {
                    title: 'Bibin | 首页'
                }
            },
            {
                path: '/login',
                name: 'login',
                component: LoginView,
                meta: {
                    title: 'Bibin | 登录'
                }
            },
            {
                path: '/love',
                name: 'love',
                component: LoveView,
                meta: {
                    title: 'Bibin | 记恋'
                }
            },
            {
                path: '/article',
                name: 'article',
                component: ArticleView,
                meta: {
                    title: 'Bibin | 文章'
                }
            },
            {
                path: '/articleDetails/:id',
                name: 'articleDetails',
                component: () => import('../views/childViews/ArticleDetailsView.vue'),
                meta: {
                    title: '详情'
                },
            },
            {
                path: '/message',
                name: 'message',
                component: MessageView,
                meta: {
                    title: 'Bibin | 留言'
                }
            },
            {
                path: '/diary',
                name: 'diary',
                component: DiaryView,
                meta: {
                    title: 'Bibin | 日记'
                }
            },
            {
                path: '/photo',
                name: 'photo',
                component: PhotoView,
                meta: {
                    title: 'Bibin | 照片墙'
                }
            },
            {
                path: '/manager',
                name: 'manager',
                component: () => import('../views/ManagerView.vue'),
                children: [
                    {
                        path: '/manager',
                        name: 'overview',
                        component: () => import('../views//managerChild/overviewView.vue'),
                        meta: {
                            title: 'Bibin | 概览'
                        }
                    },
                    {
                        path: 'diaryManager',
                        name: 'diaryManager',
                        component: () => import('../views//managerChild/DiaryManager.vue'),
                        meta: {
                            title: 'Bibin | 日记管理'
                        }
                    },
                    {
                        path: 'articleManager',
                        name: 'articleManager',
                        component: () => import('../views//managerChild/ArticleManager.vue'),
                        meta: {
                            title: 'Bibin | 文章管理'
                        }
                    },
                    {
                        path: 'photoManager',
                        name: 'photoManager',
                        component: () => import('../views//managerChild/PhotoManager.vue'),
                        meta: {
                            title: 'Bibin | 照片管理'
                        }
                    },
                    {
                        path: 'messageManager',
                        name: 'messageManager',
                        component: () => import('../views//managerChild/MessageManager.vue'),
                        meta: {
                            title: 'Bibin | 评论管理'
                        }
                    }
                ]
            }
        ]
    },

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
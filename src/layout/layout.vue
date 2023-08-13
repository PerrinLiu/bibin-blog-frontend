<template>
    <div class="home-page" @scroll="handleScroll">

        <!-- 手机导航栏 -->
        <el-drawer :visible.sync="drawer" size="65%" :show-close=false>
            <div class="phone-nav">
                <el-menu class="el-menu-demo" active-text-color="none" background-color="rgba(0, 0, 0, 0)" mode="vertical"
                    router>
                    <!-- 头像 -->
                    <el-menu-item id="el-menu-item">
                        <span class="el-dropdown-link" @click="drawer = false">
                            <span v-if="user || token != null">
                                <router-link style="text-decoration: none;" to="/login">
                                    <img width="40px" height="40px" id="user-img" :src="user.userImg" alt="">
                                    {{ user.nickname }}
                                </router-link>
                                <router-link style="text-decoration: none;" to="/">
                                    <span style="position: absolute;right: 40vw;" @click="drawer = false, logout('b')"><i
                                            class="el-icon-back"></i>退出</span>
                                </router-link>
                            </span>
                            <!-- 还没登录时，显示默认头像 -->
                            <span v-else>
                                <router-link style="text-decoration: none;" to="/login">
                                    <img width="40px" height="40px" id="user-img" src="@/assets/images/defaul.jpg" alt="">
                                </router-link>
                            </span>
                        </span>
                    </el-menu-item>
                    <!-- 导航栏 -->
                    <el-menu-item id="el-menu-item" index="/" @click="drawer = false"><i class="el-icon-school"></i>首页
                        <div class="el-menu-item-line" style="position: relative; top: -15px;"></div>
                    </el-menu-item>
                    <el-menu-item id="el-menu-item" index="/article" @click="drawer = false"><i
                            class="el-icon-notebook-1"></i>文章
                        <div class="el-menu-item-line" style="position: relative; top: -15px;"></div>
                    </el-menu-item>
                    <el-menu-item id="el-menu-item" index="/diary" @click="drawer = false"><i class="el-icon-edit"></i>小记
                        <div class="el-menu-item-line" style="position: relative; top: -15px;"></div>
                    </el-menu-item>
                    <el-menu-item id="el-menu-item" index="/photo" @click="drawer = false"><i
                            class="el-icon-picture-outline"></i>照片墙
                        <div class="el-menu-item-line" style="position: relative; top: -15px;"></div>
                    </el-menu-item>
                    <el-menu-item id="el-menu-item" index="/message" @click="drawer = false"><i
                            class="el-icon-s-comment"></i>留言
                        <div class="el-menu-item-line" style="position: relative; top: -15px;"></div>
                    </el-menu-item>
                </el-menu>
            </div>

        </el-drawer>
        <el-container>
            <transition name="el-zoom-in-center">
                <el-header v-if="show" id="layout-header">
                    <div class="float-left layout-header-left">Bibin</div>
                    <!-- 手机端布局 -->
                    <span v-if="isMobile" class="float-right" style="line-height: 60px;font-size: 30px;cursor: pointer;">
                        <!-- 导航标签 -->
                        <i class="el-icon-s-fold" @click="drawer = true"></i>

                    </span>

                    <!-- 电脑端布局 -->
                    <span v-else>
                        <el-menu class="el-menu-demo float-right" active-text-color="none"
                            background-color="rgba(0, 0, 0, 0)" mode="horizontal" router>
                            <el-menu-item id="el-menu-item" index="/"><i class="el-icon-school"></i>首页
                                <div class="el-menu-item-line" style="position: relative; top: -15px;"></div>
                            </el-menu-item>
                            <el-menu-item id="el-menu-item" index="/article"><i class="el-icon-notebook-1"></i>文章
                                <div class="el-menu-item-line" style="position: relative; top: -15px;"></div>
                            </el-menu-item>
                            <el-menu-item id="el-menu-item" index="/diary"><i class="el-icon-edit"></i>小记
                                <div class="el-menu-item-line" style="position: relative; top: -15px;"></div>
                            </el-menu-item>
                            <el-menu-item id="el-menu-item" index="/photo"><i class="el-icon-picture-outline"></i>照片墙
                                <div class="el-menu-item-line" style="position: relative; top: -15px;"></div>
                            </el-menu-item>
                            <el-menu-item id="el-menu-item" index="/message"><i class="el-icon-s-comment"></i>留言
                                <div class="el-menu-item-line" style="position: relative; top: -15px;"></div>
                            </el-menu-item>
                            <el-menu-item id="el-menu-item">
                                <el-dropdown placement="bottom" @command="logout">
                                    <span class="el-dropdown-link">
                                        <span v-if="user || token != null">
                                            <img width="40px" height="40px" id="user-img" :src="user.userImg" alt="">
                                        </span>
                                        <!-- 还没登录时，显示默认头像 -->
                                        <span v-else>
                                            <img width="40px" height="40px" id="user-img" src="@/assets/images/defaul.jpg"
                                                alt="">
                                        </span>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <span v-if="user || token != null">
                                            <router-link style="text-decoration: none;" to="/login">
                                                <el-dropdown-item command="a"><i
                                                        class="el-icon-user"></i>个人信息</el-dropdown-item>
                                            </router-link>
                                            <router-link style="text-decoration: none;" to="/">
                                                <el-dropdown-item command="b"><i
                                                        class="el-icon-back"></i>退出</el-dropdown-item>
                                            </router-link>
                                        </span>
                                        <span v-else>
                                            <router-link style="text-decoration: none;" to="/login">
                                                <el-dropdown-item command="c"><i
                                                        class="el-icon-thumb"></i>登录</el-dropdown-item>
                                            </router-link>
                                        </span>

                                    </el-dropdown-menu>
                                </el-dropdown>
                            </el-menu-item>
                        </el-menu>
                    </span>
                </el-header>
            </transition>

            <el-main id="el-main">
                <router-view ref="childRef"></router-view>
            </el-main>

            <el-footer>
                <span v-if="currentPath !== '/login'">
                    <div id="footer">
                        刘林培言的个人博客
                        @刘林培言
                    </div>
                </span>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import userApi from '@/api/userApi'
export default {
    name: 'HomePage',
    data() {
        return {
            // 头部一开始显示，通过滚动决定是否展示
            show: true,
            // 滚动位置
            scrollTop: 0,
            // token值
            token: null,
            // 页面宽度，决定展示哪种布局
            isMobile: false, // 根据实际情况初始化
            drawer: false,
        }
    },
    computed: {
        // 拿到用户信息
        user() {
            return this.$store.state.user; // 通过 this.$store.state 访问用户信息
        },
        currentPath() {
            return this.$route.path; // 通过 $route 对象获取当前路径
        },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        this.token = localStorage.getItem('token');
        if (this.token != null && this.$route.path != '/login') {
            this.getUser();
        }
        // 使用窗口大小监听来更新 isMobile 值
        window.addEventListener('resize', this.updateLayout);
        this.updateLayout(); // 初始化时执行一次
    },
    methods: {
        updateLayout() {
            this.isMobile = window.innerWidth <= 910; // 根据实际情况设置阈值
        },
        //监听滚动事件
        handleScroll() {
            const currentScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScrollTop > this.scrollTop) {
                // 向下滚动
                this.show = false;
            } else {
                // 向上滚动
                this.show = true;
            }
            // 更新上一次的滚动距离
            this.scrollTop = currentScrollTop;
        },
        logout(command) {
            if (command == 'b') {
                userApi.logout().then(response => {
                    if (response.data.retCode == 200) {
                        this.$message({
                            message: "已退出~",
                            type: 'success'
                        });
                        localStorage.removeItem('token');
                        this.token = null;
                        this.$store.commit('clearUser');
                    }
                }).catch(err => {
                    localStorage.removeItem('token');
                    console.log(err);
                })
            }
        },
        getUser() {
            userApi.getUser().then(response => {
                this.userInfo = response.data.data;
                this.userInfo.userId = response.data.data.userId;
                // 将 this.userInfo 深拷贝到 this.userOld
                this.userOld = JSON.parse(JSON.stringify(this.userInfo));
                // 登录成功后得到用户信息 user
                this.$store.commit('setUser', response.data.data);
            }).catch(err => {
                this.token = null;
                localStorage.removeItem('token');
                console.log(err);
            })
        },
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.updateLayout);
    }
}
</script>


<style scoped>
@import '@/assets/css/layout.css';
@import '@/assets/css/default.css';
</style>
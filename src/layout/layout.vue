<template>
    <div class="home-page" @scroll="handleScroll">
        <el-container>
            <transition name="el-zoom-in-center">
                <el-header v-if="show" id="layout-header">
                    <div class="float-left layout-header-left">Bibin</div>
                    <el-menu class="el-menu-demo float-right" active-text-color="none" background-color="rgba(0, 0, 0, 0)"
                        mode="horizontal" router>
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
                                    <span v-if="user||token!=null">
                                        <img width="40px" height="40px" id="user-img" :src="user.userImg" alt="">
                                    </span>
                                    <span v-else>
                                        <img width="40px" height="40px" id="user-img" src="https://llpy-blog.oss-cn-shenzhen.aliyuncs.com/userImg/2023-08/defaul.jpg" alt="">
                                    </span>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <span v-if="user||token != null">
                                        <router-link style="text-decoration: none;" to="/login">
                                            <el-dropdown-item command="a"><i
                                                    class="el-icon-user"></i>个人信息</el-dropdown-item>
                                        </router-link>
                                        <router-link style="text-decoration: none;" to="/">
                                            <el-dropdown-item command="b"><i class="el-icon-back"></i>退出</el-dropdown-item>
                                        </router-link>
                                    </span>
                                    <span v-else>
                                        <router-link style="text-decoration: none;" to="/login">
                                            <el-dropdown-item command="c"><i class="el-icon-thumb"></i>登录</el-dropdown-item>
                                        </router-link>
                                    </span>

                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-menu-item>
                    </el-menu>
                </el-header>
            </transition>

            <el-main id="el-main">
                <router-view ref="childRef"></router-view>
            </el-main>

            <!-- <el-footer>
                <span v-if="currentPath !== '/login'">
                    <div id="footer">
                        刘林培言的个人博客
                        @刘林培言
                    </div>
                </span>
            </el-footer> -->
        </el-container>
    </div>
</template>

<script>
import userApi from '@/api/userApi'
export default {
    name: 'HomePage',
    data() {
        return {
            show: true,
            scrollTop: 0,
            token: null,
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        this.token = localStorage.getItem('token');
    },
    computed: {
        user() {
            return this.$store.state.user; // 通过 this.$store.state 访问用户信息
        },
        currentPath() {
            return this.$route.path; // 通过 $route.path 访问当前路径
        },
    },
    methods: {
        //监听滚动事件
        handleScroll() {
            const currentScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScrollTop > this.scrollTop) {
                // 向下滚动
                this.show = false;
            } else{
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
        window.removeEventListener('scroll', this.handleScroll)
    }
}
</script>


<style scoped>
@import '@/assets/css/layout.css';
@import '@/assets/css/default.css';
</style>
<template>
    <div class="home-page" @scroll="handleScroll">
        <el-container>
            <transition name="el-zoom-in-center">
                <el-header v-if="show" id="layout-header">
                    <h1 class="float-left">Bibin</h1>
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
                                    <img id="user-img" src="@/assets/images/defaul.jpg" alt="">
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <span v-if="user">
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
                <router-view></router-view>
            </el-main>
            <el-footer id="footer">
                <div>
                    刘林培言的个人博客
                    @刘林培言
                </div>
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
            show: true,
            scrollTop: 0,

        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    computed: {
        user() {
            return this.$store.state.user; // 通过 this.$store.state 访问用户信息
        }
    },
    methods: {
        //监听滚动事件
        handleScroll() {
            this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (this.scrollTop > 90) {
                this.show = false;
            } else {
                this.show = true;
            }
        },
        logout(command) {
            if (command == 'b') {
                this.$store.commit('clearUser');
                userApi.logout().then(response => {
                    if (response.data.retCode == 200) {
                        this.$message({
                            message: "已退出~",
                            type: 'success'
                        });
                    }
                })
            }
        }
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
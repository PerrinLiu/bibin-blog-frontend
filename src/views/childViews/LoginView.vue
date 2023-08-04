<template>
    <transition name="el-zoom-in-center">
        <div v-show="login_show" class="login-page">
            <span v-if="token != null">
                <div class="isLogin">
                    <span class="isLogin-userImg"><img src="@/assets/images/defaul.jpg" alt=""></span>
                    <el-form class="login-from" v-model="user" label-width="80px">
                        <el-form-item label="昵称：">
                            <el-input v-model="user.nickname"></el-input>
                        </el-form-item>
                        <el-form-item label="用户名：">
                            {{ user.username }}
                        </el-form-item>
                        <el-form-item label="邮箱：">
                            {{ user.email }}
                        </el-form-item>
                        <el-form-item label="城市：">
                            <el-input v-model="user.city"></el-input>
                        </el-form-item>
                        <el-form-item label="性别：">
                            <el-radio-group v-model="user.gender">
                                <el-radio label="男"></el-radio>
                                <el-radio label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="noLogin-left-btn2" type="primary" @click="update()">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </span>
            <span v-else>
                <div class="noLogin">
                    <transition name="el-zoom-in-center">
                        <div v-show="show2" class="noLogin-left">
                            <el-form v-model="userQuery" class="noLogin-left-from">
                                <el-form-item>
                                    <el-input v-model="userQuery.username" type="text" placeholder="用户名"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="userQuery.password" type="password" placeholder="密码"></el-input>
                                </el-form-item>
                                <span class="noLogin-left-btn1" @click="submitForm()">忘记密码?</span>
                                <el-form-item>
                                    <el-button class="noLogin-left-btn2" type="primary" @click="login()">登录</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </transition>
                    <transition name="el-zoom-in-bottom">
                        <div v-show="show2" class="noLogin-right">
                            <div class="noLogin-right-reg">
                                <h1>没有账号？</h1>
                                <br><br><br>
                                <el-button class="noLogin-right-btn1" @click="show2 = !show2, show1 = !show1" type="primary"
                                    style="margin-left: 16px;">
                                    立即注册
                                </el-button>
                            </div>
                        </div>
                    </transition>
                </div>

                <div class="noRegister" v-show="show1">
                    <transition name="el-zoom-in-bottom">
                        <div v-show="show1" class="register-left" style="background-color: rgba(13, 117, 236, 0.9);">
                            <div class="noLogin-right-reg">
                                <h1>已有账号？</h1>
                                <br><br><br>
                                <el-button class="noLogin-right-btn1" @click="show2 = !show2, show1 = !show1" type="primary"
                                    style="margin-left: 16px;">
                                    去登陆
                                </el-button>
                            </div>
                        </div>
                    </transition>
                    <transition name="el-zoom-in-center">
                        <div v-show="show1" class="register-right" style="background-color: rgba(249, 250, 248, 0.9);">
                            <el-form v-model="userQuery" class="noLogin-left-from">
                                <el-form-item>
                                    <el-input v-model="userQuery.username" type="text" placeholder="用户名"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="userQuery.password" type="password" placeholder="密码"></el-input>
                                </el-form-item>
                                <span class="noLogin-left-btn1" @click="submitForm()">忘记密码?</span>
                                <el-form-item>
                                    <el-button class="noLogin-left-btn2" type="primary" @click="register()">注册</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </transition>
                </div>

            </span>
        </div>
    </transition>
</template>

<script>
import userApi from '@/api/userApi';
export default {
    data() {
        return {
            userQuery: {
                username: "",
                password: "",
            },
            show2: true,
            show1: false,
            token: null,
            login_show:false
        }
    },
    computed: {
        user() {
            return this.$store.state.user; // 通过 this.$store.state 访问用户信息
        }
    },
    created() {
        this.token = localStorage.getItem('token');
        if (this.token != null) {
            this.getUser();
        }
    },
    mounted(){
        this.login_show = true;
    },
    methods: {
        login() {
            userApi.login(this.userQuery).then(response => {
                const retCode = response.data.retCode;
                if (retCode == 200) {
                    localStorage.setItem('token', JSON.stringify(response.data.data.token));
                    this.getUser();
                    this.$message({
                        message: "登录成功",
                        type: 'success'
                    });
                    this.$router.push('/');
                } else {
                    this.$message({
                        message: response.data.message,
                        type: 'warning'
                    });
                }
            }).catch(err => {
                console.log(err);
            })
        },
        getUser() {
            userApi.getUser().then(response => {
                this.userInfo = response.data.data;
                // 假设登录成功后得到用户信息 user
                this.$store.commit('setUser', this.userInfo);
            }).catch(err => {
                this.token = null;
                localStorage.removeItem('token');
                console.log(err);
            })
        },
    }
}
</script>

<style scoped>
@import '@/assets/css/login.css';
/* 背景展示动画 */
.el-zoom-in-center-enter-active,
.el-zoom-in-center-leave-active {
    transition: transform 1.0s;
}

/* 登录页展示动画 */
.el-zoom-in-center-enter-active, .el-zoom-in-center-leave-active,
.el-zoom-in-top-enter-active, .el-zoom-in-top-leave-active,
.el-zoom-in-bottom-enter-active, .el-zoom-in-bottom-leave-active {
  transition: 0.8s; /* 使用CSS过渡属性来定义动画效果 */
}
</style>
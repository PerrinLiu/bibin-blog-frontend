<template>
    <transition name="el-zoom-in-center">

        <div v-show="login_show" class="login-page">
            <div class="div-with-lines">
            </div>
            <div class="backgroundImg">
            </div>
            <span v-if="token != null">
                <div class="isLogin">
                    <div class="isLogin-left">
                        <span class="isLogin-userImg">
                            <el-upload class="avatar-uploader" action="/api/user/updateUserImg" :show-file-list="false"
                                :headers="uploadHeaders" :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img :src="userInfo.userImg">
                                <div class="imgHover" >更换图片</div>
                            </el-upload>
                            
                        </span>
                        <el-form class="login-from" v-model="userInfo" label-width="80px">
                            <el-form-item label="昵称：">
                                <el-input v-model="userInfo.nickname"></el-input>
                            </el-form-item>
                            <el-form-item label="用户名：">
                                {{ userInfo.username }}
                            </el-form-item>
                            <el-form-item label="邮箱：">
                                <span v-if="changeEmail">
                                    {{ userInfo.email }}
                                </span>
                                <span v-else>
                                    <el-input style="width: 50%;" v-model="userInfo.email"></el-input>
                                </span>
                                &nbsp;&nbsp;
                                <span v-if="changeEmail">
                                    <el-button plain size="mini" @click="changeEmail = !changeEmail" icon="el-icon-edit"
                                        circle>
                                    </el-button>
                                </span>
                                <span v-else>
                                    <el-button plain size="mini" @click="changeEmail = !changeEmail" icon="el-icon-check"
                                        circle>
                                    </el-button>
                                </span>
                            </el-form-item>
                            <el-form-item label="城市：">
                                <span v-if="changeCity">
                                    {{ userInfo.city }}
                                </span>
                                <span v-else>
                                    <el-input style="width: 35%;" v-model="userInfo.city"></el-input>
                                </span>
                                &nbsp;&nbsp;
                                <span v-if="changeCity">
                                    <el-button plain size="mini" @click="changeCity = !changeCity" icon="el-icon-edit"
                                        circle>
                                    </el-button>
                                </span>
                                <span v-else>
                                    <el-button plain size="mini" @click="changeCity = !changeCity" icon="el-icon-check"
                                        circle>
                                    </el-button>
                                </span>
                            </el-form-item>
                            <el-form-item label="性别：">
                                <el-radio-group v-model="userInfo.gender">
                                    <el-radio label="男"></el-radio>
                                    <el-radio label="女"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <el-button style="position: relative; left: 30%;" class="noLogin-left-btn2" type="primary"
                                    @click="update()">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="isLogin-right">
                        123
                    </div>
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
                                    <el-input v-model="userQuery.password" type="password" placeholder="密码"
                                        show-password></el-input>
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
                        <div v-show="show1" class="register-left" style="background-color: rgba(13, 117, 236, 1);">
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
                        <div v-show="show1" class="register-right" style="background-color: rgba(249, 250, 248, 1);">
                            <el-form v-model="userRegister" class="noLogin-right-from">
                                <el-form-item>
                                    <el-input v-model="userRegister.username" type="text" placeholder="用户名"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="userRegister.nickname" type="text" placeholder="昵称"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="userRegister.password" type="password" show-password
                                        autocomplete="new-password" placeholder="密码"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="userRegister.rPassword" type="password" show-password
                                        autocomplete="new-password" placeholder="验证密码"></el-input>
                                </el-form-item>
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
            uploadHeaders: {
                // 在这里添加您的请求头信息
                'x-token': JSON.parse(localStorage.getItem('token'))
            },
            userQuery: {
                username: "",
                password: "",
            },
            userRegister: {
                username: "",
                password: "",
                rPassword: "",
                nickname: "",
            },
            changeEmail: true,
            changeCity: true,
            show2: true,
            show1: false,
            token: null,
            login_show: false,
            userInfo: {},
            userOld: {},
        }
    },
    created() {
        this.token = localStorage.getItem('token');
        if (this.token != null) {
            this.getUser();
        }
    },
    mounted() {
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
            })
                .catch(err => {
                    console.log(err);
                })
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
        update() {
            //判断是否修改过
            let flag = false;
            for (let key in this.userInfo) {
                if (this.userInfo[key] != this.userOld[key]) {
                    flag = true;
                }
            }
            //如果没修改过则不发起请求
            if (!flag) {
                this.$message({
                    message: "您的信息并没有变动",
                    type: 'warning',
                    duration: 1000
                });
                return;
            }
            userApi.updateUser(this.userInfo).then(response => {
                this.$message({
                    message: response.data.data,
                    type: 'success',
                    duration: 1000
                });
                this.getUser();
                this.userOld = JSON.parse(JSON.stringify(this.userInfo));
            }).catch(err => {
                console.log(err);
            })
        },
        register() {
            if (this.userRegister.password != this.userRegister.rPassword) {
                this.$message({
                    message: "密码不一致",
                    type: 'warning',
                    duration: 1000
                });
                return;
            }
            let userRegister = {
                username: this.userRegister.username,
                password: this.userRegister.password,
                nickname: this.userRegister.nickname,
            };
            userApi.register(userRegister).then(response => {
                if (response.data.retCode == 200) {
                    this.$message({
                        message: response.data.message,
                        type: 'success',
                        duration: 1000
                    });
                } else {
                    this.$message({
                        message: response.data.message,
                        type: 'warning',
                        duration: 1000
                    });
                }
            }).catch(err => {
                console.log(err);
            })
        },
        updateUserImg(file) {
            console.log(file);
            userApi.updateUserImg().then(response => {
                console.log(response.data);
            }).catch(err => {
                console.log(err);
            })
        },
        handleAvatarSuccess() {
            this.getUser();
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
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
.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active,
.el-zoom-in-bottom-enter-active,
.el-zoom-in-bottom-leave-active {
    transition: 0.8s;
    /* 使用CSS过渡属性来定义动画效果 */
}
</style>
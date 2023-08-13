<template>
    <transition name="el-zoom-in-center">
        <div v-show="login_show" class="login-page">
            <div class="div-with-lines">
            </div>
            <div class="backgroundImg">
            </div>
            <span v-if="token != null">
                <div class="isLogin" :style="'left:' + isLoginLeft + 'vw'" style="overflow: hidden;">
                    <!-- 手机端 -->
                    <span v-if="isPhone">
                        <div style="width:100vw;height:100%;overflow-y: scroll;">
                            <div class="isLogin-phone">
                                <span>
                                    <el-upload class="avatar-uploader" action="/api/user/updateUserImg"
                                        :show-file-list="false" :headers="uploadHeaders" :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                        <img :src="userInfo.userImg">
                                    </el-upload>
                                </span>
                                <el-form class="login-phone-from" :model="userInfo" label-width="80px"
                                    :rules="registerRules" ref="updateUser">
                                    <el-form-item prop="nickname" label="昵称：">
                                        <el-input v-model="userInfo.nickname"></el-input>
                                    </el-form-item>
                                    <el-form-item label="用户名：">
                                        {{ userInfo.username }}
                                    </el-form-item>
                                    <el-form-item prop="email" label="邮箱：">
                                        <span v-if="changeEmail">
                                            {{ userInfo.email }}
                                        </span>
                                        <span v-else>
                                            <el-input style="width: 70%;" v-model="userInfo.email"></el-input>
                                        </span>
                                        &nbsp;&nbsp;
                                        <span v-if="changeEmail">
                                            <el-button plain size="mini" @click="changeEmail = !changeEmail"
                                                icon="el-icon-edit" circle>
                                            </el-button>
                                        </span>
                                        <span v-else>
                                            <el-button plain size="mini" @click="changeEmail = !changeEmail"
                                                icon="el-icon-check" circle>
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
                                            <el-button plain size="mini" @click="changeCity = !changeCity"
                                                icon="el-icon-edit" circle>
                                            </el-button>
                                        </span>
                                        <span v-else>
                                            <el-button plain size="mini" @click="changeCity = !changeCity"
                                                icon="el-icon-check" circle>
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
                                        <el-button style="position: relative; left: 20%;" class="noLogin-left-btn2"
                                            type="primary" @click="update('updateUser')">提交</el-button>
                                    </el-form-item>
                                </el-form>
                                <!-- 照片和日记 -->
                                <div style="position: relative;top: 50px;width: 96vw;">
                                    <div class="isLogin-right-top">
                                        <div class="isLogin-right-top-top">
                                            <h3>我的照片</h3>
                                        </div>
                                        <!-- 照片，分为一组一组 -->
                                        <div style="height:85%;overflow-y: scroll;">
                                            <span v-if="userPhoto == null">
                                                <el-empty description="没有任何照片~"></el-empty>
                                            </span>
                                            <span v-else>
                                                <el-card class="float-left" v-for="(o) in 10" :key="o"
                                                    style="width:46%;height:100px;margin-left: 2vw;margin-top: 15px;">
                                                    <img width="100%"
                                                        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                                        class="image">
                                                    <div class="el-card-hover">
                                                        <span class="el-card-hover-span">
                                                            <span style="font-size: 16px;font-weight: 800;margin-right: 30px;">照片</span>
                                                        </span>
                                                    </div>
                                                </el-card>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="isLogin-right-bottom">
                                        <div class="isLogin-right-top-top">
                                            <h3>我的日记</h3>
                                        </div>
                                        <!-- 日记 -->
                                        <div style="height:85%;overflow-y: scroll;">
                                            <span v-if="userDiary == null">
                                                <el-empty description="你还没写过日记~"></el-empty>
                                            </span>
                                            <span v-else>
                                                <el-card style="width: 90%;margin: 10px 5%;" v-for="o in 10" :key="o">
                                                    <div>
                                                        {{ o }}
                                                    </div>
                                                </el-card>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </span>
                    <!-- 电脑端 -->
                    <span v-else>
                        <div class="isLogin-left">
                            <span class="isLogin-userImg">
                                <el-upload class="avatar-uploader" action="/api/user/updateUserImg" :show-file-list="false"
                                    :headers="uploadHeaders" :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                    <img :src="userInfo.userImg">
                                    <div class="imgHover">更换图片</div>
                                </el-upload>

                            </span>
                            <el-form class="login-from" :model="userInfo" label-width="80px" :rules="registerRules"
                                ref="updateUser">
                                <el-form-item prop="nickname" label="昵称：">
                                    <el-input v-model="userInfo.nickname"></el-input>
                                </el-form-item>
                                <el-form-item label="用户名：">
                                    {{ userInfo.username }}
                                </el-form-item>
                                <el-form-item prop="email" label="邮箱：">
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
                                        <el-button plain size="mini" @click="changeEmail = !changeEmail"
                                            icon="el-icon-check" circle>
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
                                    <el-button style="position: relative; left: 30%;" class="noLogin-left-btn2"
                                        type="primary" @click="update('updateUser')">提交</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="isLogin-right">
                            <div class="isLogin-right-top">
                                <div class="isLogin-right-top-top" style="border-top-right-radius: 1rem;">
                                    <h3>我的照片</h3>
                                </div>
                                <!-- 照片，分为一组一组 -->
                                <div style="height:85%;overflow-y: scroll;">
                                    <span v-if="userPhoto == null">
                                        <el-empty description="没有任何照片~"></el-empty>
                                    </span>
                                    <span v-else>
                                        <el-row>
                                            <el-col style="height: 140px;width: 100px;" v-for="(o, index) in 10" :key="o"
                                                :offset="index > 0 ? 3 : 3">
                                                <el-card :body-style="{ padding: '0px' }"
                                                    style="margin:10px -30px;height:120px;">
                                                    <img width="100%"
                                                        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                                        class="image">
                                                </el-card>
                                                <div class="el-card-hover">
                                                    <span class="el-card-hover-span">
                                                        <span style="font-size: 16px;font-weight: 800;">照片</span>
                                                    </span>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </span>
                                </div>
                            </div>
                            <div class="isLogin-right-bottom">
                                <div class="isLogin-right-top-top">
                                    <h3>我的日记</h3>
                                </div>
                                <!-- 日记 -->
                                <div style="height:85%;overflow-y: scroll;">
                                    <span v-if="userDiary == null">
                                        <el-empty description="你还没写过日记~"></el-empty>
                                    </span>
                                    <span v-else>
                                        <el-card style="width: 90%;margin: 10px 2%;" v-for="o in 10" :key="o">
                                            <div>
                                                {{ o }}
                                            </div>
                                        </el-card>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </span>
                </div>
            </span>
            <span v-else>
                <div class="noLogin" :style="'left:' + noLoginLeft + 'vw'">
                    <transition name="el-zoom-in-center">
                        <div v-show="show2" class="noLogin-left">
                            <el-form :model="userQuery" class="noLogin-left-from" :rules="loginRules" ref="userQuery">
                                <el-form-item prop="username">
                                    <el-input v-model="userQuery.username" type="text" placeholder="用户名"></el-input>
                                </el-form-item>
                                <el-form-item prop="password">
                                    <el-input v-model="userQuery.password" type="password" placeholder="密码"
                                        show-password></el-input>
                                </el-form-item>
                                <span class="noLogin-left-btn1" @click="submitForm()">忘记密码?</span>
                                <el-form-item>
                                    <el-button class="noLogin-left-btn2" type="primary"
                                        @click="login('userQuery')">登录</el-button>
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

                <div class="noRegister" v-show="show1" :style="'left:' + noLoginLeft + 'vw'">
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
                            <el-form :model="userRegister" class="noLogin-right-from" :rules="registerRules"
                                ref="userRegister">
                                <el-form-item prop="username">
                                    <el-input v-model="userRegister.username" type="text" placeholder="用户名"></el-input>
                                </el-form-item>
                                <el-form-item prop="nickname">
                                    <el-input v-model="userRegister.nickname" type="text" placeholder="昵称"></el-input>
                                </el-form-item>
                                <el-form-item prop="password">
                                    <el-input v-model="userRegister.password" type="password" show-password
                                        autocomplete="new-password" placeholder="密码"></el-input>
                                </el-form-item>
                                <el-form-item prop="email">
                                    <el-input v-model="userRegister.email" type="text" placeholder="邮箱"></el-input>
                                    <el-button style="position: absolute;right: 0px;" @click="sendEmail()">
                                        <span v-if="showCaptcha">获取验证码</span>
                                        <span v-else>{{ time }}&nbsp;s</span>
                                    </el-button>
                                </el-form-item>
                                <el-form-item prop="captcha">
                                    <el-input v-model="userRegister.captcha" type="text" placeholder="验证码"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button class="noLogin-left-btn2" type="primary"
                                        @click="register('userRegister')">注册</el-button>
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
            //上传图片时，携带请求头
            uploadHeaders: {
                // 在这里添加您的请求头信息
                'x-token': JSON.parse(localStorage.getItem('token'))
            },
            //登录对象
            userQuery: {
                username: '',
                password: '',
            },
            //注册对象
            userRegister: {
                username: "",
                password: "",
                email: "",
                nickname: "",
                captcha: "",
            },
            //验证码倒计时
            time: 60,
            intervalId: null, // 用于存储定时器的ID
            //获取验证码状态
            showCaptcha: true,
            //邮箱状态（修改
            changeEmail: true,
            //城市状态（修改
            changeCity: true,
            //默认展示登录页
            show2: true,
            //注册页
            show1: false,
            //token初始化
            token: null,
            //界面动画
            login_show: false,
            //用户信息
            userInfo: {},
            //修改用户时验证是否有变化
            userOld: {},
            //用户照片栏
            userPhoto: null,
            //用户日记
            userDiary: null,
            loginRules: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ],
            },
            registerRules: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ],
                nickname: [
                    { required: true, message: '昵称不能为空', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                captcha: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' },
                ]
            },
            //登录框样式
            noLoginLeft: '',
            //客户端样式
            isPhone: false,
            isLoginLeft: '',
        }
    },
    created() {
        this.token = localStorage.getItem('token');
        this.userInfo = this.$store.state.user;
    },
    mounted() {
        //页面加载后开始展示
        this.login_show = true;
        //如果token不为空，获取用户
        if (this.token != null) {
            this.getUser();
        }
        // 使用窗口大小监听来更新 isMobile 值
        window.addEventListener('resize', this.updateLayout);
        this.updateLayout(); // 初始化时执行一次
    },
    methods: {
        updateLayout() {
            if (window.innerWidth <= 910) {  // 根据实际情况设置阈值
                //给未登录更新动态样式
                this.noLoginLeft = 0;
                this.isPhone = true;
                this.isLoginLeft = 3;
            } else if (window.innerWidth <= 1340) {
                this.noLoginLeft = 20;
                this.isPhone = false;
                this.isLoginLeft = 3;
            } else if (window.innerWidth <= 1600) {
                this.isLoginLeft = 10;
                this.isPhone = false;
            } else {
                this.noLoginLeft = 30;
                this.isLoginLeft = 15;
                this.isPhone = false;
            }
        },
        login(formName1) {
            let flag = true;
            this.$refs[formName1].validate((valid) => {
                if (!valid) {
                    flag = false;
                    return;
                }
            });
            //如果表单验证不通过 直接返回，不让提交
            if (!flag) return;

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
                this.$message({
                    message: "服务端未启动",
                    type: 'warning'
                });
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
        update(formName) {
            let flag1 = true;
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    flag1 = false;
                    return;
                }
            });
            //如果表单验证不通过 直接返回，不让提交
            if (!flag1) return;
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
        sendEmail() {
            // 定义邮箱格式正则表达式
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            // 使用正则表达式验证邮箱格式
            const isEmail = emailRegex.test(this.userRegister.email);
            if (!isEmail) {
                this.$message({
                    message: "邮箱格式错误",
                    type: 'warning',
                    duration: 1000
                });
                return;
            }
            if (this.intervalId != null) {
                this.$message({
                    message: "请不要重复提交",
                    type: 'warning',
                    duration: 1000
                });
                return;
            }
            userApi.sendEmail({
                params: {
                    email: this.userRegister.email
                }
            }).then(response => {
                const retCode = response.data.retCode;
                if (retCode == 200) {
                    localStorage.setItem('emailToken', JSON.stringify(response.data.data));
                    console.log(localStorage.getItem('emailToken'));
                    this.$message({
                        message: response.data.message,
                        type: 'success'
                    });
                    this.showCaptcha = false;
                    //倒计时
                    this.intervalId = setInterval(this.updateCountdown, 1000);
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
        //验证码重新倒计时
        updateCountdown() {
            if (this.time > 0) {
                this.time -= 1;
            } else {
                clearInterval(this.intervalId);
                this.intervalId = null;
                this.showCaptcha = true;
                this.time = 60;
            }
        },
        register(formName) {
            let flag = true;
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    flag = false;
                    return;
                }
            });
            //如果表单验证不通过 直接返回，不让提交
            if (!flag) return;

            userApi.register(this.userRegister).then(response => {
                if (response.data.retCode == 200) {
                    this.$message({
                        message: response.data.data,
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
        updateUserImg() {
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
    },
    beforeDestroy() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
        }
    },
}
</script>

<style scoped>
@import '../../assets/css/login.css';


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
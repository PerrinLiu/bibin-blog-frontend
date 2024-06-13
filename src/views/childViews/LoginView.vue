<template>
  <transition name="el-zoom-in-center">
    <div v-show="login_show" class="login-page">
      <div class="div-with-lines">
      </div>
      <div class="backgroundImg">
      </div>
      <span v-if="token != null">
        <div class="isLogin" :style="'left:' + isLoginLeft + 'vw'" style="overflow: hidden;">
          <!-- todo 将手机端和pc端合并 -->
          <!-- 手机端 -->
          <span v-if="isPhone">
            <div style="width:100vw;height:100%;overflow-y: scroll;">
              <div class="isLogin-phone">
                <span>
                  <el-upload class="avatar-uploader" action="/api/user/updateUserImg" :show-file-list="false" :headers="uploadHeaders"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img :src="userInfo.userImg">
                  </el-upload>
                </span>
                <el-form class="login-phone-from" :model="userInfo" label-width="80px" :rules="registerRules" ref="updateUser">
                  <el-form-item prop="nickname" label="昵称：">
                    <el-input v-model="userInfo.nickname"></el-input>
                  </el-form-item>
                  <el-form-item label="用户名：">
                    {{ userInfo.username }}&nbsp;&nbsp;&nbsp;<span style="color: rgb(0, 143, 136);">
                      《{{ userInfo.roleName }}》</span>
                    <span v-if="userInfo.roleName == '管理员' || userInfo.roleName == '系统管理员'">&nbsp;&nbsp;&nbsp;
                      <router-link to="/manager" style="text-decoration: none;">
                        <strong>管理</strong>
                      </router-link>
                    </span>
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
                      <el-button plain size="mini" @click="changeEmail = !changeEmail" icon="el-icon-edit" circle>
                      </el-button>
                    </span>
                    <span v-else>
                      <el-button plain size="mini" @click="changeEmail = !changeEmail" icon="el-icon-check" circle>
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
                      <el-button plain size="mini" @click="changeCity = !changeCity" icon="el-icon-edit" circle>
                      </el-button>
                    </span>
                    <span v-else>
                      <el-button plain size="mini" @click="changeCity = !changeCity" icon="el-icon-check" circle>
                      </el-button>
                    </span>
                  </el-form-item>
                  <el-form-item label="性别：">
                    <el-radio-group v-model="userInfo.gender">
                      <el-radio label="男"></el-radio>
                      <el-radio label="女"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item style="position:relative;left: -10%;">
                    <el-button plain style="position: relative; left: 0%;" class="noLogin-left-btn2"
                      @click="update('updateUser')">提交</el-button>
                    <el-button style="position: relative;left: 10%;" @click="updatePsw()">修改密码</el-button>
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
                          <img width="100%" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
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
                        <el-card style="width: 90%;margin: 10px 2%;" v-for="o in userDiary" :key="o.id" :body-style="{ padding: '0px' }">
                          <!-- 卡片内容 -->
                          <div class="card-content" style="width:100%;margin-bottom: 0px;margin-left: 20px;">
                            <h5 style="position: relative;height:20px;top: -3px;">
                              {{ o.diaryTitle }}</h5>
                            <span style="position: relative;top: -20px;font-size: 12px;" class="time">
                              {{ o.createTime }}&nbsp;&nbsp;&nbsp; {{ o.nickname }}
                              <span style="position: absolute;top:-20px;right:-110%;font-size: 30px;cursor: pointer;"
                                @click="getDiaryOne(o.diaryId); showDiaryOne = !showDiaryOne">
                                <i class="el-icon-thumb"></i>
                              </span>

                            </span>

                          </div>
                        </el-card>
                      </span>
                      <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="pageNum"
                        @current-change="handleCurrentChange">
                      </el-pagination>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <el-card v-if="showDiaryOne" class="box-card" style="position: fixed;top: 20vh;left: 10vw;z-index: 999;">
              <el-popconfirm @confirm="delDiary(diaryBaseOne.diaryId)" title="这是一段内容确定删除吗？">
                <span slot="reference" style="cursor: pointer;font-size: 20px;"><i class="el-icon-delete"></i></span>
              </el-popconfirm>

              <span @click="showDiaryOne = !showDiaryOne" style="position: absolute;cursor: pointer;font-size: 20px;right: 20px;">
                <i class="el-icon-close"></i>
              </span>
              <span v-if="diaryBaseOne != null">
                <div style="width: 280px;" v-html="diaryBaseOne.diaryText">
                </div>
              </span>
            </el-card>
          </span>

          <!-- 电脑端 -->
          <span v-else>
            <el-card v-if="showDiaryOne" class="box-card" style="position: fixed;top: 20vh;left: 30vw;z-index: 999;">
              <el-popconfirm @confirm="delDiary(diaryBaseOne.diaryId)" title="这是一段内容确定删除吗？">
                <span slot="reference" style="cursor: pointer;font-size: 20px;"><i class="el-icon-delete"></i></span>
              </el-popconfirm>

              <span @click="showDiaryOne = !showDiaryOne" style="position: absolute;cursor: pointer;font-size: 20px;right: 20px;"><i
                  class="el-icon-close"></i></span>
              <span v-if="diaryBaseOne != null">
                <div style="width: 600px;" v-html="diaryBaseOne.diaryText">
                </div>
              </span>
            </el-card>
            <div class="isLogin-left">
              <span class="isLogin-userImg">
                <el-upload class="avatar-uploader" action="/api/user/updateUserImg" :show-file-list="false" :headers="uploadHeaders"
                  :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <img :src="userInfo.userImg">
                  <div class="imgHover">更换图片</div>
                </el-upload>

              </span>
              <el-form class="login-from" :model="userInfo" label-width="80px" :rules="registerRules" ref="updateUser">
                <el-form-item prop="nickname" label="昵称：">
                  <el-input v-model="userInfo.nickname"></el-input>
                </el-form-item>
                <el-form-item label="用户名：">
                  {{ userInfo.username }}&nbsp;&nbsp;&nbsp;<span style="color: rgb(0, 143, 136);">《{{
            userInfo.roleName }}》</span>
                  <span v-if="userInfo.roleName == '管理员' || userInfo.roleName == '系统管理员'">&nbsp;&nbsp;&nbsp;
                    <router-link to="/manager" style="text-decoration: none;">
                      <strong>管理</strong>
                    </router-link>
                  </span>
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
                    <el-button plain size="mini" @click="changeEmail = !changeEmail" icon="el-icon-edit" circle>
                    </el-button>
                  </span>
                  <span v-else>
                    <el-button plain size="mini" @click="changeEmail = !changeEmail" icon="el-icon-check" circle>
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
                    <el-button plain size="mini" @click="changeCity = !changeCity" icon="el-icon-edit" circle>
                    </el-button>
                  </span>
                  <span v-else>
                    <el-button plain size="mini" @click="changeCity = !changeCity" icon="el-icon-check" circle>
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
                  <el-button style="position: relative; left: 10%;" class="noLogin-left-btn2" plain
                    @click="update('updateUser')">提交</el-button>
                  <el-button style="position: relative;left: 30%;" @click="updatePswDialog = !updatePswDialog">修改密码</el-button>
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
                      <el-col style="height: 140px;width: 100px;" v-for="(o, index) in 10" :key="o" :offset="index > 0 ? 3 : 3">
                        <el-card :body-style="{ padding: '0px' }" style="margin:10px -30px;height:120px;">
                          <img width="100%" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
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
                    <el-card style="width: 90%;margin: 10px 2%;" v-for="o in userDiary" :key="o.id" :body-style="{ padding: '0px' }">
                      <!-- 卡片内容 -->
                      <div class="card-content" style="width:100%;margin-bottom: 0px;margin-left: 20px;">
                        <h5 style="position: relative;height:20px;top: -3px;">{{ o.diaryTitle }}
                        </h5>
                        <span style="position: relative;top: -20px;font-size: 12px;" class="time">
                          {{ o.createTime }}&nbsp;&nbsp;&nbsp; {{ o.nickname }}
                          <span style="position: absolute;top:-20px;right:-200%;font-size: 30px;cursor: pointer;"
                            @click="getDiaryOne(o.diaryId); showDiaryOne = !showDiaryOne">
                            <i class="el-icon-thumb"></i>
                          </span>
                        </span>

                      </div>
                    </el-card>
                  </span>
                  <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="pageNum"
                    @current-change="handleCurrentChange">
                  </el-pagination>
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
                  <el-input v-model="userQuery.password" @keyup.enter.native="login('userQuery')" type="password" placeholder="密码"
                    show-password></el-input>
                </el-form-item>
                <el-form-item prop="captcha">
                  <el-input v-model="userQuery.captcha" @keyup.enter.native="login('userQuery')" type="text"
                    placeholder="请输入验证码"></el-input>
                  <img style="position:absolute;right: 0px;cursor:pointer" @click="getCaptcha()" :src="captcha" />
                  <span
                    style="position: absolute;width:150px;top:35px;font-size: 12px;right: -10px;color:red;cursor: pointer;">看不清？点一下</span>
                </el-form-item>
                <span class="noLogin-left-btn1" @click="retrievePsw = true">忘记密码?</span>

                <el-form-item>
                  <span v-if="showLogin">
                    <el-button class="noLogin-left-btn2" type="primary" @click="login('userQuery')">登录</el-button>
                  </span>
                  <span v-else>
                    <el-button disabled class="noLogin-left-btn2" type="primary">登录中···</el-button>
                  </span>

                </el-form-item>

              </el-form>
            </div>
          </transition>
          <transition name="el-zoom-in-bottom">
            <div v-show="show2" class="noLogin-right">
              <div class="noLogin-right-reg">
                <h1>没有账号？</h1>
                <br><br><br>
                <el-button class="noLogin-right-btn1" @click="show2 = !show2, show1 = !show1" type="primary" style="margin-left: 16px;">
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
                <el-button class="noLogin-right-btn1" @click="show2 = !show2, show1 = !show1" type="primary" style="margin-left: 16px;">
                  去登录
                </el-button>
              </div>
            </div>
          </transition>
          <transition name="el-zoom-in-center">
            <div v-show="show1" class="register-right" style="background-color: rgba(249, 250, 248, 1);">
              <el-form :model="userRegister" class="noLogin-right-from" :rules="registerRules" ref="userRegister">
                <el-form-item prop="username">
                  <el-input v-model="userRegister.username" type="text" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="nickname">
                  <el-input v-model="userRegister.nickname" type="text" placeholder="昵称"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input v-model="userRegister.password" type="password" show-password autocomplete="new-password"
                    placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item prop="email">
                  <el-input v-model="userRegister.email" type="text" placeholder="邮箱"></el-input>
                  <el-button style="position: absolute;right: 0px;" @click="sendEmail(true)">
                    <span v-if="showCaptcha">获取验证码</span>
                    <span v-else>{{ time }}&nbsp;s</span>
                  </el-button>
                </el-form-item>
                <el-form-item prop="captcha">
                  <el-input v-model="userRegister.captcha" type="text" placeholder="验证码"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button class="noLogin-left-btn2" type="primary" @click="register('userRegister')">注册</el-button>
                </el-form-item>

              </el-form>

            </div>
          </transition>
        </div>

      </span>

      <el-dialog title="修改密码" :visible.sync="updatePswDialog" :modal="false" min-width="300px" width="30%" :close-on-click-modal="false">
        <el-form :model="updatePswData">
          <el-form-item prop="password">
            <el-input v-model="updatePswData.oldPassword" type="password" show-password autocomplete="new-password"
              placeholder="旧密码"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="updatePswData.newPassword" type="password" show-password autocomplete="new-password"
              placeholder="新密码"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="updatePswData.confirm" type="password" show-password autocomplete="new-password"
              placeholder="再输入一次密码"></el-input>
          </el-form-item>
          <el-button @click="hanldClose()">关闭</el-button>
          <el-button @click="updatePsw()">修改</el-button>
        </el-form>
      </el-dialog>

      <el-dialog title="找回密码" :visible.sync="retrievePsw" :modal="false" min-width="300px" width="30%" :close-on-click-modal="false">
        <el-form :model="updatePswData">
          <el-form-item>
            <span>请输入你的邮箱</span>
            <el-input v-model="userRegister.email" type="text" placeholder="邮箱"></el-input>
            <el-button style="position: absolute;right: 0px;" @click="sendEmail(false)">
              <span v-if="showCaptcha">获取验证码</span>
              <span v-else>{{ time }}&nbsp;s</span>
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-input v-model="userRegister.captcha" type="text" placeholder="验证码"></el-input>
          </el-form-item>
          <el-button @click="retrievePsw = false">关闭</el-button>
          <el-button @click="isTrue()">提交</el-button>
        </el-form>

        <el-dialog title="修改密码" :visible.sync="retrievePswInner" :modal="false" min-width="300px" width="30%" :close-on-click-modal="false">
          <el-form :model="updatePswData">
            <span>{{ userInfo.username }}</span>
            <el-form-item>
              <span>请输入你的新密码</span>
              <el-input v-model="userInfo.password" type="password" show-password placeholder="新密码">
              </el-input>
            </el-form-item>
            <el-button @click="retrievePswInner = false">关闭</el-button>
            <el-button @click="updatePassword()">提交</el-button>
          </el-form>
        </el-dialog>

      </el-dialog>
    </div>
  </transition>
</template>

<script>
import userApi from '@/api/userApi';
import textApi from '@/api/textApi';
export default {
  data() {
    return {
      total: 0,
      pageNum: 1,
      pageSize: 30,
      //上传图片时，携带请求头
      uploadHeaders: {
        // 在这里添加您的请求头信息
        'x-token': JSON.parse(localStorage.getItem('token'))
      },
      //验证码
      captcha: "data:image/gif;base64,",
      //登录对象
      userQuery: {
        username: '',
        password: '',
        captcha: ''
      },
      //注册对象
      userRegister: {
        username: "",
        password: "",
        email: "",
        nickname: "",
        captcha: "",
      },
      //修改密码对象
      updatePswData: {
        oldPassword: '',
        newPassword: '',
        confirm: ''
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
      //表单规则
      loginRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
        captcha: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
        ]
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
      //单个用户日记内容是否展示
      showDiaryOne: false,
      //单个日记内容
      diaryBaseOne: null,
      //登录中
      showLogin: true,
      //修改密码窗口
      updatePswDialog: false,
      //忘记密码窗口
      retrievePsw: false,
      retrievePswInner: false
    }
  },
  created() {
    this.token = localStorage.getItem('token');
    if (this.$store.getters.user != null) {
      this.userInfo = this.$store.getters.user;
    }

  },
  mounted() {
    //页面加载后开始展示
    this.login_show = true;
    //如果token不为空，获取用户
    if (this.token != null) {
      this.getUser();
      this.getDiaryBaseByUser();
    }
    // 使用窗口大小监听来更新 isMobile 值
    window.addEventListener('resize', this.updateLayout);
    this.updateLayout(); // 初始化时执行一次
    if (this.token == null) {
      this.getCaptcha();
    }
  },
  methods: {
    //判断是否更改布局
    updateLayout() {
      if (window.innerWidth <= 940) {  // 根据实际情况设置阈值
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
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getDiaryBaseByUser();
    },
    //获取验证码
    getCaptcha() {
      userApi.getGenerateBase64().then(response => {

        this.captcha = "data:image/gif;base64," + response.data[1];
        const str = response.data[0];
        localStorage.setItem('captchaToken', JSON.stringify(str));
      }).catch(err => {
        console.log(err);
      })
    },
    // 接收的是表单信息
    login(formName1) {
      this.showLogin = false;
      // 判断表单信息是否通过
      let flag = true;
      this.$refs[formName1].validate((valid) => {
        if (!valid) {
          flag = false;
          this.showLogin = true;
          return;
        }
      });
      //如果表单验证不通过 直接返回，不让提交
      if (!flag) return;
      // 发起登录请求
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
        } else if (retCode == 500105) {
          this.getCaptcha();
          this.$message({
            message: response.data.message,
            type: 'warning'
          });
        } else {
          this.$message({
            message: response.data.message,
            type: 'warning'
          });
        }
      }).catch(err => {
        console.log(err);
        if (err) {
          this.$message({
            message: "服务端错误",
            type: 'info'
          });
        }

      }).finally(() => {
        this.showLogin = true;
      })
    },
    // 获取用户信息
    getUser() {
      userApi.getUser().then(response => {
        if (response.data.retCode == 401) {
          this.$message({
            message: response.data.message,
            type: 'info'
          })
        }
        // 用户信息
        this.userInfo = response.data.data;
        // 将 this.userInfo 深拷贝到 this.userOld
        this.userOld = JSON.parse(JSON.stringify(this.userInfo));
        // 登录成功后得到用户信息并保存 user
        this.$store.dispatch("setUser", response.data.data);
      }).catch(err => {
        const data = err.response.data
        this.$message({
          message: data.message,
          type: 'info'
        })
        // 出错后，token设为null
        this.token = null;
        localStorage.removeItem('token');
      })
    },
    // 更新用户信息
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
        if (key == 'menuVos') {
          continue;
        }
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
      this.userInfo.password = null;
      // 发起请求，将用户信息传过去
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
    // 修改密码
    updatePsw() {
      const flag1 = this.updatePswData.newPassword == this.updatePswData.oldPassword;
      const flag2 = this.updatePswData.confirm == this.updatePswData.newPassword;
      if (flag1) {
        this.$message({
          message: "新密码不能与旧密码一致",
          type: 'warning'
        })
        return;
      }
      if (!flag2) {
        this.$message({
          message: "两次密码不一致",
          type: 'warning'
        })
        return;
      }
      const nickname = this.userInfo.nickname;

      this.userInfo.password = this.updatePswData.oldPassword;
      this.userInfo.nickname = this.updatePswData.newPassword;

      userApi.updateUser(this.userInfo).then(response => {
        const data = response.data;
        if (data.data == "修改成功") {
          this.$message({
            message: "修改成功,下次请使用新密码登录~",
            type: 'info'
          })
          this.getUser();
          this.updatePswDialog = !this.updatePswDialog;
          this.userInfo.password = null;
          return;
        }
        this.$message({
          message: data.data,
          type: 'info'
        })
        this.userInfo.nickname = nickname;

      })
    },
    hanldClose() {
      this.updatePswDialog = !this.updatePswDialog;
      this.updatePswData = {
        oldPassword: '',
        newPassword: '',
        confirm: ''
      }
    },
    // 发送邮箱验证码
    sendEmail(bool) {
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
      // 发起请求
      userApi.sendEmail(this.userRegister.email, bool).then(response => {
        const retCode = response.data.retCode;
        if (retCode == 200) {
          localStorage.setItem('emailToken', JSON.stringify(response.data.data));
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
    // 注册用户
    register(formName) {
      let flag = true;
      // 表单验证
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          flag = false;
          return;
        }
      });
      //如果表单验证不通过 直接返回，不让提交
      if (!flag) return;
      //发起请求
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
    isTrue() {
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
      if (localStorage.getItem('emailToken') == undefined) {
        this.$message({
          message: "请先获取验证码",
          type: 'warning',
          duration: 1000
        });
        return;
      }
      if (this.userRegister.captcha == "") {
        this.$message({
          message: "验证码为空",
          type: 'warning',
          duration: 1000
        });
        return;
      }
      userApi.emailIsTrue(this.userRegister).then(response => {
        const data = response.data;
        if (data.retCode == 200) {
          this.userInfo = data.data;
          this.retrievePswInner = true;
        } else {
          this.$message({
            message: data.message,
            type: 'warning'
          })
        }
      })
    },
    updatePassword() {
      if (this.userInfo.password == "") {
        this.$message({
          message: "密码不能为空",
          type: 'warning'
        })
        return;
      }
      userApi.updatePassword(this.userInfo).then(response => {
        const data = response.data;
        if (data.retCode == 200) {
          this.$message({
            message: "修改成功,可以使用新密码登录了",
            type: 'success',
            duration: 2000
          })
          this.retrievePsw = false;
          this.retrievePswInner = false;
        }
      })
    },
    // 头像上传完毕后，重新获取信息
    handleAvatarSuccess() {
      this.getUser();
      this.$message({
        message: "修改成功",
        type: 'success'
      })
    },
    // 上传前验证
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
      }
      return isJPG && isLt2M;
    },
    // 获取单个用户日记基本信息
    getDiaryBaseByUser() {
      textApi.getDiaryBaseByUser(this.pageSize, this.pageNum).then(response => {
        this.userDiary = response.data.data.records;
        this.total = response.data.data.total;
        this.userDiary.forEach(element => {
          element.createTime = element.createTime.substring(0, 10);
        });
      }).catch(err => {
        console.log(err);
      })
    },
    // 获取单个日记内容
    getDiaryOne(diaryId) {
      textApi.getDiaryOne({
        params: {
          diaryId: diaryId
        }
      }).then(response => {
        this.diaryBaseOne = response.data.data;
      }).catch(err => {
        console.log(err);
      })
    },
    delDiary(id) {
      textApi.deleteDiaryOne({
        params: {
          diaryId: id,
        }
      }).then(response => {
        console.log(response.data.data);
        this.getDiaryBaseByUser();
        this.showDiaryOne = !this.showDiaryOne;
        this.$message({
          message: response.data.message,
          type: 'success'
        })
      }).catch(err => {
        console.log(err);
      })
    }
  },
  // 页面关闭结束后，移除倒计时
  beforeDestroy() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/login.css';

/* 背景展示动画 */
.el-zoom-in-center-enter-active,
.el-zoom-in-center-leave-active {
  transition: transform 1s;
}

/* 登录页展示动画 */
.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active,
.el-zoom-in-bottom-enter-active,
.el-zoom-in-bottom-leave-active {
  transition: 0.8s;
  /* 使用CSS过渡属性来定义动画效果 */
}

.el-dialog__wrapper {
  background-color: rgba($color: #000000, $alpha: 0.5);
}
</style>
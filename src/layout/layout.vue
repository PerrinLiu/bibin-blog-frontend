<template>
  <div class="home-page" @scroll="handleScroll" style="overflow: hidden;">

    <!-- 手机导航栏 -->
    <el-drawer :visible.sync="drawer" size="65%" :show-close=false>
      <div class="phone-nav">
        <el-menu class="el-menu-demo" active-text-color="none" background-color="rgba(0, 0, 0, 0)" mode="vertical" router>
          <!-- 头像 -->
          <el-menu-item id="el-menu-item">
            <span class="el-dropdown-link" @click="drawer = false">
              <span v-if="user != 'user' || token != null">
                <router-link style="text-decoration: none;" to="/login">
                  <img width="40px" height="40px" id="user-img" :src="user.userImg" alt="">
                  {{ user.nickname }}
                </router-link>
                <router-link style="text-decoration: none;" to="/">
                  <span style="position: absolute;right: 40vw;" @click="drawer = false, logout('b')"><i class="el-icon-back"></i>退出</span>
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
          <el-menu-item id="el-menu-item" index="/article" @click="drawer = false"><i class="el-icon-notebook-1"></i>文章
            <div class="el-menu-item-line" style="position: relative; top: -15px;"></div>
          </el-menu-item>
          <el-menu-item id="el-menu-item" index="/diary" @click="drawer = false"><i class="el-icon-edit"></i>碎片
            <div class="el-menu-item-line" style="position: relative; top: -15px;"></div>
          </el-menu-item>
          <el-menu-item id="el-menu-item" index="/photo" @click="drawer = false"><i class="el-icon-picture-outline"></i>照片墙
            <div class="el-menu-item-line" style="position: relative; top: -15px;"></div>
          </el-menu-item>
          <el-menu-item id="el-menu-item" index="/message" @click="drawer = false"><i class="iconfont icon-pinglun"></i>留言
            <div class="el-menu-item-line" style="position: relative; top: -15px;"></div>
          </el-menu-item>
        </el-menu>
      </div>

    </el-drawer>
    <el-container>

      <transition name="el-zoom-in-center">
        <el-header v-if="show" id="layout-header" :style="background">
          <router-link style="text-decoration: none;" to="/">
            <div class="float-left layout-header-left" style="font-size: 30px;" :style="menuColor">Bibin</div>
          </router-link>

          <!-- 统计 -->
          <div class="float-left layout-header-left" style="font-size: 30px;color:aliceblue;">
            <el-popover placement="top">
              <div :style="isMobile ? 'width: 90%;':'width: 600px;'" style="margin: 0">
                <CommitViewVue ref="getCountDate"></CommitViewVue>
              </div>
              <span slot="reference" @click="getCount">
                <i class="iconfont icon-tongjibaobiao" style="font-size: 30px;"></i>
                <span style="font-size: 12px;" :style="menuColor">统计</span>
              </span>
            </el-popover>

          </div>

          <!-- 手机端布局 -->
          <span v-if="isMobile" class="float-right" style="line-height: 60px;font-size: 30px;cursor: pointer;">
            <!-- 导航标签 -->
            <i class="el-icon-s-fold" @click="drawer = true"></i>
          </span>

          <!-- 电脑端布局 -->
          <span v-else>
            <el-menu class="el-menu-demo float-right" active-text-color="none" background-color="rgba(0, 0, 0, 0)" mode="horizontal" router>
              <el-menu-item id="el-menu-item" :style="menuColor" index="/"><i class="iconfont icon-a-appround36"></i>首页
                <div class="el-menu-item-line" style="position: relative; top: -15px;"></div>
              </el-menu-item>
              <el-menu-item id="el-menu-item" :style="menuColor" index="/love"><i class="iconfont icon-aiqing"></i>记恋
                <div class="el-menu-item-line" style="position: relative; top: -15px;"></div>
              </el-menu-item>
              <el-menu-item id="el-menu-item" :style="menuColor" index="/article"><i class="iconfont icon-shuji"></i>文章
                <div class="el-menu-item-line" style="position: relative; top: -15px;"></div>
              </el-menu-item>
              <el-menu-item id="el-menu-item" :style="menuColor" index="/diary"><i class="iconfont icon-a-appround11"></i>碎片
                <div class="el-menu-item-line" style="position: relative; top: -15px;"></div>
              </el-menu-item>
              <el-menu-item id="el-menu-item" :style="menuColor" index="/photo"><i class="iconfont icon-a-appround32"></i>照片墙
                <div class="el-menu-item-line" style="position: relative; top: -15px;"></div>
              </el-menu-item>
              <el-menu-item id="el-menu-item" :style="menuColor" index="/message"><i class="iconfont icon-a-appround"></i>留言

                <div class="el-menu-item-line" style="position: relative; top: -15px;"></div>
              </el-menu-item>
              <el-menu-item id="el-menu-item">
                <el-dropdown placement="bottom" @command="logout">
                  <span class="el-dropdown-link">
                    <span v-if="user != 'user'">
                      <img width="40px" height="40px" id="user-img" :src="user.userImg" alt="">
                    </span>
                    <!-- 还没登录时，显示默认头像 -->
                    <span v-else>
                      <img width="40px" height="40px" id="user-img" src="@/assets/images/defaul.jpg" alt="">
                    </span>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <span v-if="user != 'user' || token != null">
                      <router-link style="text-decoration: none;" to="/login">
                        <el-dropdown-item command="a"><i class="el-icon-user"></i>个人信息</el-dropdown-item>
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
          </span>
        </el-header>
      </transition>
      <el-main id="el-main">
        <span v-if="showTop" style="position: fixed;z-index: 1;right: 1.5%;bottom: 70px;">
          <i class="el-icon-top" style="font-size: 50px;font-weight: 900;cursor: pointer;color: black;" @click="backTop()"></i>
        </span>
        <router-view ref="childRef"></router-view>
      </el-main>

      <el-footer style="height: 40px;">
        <span v-if="currentPath !== '/login'">
          <div id="footer" class="item">
            <div style="position: absolute;width: 100vw;left: 25vw;text-align: center;">
              <a href="https://beian.miit.gov.cn/" style="text-decoration: none;">粤ICP备2024274461号-1</a>
              Copyright © {{ new Date().getFullYear() }} LLPY
            </div>
          </div>
        </span>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import userApi from '@/api/userApi'
import CommitViewVue from '@/components/CommitView'
export default {
  name: 'HomePage',
  components: {
    CommitViewVue
  },
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
      // 导航侧边栏
      drawer: false,
      // 头部手机端
      background: '',
      // 回到顶部
      showTop: '',
      //滚动5px执行一次
      scrollIndex: 0,
      menuColor: 'color:white',
    }
  },
  computed: {
    // 拿到用户信息
    user() {
      // 通过 this.$store.state 访问用户信息
      if (this.$store.getters.user != null) {
        return this.$store.getters.user;
      }
      return 'user';
    },
    currentPath() {
      return this.$route.path; // 通过 $route 对象获取当前路径
    },
  },
  watch: {
    $route() {
      this.show = true;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.token = localStorage.getItem('token');
    if (this.token != null && this.$route.path != '/login') {
      this.getUser();
    }
    if (this.user)
      // 使用窗口大小监听来更新 isMobile 值
      window.addEventListener('resize', this.updateLayout);
    this.updateLayout(); // 初始化时执行一次
    this.getAccess();
  },
  methods: {
    //获取网站统计数据
    getCount() {
      const day = this.isMobile ? 80 : 168
      this.$refs.getCountDate.getData(day);
    },
    // 判断更改布局
    updateLayout() {
      // 判断是否时手机端
      if (window.innerWidth <= 940) {
        this.isMobile = true;
        this.background = 'background-color: rgba(0, 0, 0, 1);'
        this.show = true;
        //如果是手机端，不监听滚动事件
        window.removeEventListener('scroll', this.handleScroll);
      } else {
        this.isMobile = false;
        this.handleScroll();
        this.background = ''
      }
      if (this.$store.getters.isPhone != this.isMobile) {
        this.$store.dispatch("setIsPhone", this.isMobile)
      }
    },

    //监听滚动事件
    handleScroll() {
      if (this.scrollIndex++ < 5) {
        return
      }
      const currentScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScrollTop > this.scrollTop) {
        // 向下滚动 
        this.show = false;
      } else {
        // 向上滚动
        this.show = true;
        if (currentScrollTop > window.innerHeight - 100) {
          this.background = 'background-color: rgba(255, 255, 255, 1);color: #000; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);'
          this.menuColor = 'color:#555'
        } else {
          this.background = this.$route.path.includes('manager') ? 'background-color: rgba(0, 0, 0, 1);color: #fff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);' :
            ""
          this.menuColor = 'color:white'
        }
      }
      //如果滚条了当前页面的高度，展示回到顶部按钮
      if (currentScrollTop > window.innerHeight) {
        this.showTop = true;
      } else {
        this.showTop = false;
      }
      // 更新上一次的滚动距离
      this.scrollTop = currentScrollTop;
      this.scrollIndex = 0
    },
    // 回到顶部
    backTop() {
      const scrollDuration = 100; // 滚动总时间（毫秒）
      const scrollDistance = -window.innerHeight + 4; // 滚动距离
      const startTime = performance.now(); // 开始时间
      const scrollStep = timestamp => {
        const currentTime = timestamp - startTime;
        const progress = Math.min(currentTime / scrollDuration, 1);
        window.scrollTo(0, progress * scrollDistance);
        if (currentTime < scrollDuration) {
          requestAnimationFrame(scrollStep);
        }
      };
      requestAnimationFrame(scrollStep);
    },
    getAccess() {
      userApi.getAccess();
    },
    // 注销
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
            this.$store.dispatch("cleatUser")
          }
        }).finally(() => {
          localStorage.removeItem('token');
          this.$store.dispatch("cleatUser")
        })
      }
    },
    // 获得当前用户信息
    getUser() {
      userApi.getUser().then(response => {
        if (response.data.retCode == 401) {
          this.$message({
            message: response.data.message,
            type: 'info'
          })
        }
        this.userInfo = response.data.data;
        this.userInfo.userId = response.data.data.userId;
        // 将 this.userInfo 深拷贝到 this.userOld
        this.userOld = JSON.parse(JSON.stringify(this.userInfo));
        // 登录成功后得到用户信息 user
        this.$store.dispatch("setUser", response.data.data);
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
@import '../../src/assets/css/layout.css';
@import '../../src/assets/css/default.css';
</style>
<template>
  <div class="index-page  ">
    <div class="div-with-lines">
      <div class="backgroundImg-text-div">
        <h1 class="backgroundImg-text" :style="isPhone ? 'font-size: 40px;' : ''">Hi,Bibin!</h1>
      </div>

    </div>
    <transition name="el-zoom-in-top">
      <div v-show="showImg" class="backgroundImg" :style="`background-image: url(${userImg})`" style="background-position: center center;">
      </div>
    </transition>

    <div class="content item" style="position: relative;">
      <!-- 波浪 -->
      <div class="wave">
        <div style="width: 200%;height:100%;position: absolute;top: 20px;z-index: 1;">
          <div v-for="i in 20" :key="i" class="wave1 item">
          </div>
        </div>

        <div style="width: 200%;height:100%;position: absolute;">
          <div v-for="i in 20" :key="i" class="wave2">
          </div>
        </div>
      </div>
      <div class="wave-next" style="z-index: 99;">
        <i @click="waveNext()" class="el-icon-arrow-down "></i>
      </div>
      <div style="position: relative;top: 50px;">
        <span v-if="isPhone">
          <IndexPhone :access="access" @childEvent="search"></IndexPhone>
        </span>
        <span v-else>
          <IndexPc :access="access" @childEvent="search"></IndexPc>
        </span>

      </div>
      <!-- 用来撑起高度 -->
      <div class="content-after" style="height: 60px;">

      </div>
    </div>

  </div>
</template>
  
  <script>
import IndexPc from '@/views/components/indexView/IndexPc.vue'
import IndexPhone from '@/views/components/indexView/IndexPhone.vue';
import userApi from '@/api/userApi';
export default {
  components: {
    IndexPc,
    IndexPhone
  },
  data() {
    return {
      //用户头像
      userImg: '',
      //背景图片
      showImg: false,
      waveHeight: 55, // 初始波浪高度
      //是否是手机端
      isPhone: '',
      //滚动距离
      roll: '',
      access: 0, //访问量
      currentTheme: 'light'
    }
  },
  // 页面加载完成执行
  mounted() {
    //获取页面背景
    this.getImg();
    //背景图片展示
    this.showImg = true;
    // 使用窗口大小监听来更新 isMobile 值
    window.addEventListener('resize', this.updateLayout);
    this.updateLayout(); // 初始化时执行一次s
    //页面刷新时回到顶部
    this.scrollTop();
    // 获得访问量
    this.getAccess();
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    // 是否更改布局的判断方法
    updateLayout() {
      if (window.innerWidth <= 940) {  // 根据实际情况设置阈值
        //给未登录更新动态样式
        this.isPhone = true;
      } else {
        this.isPhone = false;
        this.roll = -5;
      }
    },
    // 获得背景图片
    getImg() {
      const randomIndex = Math.floor(Math.random() * 6) + 1;
      this.userImg = "https://llpy-blog.oss-cn-shenzhen.aliyuncs.com/background/背景" + randomIndex + ".webp";
    },
    // 页面下滑
    waveNext() {
      const scrollDuration = 400; // 滚动总时间（毫秒）
      const scrollDistance = window.innerHeight - this.roll; // 滚动距离
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
    // 回到顶部
    scrollTop() {
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
    // 搜索
    search(text) {
      console.log(text);
    },
    // 获得访问量
    getAccess() {
      userApi.getAccess().then(response => {
        const data = response.data.data;
        this.access = data;
      }).catch(err => {
        console.log(err);
      })
    }
  },
  beforeDestroy() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
  },
}
  </script>
  
  <style lang="scss" scoped>
.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
  transition: transform 1.2s;
}

.wave {
  position: absolute;
  height: 100px;
  width: 100vw;
  top: -100px;
  overflow: hidden;
}

.wave:hover {
  transition: 0.3s;
  background-color: rgba(14, 13, 13, 0.5);
}

.wave-next {
  position: absolute;
  top: -70px;
  display: flex;
  justify-content: center;
  /* 水平居中 */
  width: 100vw;
  text-align: center;
  color: black;
  font-size: 55px;
  font-weight: 1200;
  cursor: pointer;
  animation: waveNext 3.5s linear infinite;
}

@keyframes waveNext {
  0% {
    transform: translateY(10px);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(10px);
  }
}

.wave1,
.wave2 {
  float: left;
  top: 15px;
  height: 200px;
  width: 150px;
  border-radius: 50%;
}

.wave1 {
  background-color: rgb(250, 250, 250);
  animation: waveAnimation 5s linear infinite;
}

.wave2 {
  position: relative;
  left: -85px;
  background-color: rgba(255, 255, 255, 0.4);
  animation: waveAnimation 3s linear infinite;
}

@keyframes waveAnimation {
  0% {
    transform: translateX(0) translateY(0px) rotate(0deg);
    /* 调整波浪的高度 */
  }

  25% {
    transform: translateX(-25%) translateY(10px) rotate(90deg);
  }

  50% {
    transform: translateX(-50%) translateY(0px) rotate(180deg);
    /* 调整波浪的高度 */
  }

  75% {
    transform: translateX(-75%) translateY(15px) rotate(270deg);
  }

  100% {
    transform: translateX(-100%) translateY(0px) rotate(360deg);
    /* 调整波浪的高度 */
  }
}
</style>

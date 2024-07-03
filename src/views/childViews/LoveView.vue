<template>
  <div class="love-page ">
    <div class="backgroundImg">
      <transition name="el-zoom-in-top">
        <div v-show="showImg" class="backgroundImg"
          style="position: inherit;height:900px;top:-200px;background-image: url('https://llpy-blog.oss-cn-shenzhen.aliyuncs.com/background/%E8%83%8C%E6%99%AF7.webp')">
        </div>
      </transition>

    </div>

    <div class="backgroundImg-text-div" style="height: 0vh;position: relative;top: 22vh;">

      <h1 :style="'font-size:' + size + 'px'" class="backgroundImg-text">{{ formattedTime }}</h1>

    </div>

    <div class="content item" style="margin-top: 45vh;display: flex;justify-content: center;">
      <div style="width: 70%;height: 800px;">
        <div v-if="!loveShow" style="height: 200px;margin-top: 30px;">
          里面的内容是秘密喔~
          <el-input v-model="lovePsw" type="password"></el-input>
          <el-button @click="isTrue()">查看</el-button>
        </div>
        <div v-else>
          进来啦<el-button @click="loveShow = false">回去</el-button>
        </div>
      </div>

      <!-- 用来撑起高度 -->
      <div class="content-after" style="height: 60px;">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showImg: false,
      // BgImg: require('@/assets/images/1233.jpg'),
      startDate: new Date('2022-09-03'), // 设置起始日期
      currentDate: new Date(), // 获取当前日期
      formattedTime: 0, // 用于存储已经过去的天数
      lovePsw: "",
      count: 1,
      size: 72,
      someTime: 10,
      loveShow: false
    }
  },
  computed: {
    isPhone() {
      return this.$store.getters.isPhone;
    }
  },

  mounted() {
    this.showImg = true;
    // 计算已经过去的天数
    this.calculateElapsedTime();

    // 设置一个定时器，每秒更新一次时间
    this.timerOne = setInterval(this.calculateElapsedTime, 1000);
    this.timerTwo = setInterval(() => {
      this.size = this.isPhone ? 32 : 72;
    }, 1000)
  },
  beforeDestroy() {
    // 在组件销毁前清除定时器
    clearInterval(this.timerOne);
    clearInterval(this.timerTwo);
    clearInterval(this.timerThree);
  },
  methods: {
    calculateElapsedTime() {
      const startDate = this.startDate;
      const currentDate = new Date();

      const elapsedMilliseconds = currentDate - startDate;

      const millisecondsInSecond = 1000;
      const secondsInMinute = 60;
      const minutesInHour = 60;
      const hoursInDay = 24;
      const daysInYear = 365;
      const monthsInYear = 12;


      let elapsedSeconds = Math.floor(elapsedMilliseconds / millisecondsInSecond);

      const years = Math.floor(elapsedSeconds / (daysInYear * hoursInDay * minutesInHour * secondsInMinute));
      elapsedSeconds -= years * daysInYear * hoursInDay * minutesInHour * secondsInMinute;

      const months = Math.floor(elapsedSeconds / (daysInYear / monthsInYear * hoursInDay * minutesInHour * secondsInMinute));
      elapsedSeconds -= months * (daysInYear / monthsInYear) * hoursInDay * minutesInHour * secondsInMinute;

      const days = Math.floor(elapsedSeconds / (hoursInDay * minutesInHour * secondsInMinute));
      elapsedSeconds -= days * hoursInDay * minutesInHour * secondsInMinute;

      const hours = Math.floor(elapsedSeconds / (minutesInHour * secondsInMinute));
      elapsedSeconds -= hours * minutesInHour * secondsInMinute;

      const minutes = Math.floor(elapsedSeconds / secondsInMinute);

      const seconds = Math.floor(elapsedSeconds % secondsInMinute);

      const formattedTime = `${years}年${months}月${days}天${hours}:${minutes}:${seconds}`;

      this.formattedTime = formattedTime;
    },
    isTrue() {
      if (this.someTime <= 0) {
        clearInterval(this.timerThree);
        this.count = 1;
        this.someTime = 10;
      }
      if (this.count > 3) {
        this.$message({
          message: "试太多次了,请等待" + this.someTime + '秒',
          type: 'warning'
        })
        if (this.someTime == 10) {
          this.someTime -= 1;
          this.timerThree = setInterval(() => {
            this.someTime -= 1;
          }, 1000);
        }

        return;
      }
      const psw = this.lovePsw;
      if (psw != "5579492") {
        this.count += 1;
        this.$message({
          message: "密码错咯,不要偷窥",
          type: 'warning'
        })
        return;
      }
      this.loveShow = true;

    }
  },
}
</script>

<style scoped>
.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
  transition: transform 1.2s;
}
</style>

<template>
  <div class="message-page">
    <div class="backgroundImg">
      <transition name="el-zoom-in-top">
        <div v-show="showImg" class="backgroundImg"
          style="position: inherit;height:900px;background-image: url('https://llpy-blog.oss-cn-shenzhen.aliyuncs.com/background/%E8%83%8C%E6%99%AF8.webp')">
        </div>
      </transition>
      <div class="backgroundImg-text-div" style="height: 60vh;">
        <h1 class="backgroundImg-text" style="color: rgb(255, 218, 218);">留言</h1>
      </div>
    </div>

    <div class="content" style="margin-top: 50vh;display:flex;justify-content: center;">
      <div style="height: 1000px;margin-top: 20px;" class="content-before">
        <el-empty :image-size="200" description="等我开发~"></el-empty>
        <el-card v-for="item in 5" :key="item" shadow="hover" :body-style="{ padding: '20px' }"
          style="border-radius: 10px;margin-top: 10px;">
          鼠标悬浮时显示{{ item }}
        </el-card>

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
      showImg: false
    }
  },
  mounted() {
    this.showImg = true;
  }
}
</script>

<style scoped>
.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
  transition: transform 1.2s;
}
</style>

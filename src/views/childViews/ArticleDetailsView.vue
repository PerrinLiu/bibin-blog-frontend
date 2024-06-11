<template>
  <div>
    <div class="backgroundImg">
      <transition name="el-zoom-in-top">
        <div v-show="showImg" class="backgroundImg"
          style="position: inherit;height:900px;background-image: url('https://llpy-blog.oss-cn-shenzhen.aliyuncs.com/background/%E8%83%8C%E6%99%AF10.webp')">
        </div>
      </transition>
      <div class="backgroundImg-text-div" style="height: 60vh;">
        <h1 class="backgroundImg-text" style="color: rgb(17, 13, 13);">文章详情</h1>
      </div>
    </div>

    <div class="content item center" style="margin-top: 50vh;">
      <div class="content-inner" style="height: 200px;">
        123
        <!-- 用来撑起高度 -->
        <div class=" content-after" style="height: 60px;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ArticleDetailsView',
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

.content-inner {
  width: 70%;
  min-width: 1024px;
  margin-top: 50px;
}

.center {
  display: flex;
  justify-content: center;
}
</style>

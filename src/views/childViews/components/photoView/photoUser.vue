<template>
  <div>
    <div class="backgroundImg">
      <transition name="el-zoom-in-top">
        <div v-show="showImg" class="backgroundImg"
          style="position: inherit;height:100vh;background-image: url('https://llpy-blog.oss-cn-shenzhen.aliyuncs.com/background/%E8%83%8C%E6%99%AF7.webp')">
        </div>
      </transition>
    </div>
    <!-- todo 待完善图片界面 -->
    <div class="content" style="margin-top: 30vh;background: none;">
      <div class="content-before" style="width: 70vw;">
        <div style="height: 200px;">
          <el-row>
            <el-col :span="4">
              <div style="width: 150px;margin-top: 20px;">
                <img style="border-radius: 50%;" width="100%" height="150px" class="userImg" :src="userVo.userImg">
              </div>
            </el-col>
            <el-col :span="20">
              <div style="width: 100%;margin-top: 20px;">
                {{ userVo }}
              </div>
            </el-col>
          </el-row>
        </div>
        <div v-for="item in imgList" :key="item.id">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="item.thumbnailImgUrl" class="image">
          </el-card>
        </div>
        <!-- 用来撑起高度 -->
        <div class="content-after" style="height: 60px;">
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import imageApi from '@/api/imageApi'
export default {
  name: 'photoUser',
  data() {
    return {
      imgList: [],
      showImg: false,
      userVo: {}
    }
  },
  mounted() {
    this.showImg = true
    if (this.$route.params.userId != undefined) {
      this.listImgByUser(this.$route.params.userId);
      const userList = this.$store.getters.userList;
      userList.forEach(item => {
        if (item.userId == this.$route.params.userId) {
          this.userVo = item
        }
      })
    }
  },
  methods: {
    listImgByUser(userId) {
      imageApi.listImgByUserId(userId).then(res => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.imgList = data.data
        }
      })
    }
  }
}
</script>

<style scoped>
.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
  transition: transform 1.2s;
}
</style>


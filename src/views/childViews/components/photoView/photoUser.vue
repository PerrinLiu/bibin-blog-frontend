<template>
  <div>
    <div class="backgroundImg">
      <transition name="el-zoom-in-top">
        <div v-show="showImg" class="backgroundImg"
          style="position: inherit;height:100vh;background-image: url('https://llpy-blog.oss-cn-shenzhen.aliyuncs.com/background/%E8%83%8C%E6%99%AF7.webp')">
        </div>
      </transition>
    </div>
    <div class="content" style="margin-top: 35vh;background: none;">
      <div class="content-before" style="width: 70vw;min-height: 800px;">
        <div style="height: 200px;">
          <el-row>
            <el-col :span="isPhone ? 6: 3">
              <div style="margin-top: 20px;" :style="isPhone ? 'width: 60px;height: 60px;' : 'width: 130px;height: 130px;'">
                <el-image lazy style="border-radius: 50%;width: 100%;height: 100%;" class="userImg" :src="userVo.userImg"></el-image>
              </div>
            </el-col>
            <el-col :span="18">
              <div style="width: 100%;margin-top: 20px;color: aliceblue">
                <span>{{ userVo.nickname }}</span><br /><br />
                <span><i class="iconfont icon-a-appround32" style="font-size: 24px;"></i>&nbsp;照片数：{{ userVo.photoCount }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row style="width: 100%;">
            <el-col :span="isPhone ? 24: 6" v-for="(item,index) in imgList" :key="item.id">
              <el-card class="item" :body-style="{ padding: '0px' }" style="margin: 20px;width: 256px;">
                <div style="width:256px;height: 144px;cursor: pointer;overflow: hidden">
                  <el-image lazy style="height: 144px;width: 100%;" :src="item.thumbnailImgUrl" class="image oversize-img"
                    @click="previewImg(index)"></el-image>
                </div>
              </el-card>
            </el-col>
          </el-row>
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
      userVo: {},
      imgUrls: []
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
  computed: {
    isPhone() {
      return this.$store.getters.isPhone
    }
  },
  methods: {
    listImgByUser(userId) {
      imageApi.listImgByUserId(userId).then(res => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.imgList = data.data,
            this.imgList.forEach(item => {
              this.imgUrls.push(item.imgUrl)
            })
        }
      })
    },
    previewImg(index) {
      this.$hevueImgPreview({
        multiple: true, // 开启多图预览模式
        nowImgIndex: index, // 多图预览，默认展示第二张图片
        imgList: this.imgUrls, // 需要预览的多图数组
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


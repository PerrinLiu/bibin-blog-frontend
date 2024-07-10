<template>
  <div class="photo-page">
    <div class="backgroundImg">
      <transition name="el-zoom-in-top">
        <div v-show="showImg" class="backgroundImg"
          style="position: inherit;height:900px;background-image: url('https://llpy-blog.oss-cn-shenzhen.aliyuncs.com/background/%E8%83%8C%E6%99%AF9.webp')">
        </div>
      </transition>
      <div class="backgroundImg-text-div" style="height: 60vh;">
        <h1 class="backgroundImg-text" style="color: rgb(100, 100, 100);">照片墙</h1>
      </div>
    </div>

    <div class="content item" style="margin-top: 50vh;">
      <div class="content-before" style="width: 70vw;">
        <div class="content-center" style="margin-top: 30px;">
          <el-input v-model="searchVo.searchText" placeholder="请输入昵称进行搜索" suffix-icon="el-icon-search" @keyup.enter.native="getImgCount()"
            :style="isPhone ? 'width: 300px;' : 'width:30%;'"></el-input>
        </div>
        <el-row style="margin-top: 10px;width: 100%;">
          <el-col :span="8" v-for="(o) in imgCounts" :key="o.userId" style="margin-top: 10px;">
            <el-card class="item" :body-style="{ padding: '0px' }" style="margin: 20px">
              <el-image lazy style="height: 170px;width:100%" :src="o.userImg" class="image"></el-image>
              <div style="padding: 14px;">
                <span style="font-size: 24px;font-weight: 600;">{{o.nickname}}</span>
                <div style="height: 35px;position: relative;margin-top: 5px;">
                  <i class="iconfont icon-a-appround32" style="font-size: 24px;"></i>
                  <p style="display: inline;line-height: 35px;">照片数：{{o.photoCount}}</p>
                  <router-link :to="{name:'photoByUser',params:{ userId:o.userId}}" style="text-decoration: none;">
                    <el-button type="text" class="button" style="position: absolute;right: 0;">进入空间</el-button>
                  </router-link>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-empty v-if="imgCounts.length == 0" :image-size="200" description="等我开发~"></el-empty>
        <!-- 用来撑起高度 -->
        <div class="content-after" style="height: 60px;">
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import imageApi from '@/api/imageApi';
export default {
  data() {
    return {
      showImg: false,
      searchVo: {
        pageSize: 10,
        pageNum: 1,
        searchText: "",
      },
      total: 0,
      imgCounts: [],
    }
  },
  mounted() {
    this.showImg = true;
    this.getImgCount()
  },
  computed: {
    isPhone() {
      return this.$store.getters.isPhone
    }
  },
  methods: {
    getImgCount() {
      imageApi.groupCountByUser(this.searchVo.pageNum, this.searchVo.pageSize, this.searchVo.searchText).then(res => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.total = data.data.total
          this.imgCounts = data.data.records
          this.$store.dispatch("setUserList", data.data.records)
        }
      })
    },
  }
}
</script>

<style scoped>
.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
  transition: transform 1.2s;
}
</style>

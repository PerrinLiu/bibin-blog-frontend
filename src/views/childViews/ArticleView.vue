<template>
  <div class="article-page">
    <div class="backgroundImg">
      <transition name="el-zoom-in-top">
        <div v-show="showImg" class="backgroundImg"
          style="position: inherit;height:900px;background-image: url('https://llpy-blog.oss-cn-shenzhen.aliyuncs.com/background/%E8%83%8C%E6%99%AF10.webp')">
        </div>
      </transition>
      <div class="backgroundImg-text-div" style="height: 60vh;">
        <h1 class="backgroundImg-text" style="color: rgb(17, 13, 13);">文章</h1>
      </div>
    </div>

    <div class="content item center" style="margin-top: 50vh;">
      <div class="content-inner" :style="isPhone ? 'width: 100%;' : 'min-width: 1024px;'">
        <div class="center">
          <el-input v-model="searchVo.title" placeholder="请输入内容" suffix-icon="el-icon-search"
            :style="isPhone ? 'width: 300px;' : 'width: 50%;'"></el-input>
        </div>
        <div>
          <el-row>
            <el-col :span="isPhone ? 24 : 8" v-for="(o) in  articleList " :key="o.id">
              <el-card class="item" :body-style="{ padding: '0px' }" style="margin: 20px;height: 390px;"
                :style="isPhone ? 'width: 80%;margin-left: 10%;' : ''">
                <router-link :to="{ name: 'articleDetails', params: {id:o.id } }">
                  <img width="100%" :height="isPhone ? '210px' : '250px'" style="cursor: pointer;" :src="o.cover" class="image">
                </router-link>
                <div style="padding: 20px;">
                  <span>{{o.articleTitle}}</span>
                  <div style="margin-top: 10px;position: relative;">
                    <span style="font-size: 16px;color: #ccc;">{{o.createTime}}</span><br v-if="isPhone" />
                    <p style="font-size: 16px;" :style="isPhone ? '' : 'position: absolute;right: 0px;'">
                      <i class="iconfont icon-like">&nbsp;{{o.likeSum}}</i>&nbsp;&nbsp;
                      <i class="el-icon-view">&nbsp;{{o.readSum}}</i>&nbsp;&nbsp;
                      <i class="el-icon-s-comment">&nbsp;{{ o.commentSum }}</i>
                    </p>
                  </div>
                  <div style="margin-top: 10px">
                    <el-tag style="margin-right:16px" v-for="(item,index) in o.articleGroupId" :key="index">
                      {{item}}
                    </el-tag>
                    <el-tag v-if="o.articleGroupId.length == 0" style="margin-right:16px">
                      无标签
                    </el-tag>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-empty :image-size="300" v-if="articleList.length == 0"></el-empty>
        </div>
        <div style="margin-top:20px;display: flex;justify-content: center;">
          <el-pagination background layout="prev, pager, next" :pageSize="searchVo.pageSize" :currentPage="searchVo.pageNum" :total="total"
            @current-change="changePage">
          </el-pagination>
        </div>
        <!-- 用来撑起高度 -->
        <div class="content-after" style="height: 60px;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import articleApi from '@/api/articleApi';
export default {
  data() {
    return {
      showImg: false,
      searchVo: {
        pageSize: 15,
        pageNum: 1,
        searchText: "",
      },
      total: 0,
      //文章列表
      articleList: [],
      //文章分组
      options: [],
    }
  },
  mounted() {
    this.showImg = true;
    this.getData();
  },
  computed: {
    isPhone() {
      return this.$store.getters.isPhone
    }
  },
  methods: {
    goDetail() {
      console.log("点击了卡片, 跳转到详情页");
    },
    changePage(val) {
      this.searchVo.pageNum = val;
      this.getArticle();
    },
    getData() {
      this.getGroup();
    },
    //获取文章
    getArticle() {
      articleApi.listArticle(this.searchVo.pageSize, this.searchVo.pageNum, this.searchVo.searchText).then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.total = data.data.total;
          this.articleList = data.data.records;
          this.articleList.forEach(element => {
            let group = element.articleGroupId.split(",");
            const list = [];
            group.forEach((gId) => {
              this.options.forEach(item => {
                if (gId == item.id) {
                  list.push(item.articleType)
                }
              })
            })
            element.articleGroupId = list
          })
        }
      })
    },
    getGroup() {
      articleApi.getGroupList().then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.options = data.data;
          this.$store.dispatch("setGroupList", data.data);
          this.getArticle();
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

.content-inner {
  width: 70%;
  margin-top: 50px;
}

.center {
  display: flex;
  justify-content: center;
}
</style>

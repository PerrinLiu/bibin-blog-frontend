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
      <div class="content-inner content-before" :style="isPhone ? 'width: 100%;' : 'min-width: 1024px;'">
        <div class="center">

          <el-input v-model="searchVo.searchText" placeholder="请输入关键字搜索" suffix-icon="el-icon-search" @keyup.enter.native="getArticle()"
            :style="isPhone ? 'width: 300px;' : 'width: 50%;'"></el-input>
        </div>
        <!-- 标签类型 -->
        <div class="center content-inner-group">
          <el-row>
            <el-col v-for="item in options" :key="item.id" :span="isPhone ? 8 : 4" style="margin-top: 14px;text-align: center;">
              <el-tag class="groupTag" :type="item.isClick ? 'success' : 'info'" @click="searchByGroup(item)">
                {{item.articleType}}
              </el-tag>
            </el-col>
          </el-row>

        </div>
        <div v-if="articleList.length > 0">
          <!-- 排序类型 -->
          <div style="margin:20px;">
            <span class="content-inner-tag" v-for="(tag,index) in sortList" :key="index">
              <el-tag v-if="tag.isClick" class="sortTag" type="primary" @click="searchByTag(tag)">
                {{tag.label}}
              </el-tag>
              <span v-else type="info" @click="searchByTag(tag)" class="sortColor">{{tag.label}}</span>
            </span>
          </div>
          <el-row>
            <el-col :span="isPhone ? 24 : 6" v-for="(o) in  articleList " :key="o.id">
              <el-card class="item" :body-style="{ padding: '0px' }" style="margin: 20px;height: 255px;width: 85%;"
                :style="isPhone ? 'width: 80%;margin-left: 10%;' : ''">
                <router-link :to="{ name: 'articleDetails', params: {id:o.id } }">
                  <div style="position: relative;overflow: hidden;height: 170px;">
                    <img class="oversize-img" width="100%" height="170px" style="cursor: pointer;" :src="o.cover">
                    <div class="article-tag">
                      <el-tag class="tag" v-for="(tag,index) in o.articleGroupId" :key="index" type="info">{{tag}}</el-tag>
                    </div>
                  </div>
                </router-link>
                <div style="padding: 15px;">
                  <p class="article-title">{{o.articleTitle}}</p>
                  <div style="margin-top: 15px;position: relative;">
                    <span style="font-size: 16px;color: #ccc;">{{o.createTime}}</span>
                    <span style="font-size: 16px;position: absolute;right: 0px;">
                      <i class="el-icon-hot-water" style="font-size: 16px;color: green">&nbsp;</i>{{o.readSum}}&nbsp;&nbsp;
                      <i class="iconfont icon-like" style="font-size: 16px;color: red;"></i>&nbsp;{{o.likeSum}}&nbsp;&nbsp;
                      <i class="el-icon-s-comment" style="font-size: 16px;"></i>&nbsp;{{ o.commentSum }}&nbsp;
                    </span>
                  </div>

                </div>
              </el-card>
            </el-col>
          </el-row>
          <div style="margin-top:20px;display: flex;justify-content: center;">
            <el-pagination background layout="prev, pager, next" :pageSize="searchVo.pageSize" :currentPage="searchVo.pageNum"
              :total="total" @current-change="changePage">
            </el-pagination>
          </div>
        </div>
        <el-empty :image-size="300" description="暂无相关文章" v-else></el-empty>
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
        sort: "3",
        searchText: "",
        groups: ""
      },
      total: 0,
      //文章列表
      articleList: [],
      //文章分组
      options: [],
      //排序类型
      sortList: [
        {
          value: "3",
          label: "最新发布",
          isClick: true
        },

        {
          value: "2",
          label: "最多点赞",
          isClick: false
        },
        {
          value: "1",
          label: "最多点击",
          isClick: false
        },

      ],
    }
  },
  mounted() {
    this.showImg = true;
    this.$nextTick(() => {
      const suffixElement = this.$el.querySelector('.el-icon-search');
      if (suffixElement) {
        suffixElement.style.cursor = 'pointer';
        suffixElement.addEventListener('click', this.getArticle);
      }
    });
    //获取url中的参数后，再获取文章
    this.getParams();
  },
  computed: {
    isPhone() {
      return this.$store.getters.isPhone
    }
  },
  methods: {
    getParams() {
      this.searchVo.searchText = this.$route.query.searchText == undefined ? "" : this.$route.query.searchText;

      this.getData();
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
      articleApi.searchArticle(this.searchVo).then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.total = data.data.total;
          this.articleList = data.data.records;
          this.articleList.forEach(element => {
            let group = element.articleGroupId.split(",");
            element.createTime = element.createTime.substring(0, 10);
            const list = [];
            group.forEach((gId) => {
              this.options.forEach(item => {
                if (this.searchVo.groups != item.id) {
                  element.isClick = false
                }
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
    searchByTag(tag) {
      this.searchVo.sort = tag.value;
      tag.isClick = true;
      this.sortList.forEach(element => {
        if (element.value != tag.value) {
          element.isClick = false
        }
      })
      this.getArticle();
    },
    getGroup() {
      articleApi.getGroupList().then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.options = data.data;
          this.searchVo.groups = this.$route.query.groups == undefined ? "" : this.$route.query.groups;
          if (this.searchVo.groups != "") {
            console.log(this.searchVo.groups);
            this.options.forEach(item => {
              if (this.searchVo.groups == item.id) {
                item.isClick = true
              }
            })
          }
          this.$store.dispatch("setGroupList", data.data);
          this.getArticle();
        }
      })
    },
    searchByGroup(item) {
      if (item.isClick) {
        this.searchVo.groups = ''
        item.isClick = false
        this.getArticle();
        return
      }
      this.searchVo.groups = item.id;
      item.isClick = true;
      this.options.forEach(element => {
        if (element.id != item.id) {
          element.isClick = false
        }
      })
      this.getArticle();
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
  width: 1400px;
  margin-top: 50px;
}

.center {
  display: flex;
  justify-content: center;
}
.article-title {
  width: 95%;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.content-inner-tag {
  margin-right: 10px;
  cursor: pointer;
}
.content-inner-group {
  margin-bottom: 40px;
  margin-top: 20px;
}
.groupTag {
  font-size: 16px;
  width: 120px;
  text-align: center;
  transition: 0.5s;
}

.groupTag:hover {
  font-size: 18px;
  border: #666 1px solid;
}
.sortTag {
  font-size: 16px;
  height: 35px;
  line-height: 35px;
}
.sortColor {
  color: #666;
}
.article-tag {
  position: absolute;
  bottom: 0px;
  width: 100%;
  box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.5);
  background-color: rgba(0, 0, 0, 0.5);
  height: 30px;
  line-height: 30px;
}
.article-tag .tag {
  height: 23px;
  line-height: 23px;
  margin-left: 10px;
}
</style>

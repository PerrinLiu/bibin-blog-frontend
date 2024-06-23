<template>
  <div>
    <div class="backgroundImg">
      <transition name="el-zoom-in-top">
        <div v-show="showImg" class="backgroundImg" style="position: inherit;height:900px;"
          :style="{backgroundImage: 'url(' + articleDetails.cover + ')' }">
        </div>
      </transition>
      <div class="backgroundImg-text-div" style="height: 60vh;">
        <h1 class="backgroundImg-text" style="color: rgb(17, 13, 13);">文章详情</h1>
      </div>
    </div>

    <div class="content item center">
      <div>
        <div class="content-inner">
          <div style="padding: 20px 20px 0 20px;">
            <h1>{{ articleDetails.articleTitle }}</h1>
            <i class="el-icon-time top-icon">&nbsp;{{ articleDetails.createTime }}</i>
            <i class="iconfont icon-like top-icon">&nbsp;点赞：{{articleDetails.likeSum}}</i>
            <i class="el-icon-star-on top-icon">&nbsp;收藏：{{articleDetails.likeSum}}</i>
            <i class="el-icon-view top-icon">&nbsp;阅读量：{{articleDetails.readSum}}</i>
            <i class="el-icon-s-comment top-icon">&nbsp;评论数：{{ articleDetails.commentSum }}</i>
            <div class="top-icon">
              文章标签：
              <el-tag style="margin-right:16px" v-for="(item,index) in articleDetails.articleGroupId" :key="index">
                {{item}}
              </el-tag>
              <el-tag v-if="articleDetails.articleGroupId == null" style="margin-right:16px">
                无标签
              </el-tag>
            </div>

          </div>
          <div class="content-middle" ref="content">
            <div style="padding: 20px 20px 0 20px;" v-html="articleDetails.articleText">
            </div>
            <div ref="statusBar" class="content-bottom">
              <div style="position: relative;">
                <div class="bottom-status">
                  <i class="iconfont icon-like status-icon" @click="likeOne(articleDetails.id)"
                    :style="articleDetails.liked ? 'color: red;' : 'color: #333'">
                    &nbsp;{{articleDetails.likeSum}}
                  </i>
                  <i class="el-icon-star-on status-icon" @click="starOne(articleDetails.id)"
                    :style="articleDetails.star ? 'color: red;' : 'color: #333'">
                    &nbsp;{{articleDetails.collectionsSum}}
                  </i>
                  <i class="el-icon-s-comment  status-icon" @click="getComment(articleDetails.id)">
                    &nbsp;{{ articleDetails.commentSum }}
                  </i>
                </div>

              </div>
            </div>
          </div>
        </div>
        <!-- 用来撑起高度 -->
        <div class=" content-after" style="height: 100px;">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import articleApi from '@/api/articleApi';

export default {
  name: 'ArticleDetailsView',
  data() {
    return {
      showImg: false,
      // 文章详情
      articleDetails: {
        cover: '',
      }
    }
  },
  computed: {
    groupList() {
      return this.$store.getters.groupList == null ? [] : this.$store.getters.groupList
    }
  },
  mounted() {
    this.checkHeight();
    window.addEventListener('scroll', this.checkHeight);
    this.showImg = true;
    if (this.$route.params.id != undefined) {
      this.getArticle(this.$route.params.id);
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.checkHeight);
  },
  methods: {
    // 获取文章详情
    getArticle(id) {
      articleApi.getArticleOne(id).then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.articleDetails = data.data
          let group = this.articleDetails.articleGroupId.split(",");
          const list = [];
          group.forEach((gId) => {
            this.groupList.forEach(item => {
              if (gId == item.id) {
                list.push(item.articleType)
              }
            })
          })
          this.articleDetails.articleGroupId = list.length == 0 ? null : list
        }
      })
    },
    // 检测高度，改变状态栏的位置
    checkHeight() {
      const contentHeight = this.$refs.content.scrollHeight;
      const statusBar = this.$refs.statusBar;
      if (contentHeight > window.scrollY + 300) {
        statusBar.style.position = 'fixed';
        statusBar.style.bottom = '0';
        statusBar.style.width = '1024px';
      } else {
        statusBar.style.position = 'relative';
      }
    },
    likeOne(id) {
      articleApi.likeOrStarArticle({ id: id, type: 1 }).then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.articleDetails.likeSum += this.articleDetails.liked ? -1 : 1;
          this.articleDetails.liked = !this.articleDetails.liked;
        }
      })
    },
    starOne(id) {
      articleApi.likeOrStarArticle({ id: id, type: 2 }).then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.articleDetails.collectionsSum += this.articleDetails.star ? -1 : 1
          this.articleDetails.star = !this.articleDetails.star
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
  position: relative;
  max-width: 1024px;
  min-width: 1024px;
  margin-top: 50px;
  box-shadow: 0px -2px 3px rgba(0, 0, 0, 0.5);
}

.center {
  display: flex;
  justify-content: center;
  margin-top: 50vh;
}
.top-icon {
  font-size: 13px;
  margin-right: 20px;
  margin-bottom: 20px;
  color: #999;
}

.content-middle {
  position: relative;
  margin-top: 40px;
}
.content-bottom {
  width: 100%;
  height: 60px;
  background: #fff;
  box-shadow: 0px -2px 3px rgba(0, 0, 0, 0.5);
}
.bottom-status {
  position: absolute;
  right: 20px;
  line-height: 60px;
}
.status-icon {
  font-size: 20px;
  margin-right: 20px;
  cursor: pointer;
}
</style>

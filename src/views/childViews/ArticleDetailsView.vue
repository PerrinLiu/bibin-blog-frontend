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
      <div class="content-inner">
        <div class="content-top">
          <h1>{{ articleDetails.articleTitle }}</h1>
          <i class="el-icon-time top-icon">&nbsp;{{ articleDetails.createTime }}</i>
          <i class="el-icon-star-on top-icon">&nbsp;点赞：{{articleDetails.likeSum}}</i>
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
        <div class="content-middle">
          <div v-html="articleDetails.articleText">
          </div>
          <div class="content-bottom">
            123
          </div>
        </div>

        <!-- 用来撑起高度 -->
        <div class=" content-after" style="height: 60px;">
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
    this.showImg = true;
    if (this.$route.params.id != undefined) {
      this.getArticle(this.$route.params.id);
    }
  },
  methods: {
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
  max-width: 1024px;
  min-width: 1024px;
  margin-top: 50px;
}

.center {
  display: flex;
  justify-content: center;
  margin-top: 50vh;
}
.content-top {
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
}
</style>

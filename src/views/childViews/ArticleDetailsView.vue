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

    <div class="content item center" style="margin-top: 50vh;">
      <div class="content-inner">
        <div class="content-top">
          <h1>{{ articleDetails.articleTitle }}</h1>
          <i class="el-icon-time top-icon">&nbsp;{{ articleDetails.createTime }}</i>
          <i class="el-icon-star-on top-icon">&nbsp;点赞：{{articleDetails.likeSum}}</i>
          <i class="el-icon-view top-icon">&nbsp;阅读量：{{articleDetails.readSum}}</i>
          <i class="el-icon-s-comment top-icon">&nbsp;评论数：{{ articleDetails.commentSum }}</i>
        </div>
        <div style="position: relative;margin-top:40px;height: 800px;">
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
}
.content-top {
}
.el-icon-time {
  margin-bottom: 10px;
}
.top-icon {
  font-size: 13px;
  margin-right: 20px;
  color: #999;
}
.content-bottom {
}
</style>

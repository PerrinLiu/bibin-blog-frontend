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

    <div class="content item center" ref="contentContainer">
      <div>
        <div class="content-inner" ref="myElement"
          :style="isPhone ? 'width:95%;max-width: 550px;margin-left: 2.5%;' : 'max-width: 1024px;min-width: 1024px;'">
          <div style="padding: 20px 20px 0 20px;">
            <h1>{{ articleDetails.articleTitle }}</h1>
            <i class="el-icon-time top-icon">&nbsp;{{ articleDetails.createTime }}</i>

            <i class="el-icon-view top-icon">&nbsp;阅读量：{{articleDetails.readSum}}</i><br v-if="isPhone" />
            <i class="iconfont icon-like top-icon">&nbsp;点赞：{{articleDetails.likeSum}}</i>
            <i class="el-icon-star-on top-icon">&nbsp;收藏：{{articleDetails.likeSum}}</i>
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
          <div class="content-middle ">
            <div style="padding: 20px 20px 0 20px;" v-html="articleDetails.articleText">
            </div>
            <div ref="statusBar" class="content-bottom item">
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

    <el-drawer title="评论" :visible.sync="drawer" size="500px" custom-class="item">
      <div style="width: 90%;margin-left: 5%;height: 500px;">
        <el-row :gutter="20">
          <el-col :span="4">
            <div style="width: 50px;height: 50px;">
              <img src="@/assets/images/defaul.jpg" style="width: 100%;height: 100%;border-radius: 50%;" />
            </div>
          </el-col>
          <el-col :span="20">
            <div style="background-color: aliceblue;width: 100%;height: 30px;">
              <el-input type="textarea" :rows="6" resize="none" v-model="commentVo.content" placeholder="发布你的想法~" style="width: 100%;">
              </el-input>
              <div style="text-align: right;margin-top: 15px;">
                <el-button type="primary" @click="addComment">发布</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="width: 90%;margin-left: 5%;height: 500px;">
        <el-row :gutter="20">
          <el-col :span="4">
            <div style="width: 50px;height: 50px;">
              <img src="@/assets/images/defaul.jpg" style="width: 100%;height: 100%;border-radius: 50%;" />
            </div>
          </el-col>
          <el-col :span="20">
            <div style="background-color: aliceblue;width: 100%;height: 30px;">
              <!-- todo 评论样式待做 -->
              {{ listComment }}
            </div>
          </el-col>
        </el-row>
      </div>
    </el-drawer>
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
      },
      checkHeightOffset: 9,
      drawer: false,
      commentVo: {
        articleId: 0,
        content: '',
        userId: null,
        parentId: null
      },
      listComment: [],
      commentSearch: {
        articleId: 0,
        pageNum: 1,
        pageSize: 5
      }
    }
  },
  computed: {
    groupList() {
      return this.$store.getters.groupList == null ? [] : this.$store.getters.groupList
    },
    isPhone() {
      return this.$store.getters.isPhone
    }
  },
  mounted() {
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
    // 图片大小自适应
    changeImages() {
      setTimeout(() => {
        const container = this.$refs.contentContainer;
        if (container) {
          const images = container.getElementsByTagName('img');
          const containerWidth = container.clientWidth;
          Array.from(images).forEach((image) => {
            const imageWidth = image.clientWidth;
            if (imageWidth > containerWidth) {
              image.style.width = '100%';
              image.style.height = '';
            }
          })
          this.checkHeight();
        }
      }, 300);

    },
    // 获取文章详情
    getArticle(id) {
      articleApi.getArticleOne(id).then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.articleDetails = data.data
          this.changeImages();
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
      this.checkHeightOffset++;
      if (this.checkHeightOffset < 10) {
        return;
      }
      const statusBar = this.$refs.statusBar;
      if (this.$refs.myElement.scrollHeight > (window.innerHeight / 2) + window.scrollY) {
        const element = this.$refs.myElement;
        const width = element.offsetWidth;
        statusBar.style.position = 'fixed';
        statusBar.style.bottom = '0';
        statusBar.style.width = width + 'px';
      } else {
        statusBar.style.position = 'relative';
      }
      this.checkHeightOffset = 0;
    },
    // 点赞
    likeOne(id) {
      articleApi.likeOrStarArticle({ id: id, type: 1 }).then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.articleDetails.likeSum += this.articleDetails.liked ? -1 : 1;
          this.articleDetails.liked = !this.articleDetails.liked;
        }
      })
    },
    // 收藏
    starOne(id) {
      articleApi.likeOrStarArticle({ id: id, type: 2 }).then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.articleDetails.collectionsSum += this.articleDetails.star ? -1 : 1
          this.articleDetails.star = !this.articleDetails.star
        }
      })
    },
    // 获取评论
    getComment(id) {
      console.log(this.articleDetails);
      this.drawer = true
      //获取评论
      this.commentSearch.articleId = id
      articleApi.listComment(this.commentSearch).then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.listComment = data.data
        }
      })
    },
    // 发布评论
    addComment() {
      this.commentVo.articleId = this.articleDetails.id
      this.commentVo.userId = this.$store.getters.user.userId
      articleApi.addComment(this.commentVo).then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.listComment = data.data
          this.getComment(this.articleDetails.id)
        }
      })
    },
    replyComment(id) {
      this.commentVo.parentId = id
      this.commentVo.articleId = this.articleDetails.id
      this.commentVo.userId = this.$store.getters.user.userId
      articleApi.addComment(this.commentVo).then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.listComment = data.data
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

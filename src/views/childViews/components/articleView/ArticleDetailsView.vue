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
      <div ref="contentContainer">
        <div class="content-inner item" ref="myElement"
          :style="isPhone ? 'width:95%;max-width: 550px;margin-left: 2.5%;' : 'max-width: 1024px;min-width: 1024px;'">
          <div style="padding: 20px 20px 0 20px;">
            <h1>{{ articleDetails.articleTitle }}</h1>
            <i class="el-icon-time top-icon">&nbsp;{{ articleDetails.createTime }}</i>

            <i class="el-icon-view top-icon">&nbsp;阅读量：{{articleDetails.readSum}}</i><br v-if="isPhone" />
            <i class="iconfont icon-like top-icon">&nbsp;点赞：{{articleDetails.likeSum}}</i>
            <i class="el-icon-star-on top-icon">&nbsp;收藏：{{articleDetails.collectionsSum}}</i>
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

    <!-- 评论 -->
    <el-drawer title="评论" :visible.sync="drawer" size="500px" custom-class="item" @close="resetComment">
      <div class="comment-head">
        <el-row :gutter="20">
          <el-col :span="4">
            <img class="comment-userImg" src="@/assets/images/defaul.jpg" />
          </el-col>
          <el-col :span="20">
            <el-input type="textarea" :rows="6" resize="none" v-model="commentVo.content" placeholder="发布你的想法~" style="width: 100%;">
            </el-input>
            <div style="text-align: right;margin-top: 15px;">
              <el-button icon="el-icon-s-promotion" size="small" type="primary" @click="addComment">发布</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="comment-body">
        <div v-for="(item,index) in listComment" :key="index" @mouseenter="enter(item)" @mouseleave="leave(item)" style="margin-top: 25px;">
          <el-row :gutter="20">
            <el-col :span="3">
              <div class="comment-userImg">
                <img src="@/assets/images/defaul.jpg" class="comment-userImg" />
              </div>
            </el-col>
            <el-col :span="20">
              <div class="comment-body-top">
                <div class="comment-body-name">
                  <p class="comment-body-name-p" style="max-width: 80px;margin-right: 10px;">{{ item.userName }}</p>
                  <p class="comment-body-name-p" style="width: 150px;">{{ item.createTime }}</p>
                </div>
                <div style="position: absolute;right: 0px;font-size: 14px;line-height: 39px;">
                  <el-button v-if="item.userId == userInfo.userId && item.showDelete" @click="deleteComment(item.id)" icon="el-icon-delete"
                    type="text" style="color: red;padding: 13px 0x;font-size: 12px">
                    删除
                  </el-button>
                  <el-button icon="el-icon-chat-line-square" @click="changeReply(item)" type="text"
                    style="color: green;padding: 13px 0px;font-size: 12px">
                    {{item.showReply ? '收起' : '回复'}}
                  </el-button>

                  &nbsp;{{item.likeSum == 0 ? '' : item.likeSum}}
                  <i @click="likeComment(item.id)" class="iconfont icon-like" style="font-size: 14px;cursor: pointer;"
                    :style="item.liked ? 'color: red;' : 'color: #333'">
                  </i>
                </div>

              </div>

              <div class="comment-body-content">
                <div>
                  {{ item.content }}
                </div>
                <div v-show="item.showReply" style="margin-top: 20px;">
                  <el-input type="textarea" :rows="6" resize="none" v-model="replyCommentVo.content" placeholder="发布你的想法~"
                    style="width: 100%;">
                  </el-input>
                  <div style="text-align: right;margin-top: 15px;">
                    <el-button icon="el-icon-s-promotion" size="small" type="primary" @click="replyComment(item.id)">发布</el-button>
                  </div>
                </div>
                <!-- 子评论 -->
                <div v-for="(sub,index) in item.subComment" :key="index" @mouseenter="enter(sub)" @mouseleave="leave(sub)"
                  style="margin-top: 15px;">
                  <el-row :gutter="20">
                    <el-col :span="3">
                      <img class="comment-userImg" src="@/assets/images/defaul.jpg" />
                    </el-col>
                    <el-col :span="20">
                      <div class="comment-body-top">
                        <div class="comment-body-name">
                          <p class="comment-body-name-p" style="max-width: 80px;margin-right: 10px;">{{ sub.userName }}</p>
                          <el-tag size="mini" type="info" style="position: relative;top: -15px;">回复</el-tag>
                          <p class="comment-body-name-p" style="max-width: 80px;margin-left: 10px;">{{ sub.replyUserName }} </p>
                        </div>
                        <div style="position: absolute;right: 0px;font-size: 14px;top:14px">
                          &nbsp;{{sub.likeSum == 0 ? '' : sub.likeSum}}
                          <i @click="likeSubComment(sub.id,item.id)" class="iconfont icon-like" style="font-size: 14px;cursor: pointer;"
                            :style="sub.liked ? 'color: red;' : 'color: #333'">
                          </i>
                        </div>
                      </div>
                      <div style="position: relative;top:-5px">
                        {{ sub.content }}
                      </div>

                      <div style="position: relative;left: 0px;font-size: 14px;height: 20px;">
                        <el-row>
                          <el-col :span="12">
                            <p class="comment-body-name-p"
                              style="width: 150px;display:inline;color:#666;font-size: 12px;line-height: 27px;">
                              {{ sub.createTime }}
                            </p>
                          </el-col>
                          <el-col :span="12" style="line-height: 25px;">
                            <el-button v-if="sub.userId == userInfo.userId && sub.showDelete" @click="deleteComment(sub.id)"
                              icon="el-icon-delete" type="text" style="color: red;padding: 5px 0px;font-size: 12px">删除</el-button>
                            <el-button v-if="sub.showDelete" @click="changeReply(sub)" icon="el-icon-chat-line-square" type="text"
                              style="color: green;padding: 0px 0px;font-size: 12px">{{sub.showReply ? '收起' : '回复'}}</el-button>
                          </el-col>
                        </el-row>
                      </div>
                      <div v-show="sub.showReply" style="margin-top: 20px;">
                        <el-input type="textarea" :rows="6" resize="none" v-model="replyCommentVo.content" placeholder="发布你的想法~"
                          style="width: 100%;">
                        </el-input>
                        <div style="text-align: right;margin-top: 15px;">
                          <el-button icon="el-icon-s-promotion" size="small" type="primary" @click="replyComment(sub.id)">发布</el-button>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-if="pages > commentSearch.pageNum && listComment.length > 0" style="width: 100%;text-align: center;margin-bottom: 30px;">
        <el-button type="success" size="small" @click="moreComment">查看更多</el-button>
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
        userId: null
      },
      replyCommentVo: {
        articleId: 0,
        content: '',
        userId: null,
        parentId: null
      },
      listComment: [],
      commentSearch: {
        articleId: 0,
        pageNum: 1,
        pageSize: 10
      },
      //最大页码
      pages: 0
    }
  },
  computed: {
    groupList() {
      return this.$store.getters.groupList == null ? [] : this.$store.getters.groupList
    },
    isPhone() {
      return this.$store.getters.isPhone
    },
    userInfo() {
      if (this.$store.getters.user == null) {
        return 'userInfo'
      }
      return this.$store.getters.user
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
    // 鼠标移入显示回复
    enter(item) {
      item.showDelete = true
    },
    // 鼠标移出 隐藏回复
    leave(item) {
      item.showDelete = false
    },
    // 图片大小自适应
    changeImages() {
      setTimeout(() => {
        const container = this.$refs.contentContainer;
        if (container) {
          const images = container.getElementsByTagName('img');
          const containerWidth = container.clientWidth;
          Array.from(images).forEach((image) => {
            const imageWidth = image.clientWidth;
            console.log(imageWidth, containerWidth);
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
          this.$nextTick(() => {
            const preTags = this.$el.querySelectorAll('pre');
            preTags.forEach(preTag => {
              preTag.style.backgroundColor = '#1c1d21';
              preTag.style.borderRadius = '12px';
              preTag.style.padding = '1.5em';
              preTag.style.color = '#fff';
            });
          });
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
      this.drawer = true
      //获取评论
      this.commentSearch.articleId = id
      articleApi.listComment(this.commentSearch).then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          const commentList = data.data.records;
          commentList.forEach(item => {
            this.listComment.push(item)
          })
          this.pages = data.data.pages
        }
      })
    },
    moreComment() {
      this.commentSearch.pageNum += 1
      this.getComment(this.articleDetails.id)
    },
    // 发布评论
    addComment() {
      if (this.$store.getters.user == null) {
        this.$message.warning('请先登录')
        return;
      }
      this.commentVo.articleId = this.articleDetails.id
      this.commentVo.userId = this.$store.getters.user.userId
      articleApi.addComment(this.commentVo).then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.resetComment()
          this.getComment(this.articleDetails.id)
          this.commentVo.content = ''
        }
      })
    },
    changeReply(item) {
      //关闭其他回复框
      this.listComment.forEach(obj => {
        if (obj.id != item.id) {
          obj.showReply = false;
        }
        obj.subComment.forEach(sub => {
          if (sub.id != item.id) {
            sub.showReply = false
          }
        })
      })
      item.showReply = !item.showReply;
      this.$forceUpdate();
      this.replyCommentVo.content = ''
    },
    replyComment(id) {
      if (this.$store.getters.user == null) {
        this.$message.warning('请先登录')
        return;
      }
      this.replyCommentVo.parentId = id
      this.replyCommentVo.articleId = this.articleDetails.id
      this.replyCommentVo.userId = this.$store.getters.user.userId
      articleApi.addComment(this.replyCommentVo).then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.resetComment()
          this.getComment(this.articleDetails.id)
        }
      })
    },
    resetComment() {
      this.commentSearch.pageNum = 1
      this.listComment = []
    },
    //点赞父级评论
    likeComment(id) {
      if (this.userInfo == 'userInfo') {
        this.$message.warning('请先登录')
        return
      }
      articleApi.likeComment(id, this.$store.getters.user.userId).then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.listComment.forEach(item => {
            if (item.id == id) {
              item.liked = !item.liked
              item.likeSum += item.liked ? 1 : -1
            }
          })
        }
      })
    },
    // 点赞子级
    likeSubComment(id, parentId) {
      if (this.userInfo == 'userInfo') {
        this.$message.warning('请先登录')
        return
      }
      let subList = null;
      this.listComment.forEach(item => {
        if (item.id == parentId) {
          subList = item.subComment;
        }
      })
      if (subList == null) {
        return;
      }
      articleApi.likeComment(id, this.$store.getters.user.userId).then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          if (subList != null) {
            subList.forEach(item => {
              if (item.id == id) {
                item.liked = !item.liked
                item.likeSum += item.liked ? 1 : -1
              }
            })
          }
        }
      })
    },
    deleteComment(id) {
      articleApi.deleteComment(id).then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.resetComment()
          this.getComment(this.articleDetails.id)
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
/* 评论样式 */
.comment-head {
  width: 90%;
  margin-left: 5%;
  height: 200px;
}
.comment-userImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.comment-body {
  width: 90%;
  margin-left: 5%;
  margin-bottom: 20px;
}
.comment-body-top {
  position: relative;
  width: 100%;
  height: 30px;
  top: -10px;
  color: #666;
}
.comment-body-name {
  position: absolute;
  left: 0px;
  width: 280px;
  font-size: 12px;
}
.comment-body-name-p {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.comment-body-content {
  position: relative;
  top: -5px;
  font-size: 14px;
}
pre {
  background-color: #1c1d21;
  border-radius: 12px;
  padding: 1.5em;
}
</style>

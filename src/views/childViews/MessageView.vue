<template>
  <div class="message-page">
    <div class="backgroundImg">
      <transition name="el-zoom-in-top">
        <div v-show="showImg" class="backgroundImg"
          style="position: inherit;height:100vh;background-image: url('https://llpy-blog.oss-cn-shenzhen.aliyuncs.com/background/%E8%83%8C%E6%99%AF8.webp')">
        </div>
      </transition>
      <div class="backgroundImg-text-div" style="height: 60vh;">
        <h1 class="backgroundImg-text" style="color: rgb(255, 218, 218);">留言</h1>
      </div>
    </div>
    <dan-mu-vue></dan-mu-vue>
    <div class="content" style="margin-top:100vh;display:flex;justify-content: center;">
      <div style="margin-top: 20px;width: 1024px;" class="content-before">
        <div class="comment-head">
          <el-row :gutter="20">
            <el-col :span="isPhone ? 5: 2">
              <img v-if="userInfo =='userInfo'" class="comment-userImg" src="@/assets/images/defaul.jpg">
              <img v-else class="comment-userImg" v-lazy="userInfo.userImg">
            </el-col>
            <el-col :span="isPhone ? 18: 20">
              <el-input type="textarea" :rows="6" resize="none" v-model="commentVo.content" placeholder="发布你的想法~" style="width: 100%;">
              </el-input>
              <div style="text-align: right;margin-top: 15px;">
                <el-button icon="el-icon-s-promotion" size="small" type="primary" @click="addComment">发布</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="comment-body">
          <div v-for="(item,index) in listComment" :key="index" @mouseenter="enter(item)" @mouseleave="leave(item)"
            style="margin-top: 25px;">
            <el-row :gutter="20">
              <el-col :span="isPhone ? 5: 2">
                <img v-lazy="item.userImg" class="comment-userImg-two">
              </el-col>
              <el-col :span="isPhone ? 18: 20">
                <div class="comment-body-top">
                  <div class="comment-body-name">
                    <p class="comment-body-name-p" style="max-width: 80px;margin-right: 10px;">{{ item.nickname }}</p>
                    <p class="comment-body-name-p" style="width: 150px;">{{ item.createTime }}</p>
                  </div>
                  <br v-if="isPhone" />
                  <div style="position: absolute;right: 0px;font-size: 14px;line-height: 39px;">
                    <el-popconfirm @confirm="deleteComment(item.id)" title="确定删除该评论?" onfirm-button-type="success">
                      <el-button slot="reference" v-show="item.userId == userInfo.userId && item.showDelete" icon="el-icon-delete"
                        type="text" style="color: red;padding: 13px 0x;font-size: 12px">删除
                      </el-button>
                    </el-popconfirm>

                    <el-button icon="el-icon-chat-line-square" @click="changeReply(item)" type="text"
                      style="color: green;padding: 13px 0px;font-size: 12px">
                      {{item.showReply ? '收起' : '回复'}}
                    </el-button>

                    &nbsp;{{item.likeSum == 0 ? '' : item.likeSum}}
                    <i @click="likeComment(item.id)" class="iconfont " style="font-size: 14px;cursor: pointer;"
                      :class="item.liked ? 'icon-dianzan-yidianzan' : 'icon-dianzan-weidianzan'">
                    </i>
                  </div>

                </div>

                <div class="comment-body-content">
                  <div :style="isPhone ? 'margin-top: 20px;' : ''">
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
                      <el-col :span="isPhone ? 5: 2">
                        <img class="comment-userImg-two" v-lazy="sub.userImg">
                      </el-col>
                      <el-col :span="isPhone ? 18: 20">
                        <div class="comment-body-top">
                          <div class="comment-body-name">
                            <p class="comment-body-name-p" :style="isPhone ? 'max-width:40px' : 'max-width:80px'">{{ sub.nickname }}</p>
                            <el-tag size="mini" type="info" style="position: relative;top: -15px;">回复</el-tag>
                            <p class="comment-body-name-p" style="margin-left: 5px;" :style="isPhone ? 'max-width:35px' : 'max-width:80px'">
                              {{ sub.replyNickname }} </p>
                          </div>
                          <div style="position: absolute;right: 0px;font-size: 14px;top:14px">
                            &nbsp;{{sub.likeSum == 0 ? '' : sub.likeSum}}
                            <i @click="likeSubComment(sub.id,item.id)" class="iconfont" style="font-size: 14px;cursor: pointer;"
                              :class="sub.liked ? 'icon-dianzan-yidianzan' : 'icon-dianzan-weidianzan'">
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
                            <br v-if="isPhone" />
                            <el-col :span="24" style="line-height: 25px;">
                              <el-popconfirm @confirm="deleteComment(sub.id)" title="确定删除该评论?" onfirm-button-type="success">
                                <el-button slot="reference" v-show="sub.userId == userInfo.userId && sub.showDelete" icon="el-icon-delete"
                                  type="text" style="color: red;padding: 5px 0px;font-size: 12px">删除</el-button>
                              </el-popconfirm>

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
        <el-empty v-if="listComment.length == 0" :image-size="200" description="暂无评论~"></el-empty>
        <!-- 用来撑起高度 -->
        <div class="content-after" style="height: 60px;">

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import danMuVue from './components/messageView/danMu.vue'
import articleApi from '@/api/articleApi'
export default {
  name: 'MessageView',
  components: {
    danMuVue
  },
  data() {
    return {
      showImg: false,
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
      pages: 0,
      articleDetails: {
        id: '492579492579492579',
      },
    }
  },
  computed: {
    userInfo() {
      if (this.$store.getters.user == null) {
        return 'userInfo'
      }
      return this.$store.getters.user
    },
    isPhone() {
      return this.$store.getters.isPhone
    }
  },
  mounted() {
    this.showImg = true;
    this.getComment(this.articleDetails.id)
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
/* 评论样式 */
.comment-head {
  width: 90%;
  margin-left: 5%;
  height: 200px;
}
.comment-userImg {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.comment-userImg-two {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.comment-body {
  width: 70%;
  margin-left: 15%;
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
</style>

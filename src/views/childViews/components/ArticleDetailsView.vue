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
      <div style="width: 90%;margin-left: 5%;height: 200px;">
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
                <el-button icon="el-icon-s-promotion" size="small" type="primary" @click="addComment">发布</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="width: 90%;margin-left: 5%;">
        <el-row :gutter="20" v-for="(item,index) in listComment" :key="index" style="margin-top: 30px;">
          <el-col :span="3">
            <div style="width: 40px;height: 40px;">
              <img src="@/assets/images/defaul.jpg" style="width: 100%;height: 100%;border-radius: 50%;" />
            </div>
          </el-col>
          <el-col :span="20">
            <div style="position:relative;width: 100%;height: 30px;top: -10px;color: #666">
              <div style="position: absolute;left: 0px;width:280px;font-size: 12px;">
                <p
                  style="max-width: 80px;margin-right: 10px;display:inline-block;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
                  {{ item.userName }}
                </p>
                <p style="width: 150px;display:inline-block;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
                  {{ item.createTime }}
                </p>
              </div>
              <div style="position: absolute;right: 0px;font-size: 14px;">
                <el-button icon="el-icon-delete" type="text" style="color: red" v-if="item.userId == userInfo.id"
                  @click="deleteComment(item.id)">删除</el-button>
                <el-button icon="el-icon-chat-line-square" type="text" style="color: green" @click="replyComment(item.id)">回复</el-button>
                &nbsp;{{item.likeSum == 0 ? '' : item.likeSum}}
                <i class="iconfont icon-like" style="font-size: 14px;cursor: pointer;" @click="likeComment(item.id)"
                  :style="item.liked ? 'color: red;' : 'color: #333'">
                </i>
              </div>
            </div>
            <div style="position: relative;top:-5px;font-size: 14px">
              {{ item.content }}
              <!-- 子评论 -->
              <el-row :gutter="20" v-for="(sub,index) in item.subComment" :key="index" style="margin-top: 10px;">
                <el-col :span="3">
                  <div style="width: 40px;height: 40px;">
                    <img src="@/assets/images/defaul.jpg" style="width: 100%;height: 100%;border-radius: 50%;" />
                  </div>
                </el-col>
                <el-col :span="20">
                  <div style="position:relative;width: 100%;height: 30px;top: -10px;color: #666">
                    <div style="position: absolute;left: 0px;width:280px;font-size: 12px;">
                      <p
                        style="max-width: 80px;margin-right: 10px;display:inline-block;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
                        {{ sub.userName }}
                      </p>
                      <el-tag size="mini" type="info" style="position: relative;top: -15px;">回复</el-tag>
                      <p
                        style="max-width: 80px;margin-left: 10px;display:inline-block;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
                        {{ sub.replyUserName }}
                      </p>
                    </div>
                    <div style="position: absolute;right: 0px;font-size: 14px;top:14px">
                      &nbsp;{{sub.likeSum == 0 ? '' : sub.likeSum}}
                      <i class="iconfont icon-like" style="font-size: 14px;cursor: pointer;" @click="likeSubComment(sub.id,item.id)"
                        :style="sub.liked ? 'color: red;' : 'color: #333'">
                      </i>
                    </div>
                  </div>
                  <div style="position: relative;top:-5px">
                    {{ sub.content }}
                  </div>
                  <div style="position: relative;left: 0px;font-size: 14px;height: 20px;">
                    <p
                      style="width: 150px;display:inline;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;line-height: 20px;color:#666">
                      {{ sub.createTime }}
                    </p>
                    <el-button icon="el-icon-delete" type="text" style="color: red;padding: 5px 0px;" v-if="sub.userId == userInfo.id"
                      @click="deleteComment(sub.id)">删除</el-button>
                    <el-button icon="el-icon-chat-line-square" type="text" style="color: green;padding: 5px 0px;"
                      @click="replyComment(sub.id)">回复</el-button>
                  </div>
                </el-col>
              </el-row>
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
      listComment: [
        {
          id: 1,
          userId: '用户',
          userImg: '1',
          userName: '啊大家阿是建档立卡',
          content: '啊大家阿是建档立卡大家啊数控刀具克拉斯打卡机打开撒娇打开了撒娇看啥事大家啊登记卡受打击了啊速度快拉德季啊啊打开',
          createTime: '2021-01-01 16:00',
          likeSum: 150,
          liked: false,
          subComment: [
            {
              id: 3,
              userId: '用户',
              userImg: '2',
              userName: '啊打开拉萨是阿松大',
              replyUserName: '我是你爹',
              content: '2',
              createTime: '2021-01-01 00:00',
              likeSum: 0,
              liked: false,
            },
            {
              id: 3,
              userId: 2,
              userImg: '2',
              userName: '2',
              replyUserName: '卡',
              content: '2',
              createTime: '2021-01-01 00:00',
              likeSum: 0,
              liked: false,
            }
          ]
        },
        {
          id: 2,
          userId: 3,
          userImg: '3',
          userName: '啊大家阿是',
          content: '3',
          createTime: '2021-01-01 00:00',
          likeSum: 1,
          liked: true,
          subComment: [
            {
              id: 4,
              userId: 4,
              userImg: '2',
              userName: '2',
              content: '2',
              createTime: '2021-01-01 00:00',
              likeSum: 0,
              liked: false,
            }
          ]
        },
        {
          id: 6,
          userId: 3,
          userImg: '3',
          userName: '啊大家阿是',
          content: '3',
          createTime: '2021-01-01 00:00',
          likeSum: 1,
          liked: true,
          subComment: [

          ]
        },
        {
          id: 7,
          userId: 3,
          userImg: '3',
          userName: '啊大家阿是',
          content: '3',
          createTime: '2021-01-01 00:00',
          likeSum: 1,
          liked: true,
          subComment: [

          ]
        },
        {
          id: 8,
          userId: 3,
          userImg: '3',
          userName: '啊大家阿是',
          content: '3',
          createTime: '2021-01-01 00:00',
          likeSum: 1,
          liked: true,
          subComment: [

          ]
        },
        {
          id: 6,
          userId: 3,
          userImg: '3',
          userName: '啊大家阿是',
          content: '3',
          createTime: '2021-01-01 00:00',
          likeSum: 1,
          liked: true,
          subComment: [

          ]
        },
        {
          id: 6,
          userId: 3,
          userImg: '3',
          userName: '啊大家阿是',
          content: '3',
          createTime: '2021-01-01 00:00',
          likeSum: 1,
          liked: true,
          subComment: [

          ]
        },
        {
          id: 6,
          userId: 3,
          userImg: '3',
          userName: '啊大家阿是',
          content: '3',
          createTime: '2021-01-01 00:00',
          likeSum: 1,
          liked: true,
          subComment: [

          ]
        },
        {
          id: 6,
          userId: 3,
          userImg: '3',
          userName: '啊大家阿是',
          content: '3',
          createTime: '2021-01-01 00:00',
          likeSum: 1,
          liked: true,
          subComment: [

          ]
        }
      ],
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
    },
    userInfo() {
      if (this.$store.getters.user == null) {
        return { id: '用户' }
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
    },
    //点赞父级评论
    likeComment(id) {

      articleApi.likeComment(id).then((res) => {
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
      let subList = null;
      this.listComment.forEach(item => {
        if (item.id == parentId) {
          subList = item.subComment;
        }
      })
      if (subList == null) {
        return;
      }
      articleApi.likeComment(id).then((res) => {
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

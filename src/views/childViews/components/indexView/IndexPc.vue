<template>
  <div class="index-pc">
    <el-container>
      <!-- 根据屏幕宽度，控制侧边栏宽度 -->
      <el-aside :width="isPhone ? '100%' : '30%'" style="position: relative;display: flex;  justify-content: center; /* 水平居中 */">
        <div style="position: relative;top: -30px;min-width: 280px;" :style="isPhone ? 'width: 80%;' : 'width: 80%'">

          <!-- 搜索框 -->
          <el-card class="box-card box-card2 item" shadow="always">
            <span style="position: relative;top: -10px;font-weight: 900;">搜搜</span>
            <el-input placeholder="请输入内容" v-model="searchText" @keyup.enter.native="search()">
            </el-input>
            <i style="position: absolute;top: 52px;right: 35px;font-size: 20px;cursor: pointer;" @click="search()"
              class="el-icon-search"></i>
          </el-card>
          <!-- 推荐文章 -->
          <el-card class="box-card box-card1" shadow="always">
            <span style="font-weight: 600;position: relative;"><i class="iconfont icon-xiezuoyeshu"></i>&nbsp;推荐文章</span>
            <div v-for="o in recommendArticleList " :key="o.id"
              style=" height: 30px;margin-top: 15px;line-height: 30px;padding:0 10px;border-radius: 10px;border: 1px solid #ebeef5;">
              <router-link :to="{ name: 'articleDetails', params: {id:o.id } }" style="text-decoration: none;">
                <el-popover placement="right-start" :title="o.articleTitle" width="300" trigger="hover" :content="o.des" :open-delay="200">
                  <p class="article-title" style="margin: 0;color: #01687C;font-weight: 100" slot="reference"> {{ o.articleTitle }}</p>
                </el-popover>

              </router-link>
            </div>

            <el-empty v-if="recommendArticleList.length == 0" style="position: relative;top: -30px;" description="博主暂无推荐"></el-empty>
          </el-card>
          <!-- todo 赞赏暂时关闭 -->
          <!-- <el-card class="box-card box-card3 item" shadow="always">
            <span style="font-weight: 900;"><i class="el-icon-chicken"></i>&nbsp;赞赏</span>
            <el-empty style="position: relative;top: -60px;" description="无任何记录"></el-empty>
          </el-card> -->

          <!-- 文章分类 -->
          <el-card class="box-card box-card3 item" shadow="always">
            <span style="font-weight: 900;"><i class="iconfont icon-a-appround13"></i>&nbsp;标签</span>
            <div style="overflow: auto;margin-bottom: 10px;">
              <el-row>
                <el-col :span="20" v-for="(o) in  options " :key="o.id" style="margin-top: 14px;">
                  <router-link :to="{ name: 'article', query: {groups:o.id } }" style="text-decoration: none;color: #545454">
                    <div style="height: 70px;width: 90%;border: 1px solid #545454;padding: 5px;border-radius: 5px;">
                      <p style="margin: 0;padding: 7px;font-weight: bold;">{{ o.articleType }}</p>
                      <p style="margin: 0;padding: 7px;"><span style="font-size: 12px;">相关文章：</span>
                        <span v-if="o.number == null || o.number == 0">
                          <el-tag type="warning" style="height: 27px;line-height: 27px;">暂无</el-tag>
                        </span>
                        <span v-else>
                          <el-tag type="info" style="height: 27px;line-height: 27px;"> {{ o.number }}</el-tag>
                        </span>
                      </p>
                    </div>
                  </router-link>
                </el-col>
              </el-row>
            </div>

            <el-empty v-if="options.length == 0" style="position: relative;top: -60px;" description="暂无分组"></el-empty>
          </el-card>
          <!-- 手机样式 -->
          <div v-if="isPhone">
            <el-card class="box-card item" v-for="item in articleList" :key="item.id" style=" height: 300px;"
              :body-style="{ padding: '0px' }">

              <div style="height: 300px;width:100%;position: absolute;top: 0px;">
                <img width="100%" height="100%" :src="item.cover" alt="">
              </div>
              <router-link style="text-decoration: none" :to="{ name: 'articleDetails', params: {id:item.id } }">
                <div class="article-content" style="text-shadow:0 0 10px red;">
                  <div style="height: 3cap;">
                    <h1 style="color: #030303;">{{ item.articleTitle }}</h1>
                  </div>
                  <div style="height: 90px;">
                    <p class="article-text">{{item.des}}</p>
                  </div>
                  <div style="height: 40px;line-height: 40px;">
                    <el-tag style="margin-right:16px" v-for="(o,index) in item.articleGroupId" :key="index">
                      {{o}}
                    </el-tag>
                    <el-tag v-if="item.articleGroupId.length == 0" style="margin-right:16px">
                      无标签
                    </el-tag>
                  </div>
                  <div style="height: 60px;line-height: 60px;">
                    <span>
                      <i class="iconfont icon-ico_yueduliang"
                        style="font-size: 24px;color: green">&nbsp;</i>{{item.readSum}}&nbsp;点击&nbsp;&nbsp;
                      <i class="iconfont icon-dianzan-yidianzan" style="font-size: 24px;"></i>&nbsp;{{item.likeSum}}&nbsp;点赞&nbsp;&nbsp;
                      <i class="iconfont icon-pinglun" style="font-size: 24px;"></i>&nbsp;{{ item.commentSum }}&nbsp;评论
                    </span>
                  </div>
                  <div style="height: 30px;">
                    <i class="el-icon-date" style="font-size: 20px;color: #5CB6FF;">&nbsp;</i>{{ item.createTime }}
                  </div>
                </div>
              </router-link>
            </el-card>
            <el-empty :image-size="200" v-if="articleList.length == 0"></el-empty>
            <div style="width: 100%;height: 60px;">
              <router-link to="/article" style="text-decoration: none;">
                <el-button type="primary" style="position: absolute;bottom: 0;right: 0px;">查看更多</el-button>
              </router-link>
            </div>
          </div>
        </div>
      </el-aside>
      <!-- 电脑时展示 -->
      <el-main v-if="!isPhone" style="position: relative;">
        <div class="article-list">
          <el-card class="box-card item" v-for="item in articleList" :key="item.id" style=" height: 300px;"
            :body-style="{ padding: '0px' }">
            <el-row>
              <router-link :to="{ name: 'articleDetails', params: {id:item.id } }">
                <el-col :span="12">
                  <div style="height: 300px;overflow: hidden;">
                    <img class="oversize-img" width="100%" height="100%" :src="item.cover" alt="">
                  </div>
                </el-col>
              </router-link>
              <el-col :span="12">
                <div class="article-content">
                  <div style="height: 3cap;">
                    <p class="article-title" style="font-size: 25px;position: relative;top: -10px;">
                      {{ item.articleTitle }}
                    </p>
                  </div>
                  <div style="height: 90px;">
                    <p class="article-text">{{item.des == '' ? "作者很懒，什么也没留下...": item.des }}</p>
                  </div>
                  <div style="height: 40px;line-height: 40px;">
                    <el-tag style="margin-right:16px" v-for="(o,index) in item.articleGroupId" :key="index">
                      {{o}}
                    </el-tag>
                    <el-tag v-if="item.articleGroupId.length == 0" style="margin-right:16px">
                      无标签
                    </el-tag>
                  </div>
                  <div style="height: 60px;line-height: 60px;">
                    <span>
                      <i class="iconfont icon-ico_yueduliang"
                        style="font-size: 24px;color: green"></i>&nbsp;{{item.readSum}}&nbsp;点击&nbsp;&nbsp;
                      <i class="iconfont icon-dianzan-yidianzan" style="font-size: 24px;"></i>&nbsp;{{item.likeSum}}&nbsp;点赞&nbsp;&nbsp;
                      <i class="iconfont icon-pinglun" style="font-size: 24px;"></i>&nbsp;{{ item.commentSum }}&nbsp;评论
                    </span>
                  </div>
                  <div style="height: 30px;">
                    <i class="el-icon-date" style="font-size: 20px;color: #5CB6FF;">&nbsp;</i>{{ item.createTime }}
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
          <el-empty :image-size="200" v-if="articleList.length == 0"></el-empty>
          <div style="width: 100%;height: 60px;">
            <router-link to="/article" style="text-decoration: none;">
              <el-button type="primary" style="position: absolute;bottom: 0;right: 0px;">查看更多</el-button>
            </router-link>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
  
  <script>
import articleApi from '@/api/articleApi'
export default {
  data() {
    return {
      //搜索内容
      searchText: "",
      //文章列表
      articleList: [],
      //文章分组
      options: [],
      //推荐文章
      recommendArticleList: [],
    }
  },
  mounted() {
    // 获取文章分组和数据
    this.getGroup()
    this.getRecommendArticle()
  },
  computed: {
    isPhone() {
      return this.$store.getters.isPhone
    }
  },
  methods: {
    // 获取文章
    getArticle() {
      articleApi.listIndexArticle().then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.articleList = data.data;
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
    // 获取文章分组和数据
    getGroup() {
      articleApi.getGroupList().then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.options = data.data;
          this.$store.dispatch("setGroupList", data.data);
          this.getArticle();
        }
      })
    },
    // 获取推荐文章
    getRecommendArticle() {
      articleApi.getRecommendArticle().then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.recommendArticleList = data.data
        }
      })
    },
    // 搜索
    search() {
      this.$router.push({ path: "/article", query: { searchText: this.searchText } })
    },
  }
}
  </script>
  
  <style scoped>
.box-card {
  position: relative;
  margin-top: 40px;
  border-radius: 30px;
  box-shadow: 2px 2px 6px 0.5px rgba(0, 0, 0, 0.5) !important;
}

.box-card:hover {
  transform: scale(1.01);
}

.box-card1 {
  height: 300px;
  background-size: 300% 300%;
  background-image: linear-gradient(90deg, #8bc0d6, #61bae4, #1490d8);
  animation: colorChange 5s linear infinite;
}

/* 定义动画效果 */
@keyframes colorChange {
  0% {
    background-position: 0%;
  }

  25% {
    background-position: 50%;
  }

  50% {
    background-position: 100%;
  }

  75% {
    background-position: 50%;
  }

  100% {
    background-position: 0%;
  }
}

.box-card2 {
  height: 100px;
}

.box-card3 {
  /* height: 250px; */
}
.article-list {
  position: relative;
  margin-top: -50px;
  width: 100%;
  min-width: 600px;
}
.article-content {
  position: relative;
  margin-left: 15px;
  height: 280px;
  min-width: 300px;
}
.article-title {
  width: 95%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.article-text {
  width: 95%;
  overflow: hidden;
  position: relative;
  top: -15px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  color: #728086;
}
</style>
<template>
  <div class="index-pc">
    <el-container>
      <el-aside width="40%" style="position: relative;display: flex;  justify-content: center; /* 水平居中 */">
        <div style="width: 50%;position: relative;top: -30px;min-width: 280px;">
          <!-- 名片 -->
          <el-card class="box-card box-card1" shadow="always">
            <div style="text-align: center;">
              <span><img class="card-img" width="100px" height="100px" src="@/assets/images/defaul.jpg" alt=""
                  style="border-radius: 50%;border: 1px solid #030303;"></span>
              <h2 style="font-size: 30px;">Bibin</h2>
            </div>
            <div style="position:relative;text-align: center;margin-top: -10px;display: flex;  justify-content: center; /* 水平居中 */">
              <div style="float: left;line-height: 10px;">
                <p style="font-size: 18px;font-weight: 900;">文章</p>
                <div>0</div>
              </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div style="float: left;line-height: 10px;">
                <p style="font-size: 18px;font-weight: 900;">分类</p>
                <div>0</div>
              </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div style="float: left;line-height: 10px;">
                <p style="font-size: 18px;font-weight: 900;">访问量</p>
                <div> {{ access }}</div>
              </div>
            </div>
          </el-card>

          <!-- 搜索框 -->
          <el-card class="box-card box-card2 item" shadow="always">
            <span style="position: relative;top: -10px;font-weight: 900;">搜搜</span>
            <el-input placeholder="请输入内容" v-model="searchText">
            </el-input>
            <i style="position: absolute;top: 52px;right: 35px;font-size: 20px;cursor: pointer;" @click="$emit('childEvent', searchText);"
              class="el-icon-search"></i>
          </el-card>
          <!-- 推荐文章 -->
          <el-card class="box-card box-card1" shadow="always">
            <span style="font-weight: 900;position: relative;"><i class="el-icon-reading"></i>&nbsp;推荐文章</span>
            <el-empty style="position: relative;top: -30px;" description="博主暂无推荐"></el-empty>
          </el-card>
          <!-- 赞赏 -->
          <el-card class="box-card box-card3 item" shadow="always">
            <span style="font-weight: 900;"><i class="el-icon-chicken"></i>&nbsp;赞赏</span>
            <el-empty style="position: relative;top: -60px;" description="无任何记录"></el-empty>
          </el-card>

          <!-- 文章分类 -->
          <el-card class="box-card box-card3 item" shadow="always">
            <span style="font-weight: 900;"><i class="el-icon-location-outline"></i>&nbsp;分组</span>
            <el-empty style="position: relative;top: -60px;" description="暂无标签"></el-empty>
          </el-card>

        </div>
      </el-aside>
      <el-main style="position: relative;width: 60vw;">
        <div class="article-list">
          <el-card class="box-card item" v-for="item in articleList" :key="item.id" style=" height: 300px;"
            :body-style="{ padding: '0px' }">
            <el-row>
              <router-link :to="{ name: 'articleDetails', params: {id:item.id } }">
                <el-col :span="12">
                  <div style="height: 300px;">
                    <img width="100%" height="100%" :src="item.cover" alt="">
                  </div>
                </el-col>
              </router-link>
              <el-col :span="12">
                <div class="article-content">
                  <div style="height: 3cap;">
                    <h1 style="color: #030303;font-size: 25px;line-height: 17px;">{{ item.articleTitle }}</h1>
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
                      <i class="el-icon-hot-water" style="font-size: 24px;color: green">&nbsp;</i>{{item.readSum}}&nbsp;点击&nbsp;&nbsp;
                      <i class="iconfont icon-like" style="font-size: 24px;color: red;"></i>&nbsp;{{item.likeSum}}&nbsp;点赞&nbsp;&nbsp;
                      <i class="el-icon-s-comment" style="font-size: 24px;"></i>&nbsp;{{ item.commentSum }}&nbsp;评论
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
  props: ["access"],
  data() {
    return {
      //搜索内容
      searchText: "",
      //文章列表
      articleList: [],
      //文章分组
      options: [],
    }
  },
  mounted() {
    this.getGroup()
  },
  methods: {
    getData() {
      this.getGroup();
    },
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
.box-card {
  position: relative;
  margin-top: 40px;
  border-radius: 30px;
  box-shadow: 2px 2px 6px 0.5px rgba(0, 0, 0, 0.5) !important;
}

.box-card:hover {
  transform: scale(1.01);
}

.card-img:hover {
  cursor: pointer;
  transition: 0.5s;
  rotate: 360deg;
}

.box-card1 {
  height: 300px;
  background-size: 300% 300%;
  background-image: linear-gradient(90deg, #728086, #8bceee, #88949b);
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
  height: 250px;
}
.article-list {
  position: relative;
  margin-top: -50px;
  width: 70%;
  min-width: 600px;
}
.article-content {
  position: relative;
  margin-left: 15px;
  height: 280px;
  min-width: 300px;
  color: #666;
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
}
</style>
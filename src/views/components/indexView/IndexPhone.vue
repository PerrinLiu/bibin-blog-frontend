<template>
    <div class="index-phone">
      <el-container>
        <div style="width: 80%;position: relative;top: -30px;min-width: 280px;left: 10%;">
          <!-- 名片 -->
          <el-card class="box-card box-card1 " shadow="always">
            <div style="text-align: center;">
              <span>
                <img class="card-img" width="100px" height="100px" src="@/assets/images/defaul.jpg"
                  style="border-radius: 50%;border: 1px solid #030303;">
              </span>
              <h2 style="font-size: 30px;">Bibin</h2>
            </div>
            <div style="position:relative;text-align: center;margin-top: -10px;display: flex;  justify-content: center; /* 水平居中 */">
              <div style="float: left;">
                <h4>文章</h4>
                0
              </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div style="float: left;">
                <h4>分类</h4>
                0
              </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div style="float: left;">
                <h4>访问量</h4>
                {{ access }}
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
            <span style="font-weight: 900;"><i class="el-icon-location-outline"></i>&nbsp;标签</span>
            <el-empty style="position: relative;top: -60px;" description="暂无标签"></el-empty>
          </el-card>
  
          <el-card style="height: 300px;margin-top: 40px;">
  
          </el-card>
          <el-card style="height: 300px;margin-top: 40px;">
  
          </el-card>
          <el-card style="height: 300px;margin-top: 40px;">
  
          </el-card>
          <el-card style="height: 300px;margin-top: 40px;">
  
          </el-card>
          <el-card style="height: 300px;margin-top: 40px;">
  
          </el-card>
  
        </div>
      </el-container>
    </div>
  </template>
  
  <script>
  export default {
    props: ["access"],
    data() {
      return {
        //搜索内容
        searchText: "",
      }
    },
    mounted() {
      console.log(this.access);
  
    },
    methods: {
  
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
  </style>
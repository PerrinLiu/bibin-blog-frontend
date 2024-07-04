<template>
  <div v-loading="loading">
    <el-card class="box-card box-card1" shadow="always">
      <div style="text-align: center;">
        <h2 style="font-size: 30px;">Bibin</h2>
      </div>
      <div style="position:relative;text-align: center;margin-top: -10px;display: flex;  justify-content: center; /* 水平居中 */">
        <div style="float: left;line-height: 10px;width:80px">
          <p style="font-size: 18px;font-weight: 900;">文章</p>
          <div>{{countVo.articleCount}}</div>
        </div>
        <div style="float: left;line-height: 10px;width:80px">
          <p style="font-size: 18px;font-weight: 900;">分类</p>
          <div>{{countVo.groupCount}}</div>
        </div>
        <div style="float: left;line-height: 10px;width:80px">
          <p style="font-size: 18px;font-weight: 900;">碎片</p>
          <div>{{countVo.diaryCount}}</div>
        </div>
        <div style="float: left;line-height: 10px;width:80px">
          <p style="font-size: 18px;font-weight: 900;">访问量</p>
          <div>{{countVo.visitCount}}</div>
        </div>
      </div>
    </el-card>
    <!-- 名片 -->
    <h3>最近半年</h3>
    <div>
      <ul class="graph">
        <el-tooltip class="item" effect="light" placement="top-start" v-for="(item, index) in countVo.commitDataList" :key="index"
          :open-delay="300">
          <div slot="content" style="text-align: center">{{item.year + '-' + item.month + '-' + item.date}}<br />新增文章：{{item.number}}</div>
          <li :data-level="item.level" class="li-day" :isToday="item.isToday" @click="handleClick(item)"></li>
        </el-tooltip>
      </ul>

      <ul class="months">
        <li class="li-month" v-for="(item,index) in countVo.monthBar" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import userApi from '@/api/userApi';
export default {
  data() {
    return {
      countVo: {
        articleCount: 0,
        groupCount: 0,
        diaryCount: 0,
        visitCount: 0,
        commitDataList: [],
        monthBar: ["", "", "", "", "", "", "", "", "", "", "", ""],
      },
      loading: false
    }
  },

  methods: {
    handleClick(item) {
      console.log(item.year + "-" + item.month + "-" + item.date)
    },
    getData(day) {
      if (this.countVo.visitCount != 0) {
        this.countVo.visitCount = 0
        return
      }
      this.loading = true
      userApi.getCountData(day).then(res => {
        const data = this.ifSuccess(res);
        if (data != null) {
          this.countVo = data.data
        }
      }).finally(() => {
        setTimeout(() => {
          this.loading = false
        }, 1000);
      })
    }
  },
  mounted() {

  },
}
</script>

<style scoped>
.graph {
  display: grid;
  grid-template-columns: repeat(12, 21px); /*竖向12列，21px宽*/
  grid-template-rows: repeat(7, 21px); /*横向7列，21px宽*/
  padding-inline-start: 0px;
  grid-auto-flow: column; /*生成7*12的格子后，设置为竖向排布*/
  margin: 20px 20px 5px 20px;
}

.months {
  display: grid;
  grid-template-columns: repeat(12, 21px);
  grid-template-rows: 21px;
  font-size: 8px;
  grid-auto-flow: column;
  color: #aaa;
  padding-inline-start: 0px;
  margin: 5px 20px 5px 20px;
}

.li-month {
  display: inline-block;
}

.li-day {
  background-color: #eaeaea;
  list-style: none; /*记得把list的圆点效果去掉*/
  margin: 1.5px;
  border-radius: 3px;
}

.li-day:hover {
  /*添加hover强调效果*/
  box-shadow: 0px 0px 5px rgb(57, 120, 255);
}
.graph li[data-level='1'] {
  background-color: #b2f3a3;
}

.graph li[data-level='2'] {
  background-color: #5ef13a;
}

.graph li[data-level='3'] {
  background-color: #00c500;
}
</style>
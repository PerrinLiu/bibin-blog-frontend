<template>
  <div>
    <el-dialog title="碎片内容" :visible.sync="showDiaryOne" :width="isPhone ? '90%' : '50%'">
      <el-card class="box-card">
        <span v-if="diaryBaseOne != {}">
          <div style="width: 100%;" v-html="diaryBaseOne.diaryText">
          </div>
        </span>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-popconfirm @confirm="passDiary(diaryBaseOne.diaryId)" @cancel="rejectDiary()" title="是否通过?" cancel-button-text="驳回"
          cancel-button-type="danger" confirm-button-text="通过" confirm-button-type="success">
          <el-button slot="reference" @click="showPass=true">{{diaryBaseOne.diaryStatus == 1 ? "审核":"重新审核"}}</el-button>
        </el-popconfirm>
        <el-button @click="showDiaryOne = false" style="margin-left: 10px;">关闭</el-button>
      </div>
      <el-dialog width="30%" title="拒绝原因" :visible.sync="showReject" append-to-body>
        <el-input type="textarea" v-model="assessDiaryDto.rejectReason"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showReject = false">取 消</el-button>
          <el-button type="primary" @click="rejectDiarySubmit()">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
    <h1>碎片管理</h1>
    <el-input placeholder="请输入碎片标题" v-model="searchText" class="input-with-select" style="width:300px;margin-bottom: 30px;"
      @keyup.enter.native="search()"></el-input>
    <el-select v-model="status" clearable placeholder="审核状态" style="width: 120px;margin-left: 10px;margin-right: 10px;">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-button type="primary" @click="search()">搜索</el-button>
    <el-table :data="diaryBase" border style="width: 1100px;" height="620">
      <el-table-column prop="diaryTitle" label="标题">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="200">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="150">
      </el-table-column>
      <el-table-column prop="diaryStatus" label="审核状态" width="100" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.diaryStatus == 1">
            <el-tag type="info">未审核</el-tag>
          </span>
          <span v-if="scope.row.diaryStatus == 2">
            <el-tag type="success">通过</el-tag>
          </span>
          <span v-if="scope.row.diaryStatus == 3">
            <el-tag type="danger">驳回</el-tag>
          </span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button style="margin-right: 10px" @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-popconfirm @confirm="delDiary(scope.row.diaryId)" title="这是一段内容确定删除吗？">
            <el-button slot="reference" type="text" size="small">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:20px;display: flex;justify-content: left">
      <el-pagination background layout="prev, pager, next" :pageSize="pageSize" :currentPage="pageNum" :total="total"
        @current-change="changePage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import textApi from '@/api/textApi';
export default {
  name: 'DiaryManager',
  data() {
    return {
      total: 0,
      pageNum: 1,
      pageSize: 10,
      diaryBase: [],  //日记基础信息
      showDiaryOne: false, //单个日记内容
      diaryBaseOne: {
        diaryStatus: null
      },
      searchText: '',
      userId: null,
      status: null,
      options: [{
        value: '1',
        label: '未审核'
      }, {
        value: '2',
        label: '通过'
      }, {
        value: '3',
        label: '拒绝'
      }],
      //填写拒绝原因
      showReject: false,
      assessDiaryDto: {
        diaryId: null,
        rejectReason: null
      }

    }
  },
  computed: {
    isPhone() {
      return this.$store.getters.isPhone
    }
  },
  mounted() {
    this.getDiaryAll();
  },
  methods: {
    handleClick(row) {
      this.showDiaryOne = true;
      this.getDiaryOne(row.diaryId);
    },
    changePage(val) {
      this.pageNum = val;
      this.getDiaryAll();
    },
    // 获取日记基本信息
    getDiaryAll() {
      this.loading = true;
      textApi.getDiaryAll(this.pageSize, this.pageNum, this.userId, this.searchText, this.status).then(response => {
        const data = this.ifSuccess(response);
        if (data != null) {
          this.diaryBase = response.data.data.records;
          this.total = response.data.data.total;
          this.diaryBase.forEach(element => {
            element.createTime = element.createTime.substring(0, 16);
          });
        }
      }).finally(() => {
        this.loading = false;
      })
    },
    // 获取单个日记内容
    getDiaryOne(diaryId) {
      textApi.getDiaryOne(diaryId).then(response => {
        this.diaryBaseOne = response.data.data;
      })
    },
    search() {
      this.getDiaryAll()
    },
    delDiary(id) {
      textApi.deleteDiaryOne({
        params: {
          diaryId: id,
        }
      }).then(response => {
        this.getDiaryAll();
        this.$message({
          message: response.data.message,
          type: 'success'
        })
      })
    },
    passDiary(id) {
      console.log("通过日记" + id);
      this.assessDiaryDto.diaryId = id;
      this.assessDiaryDto.rejectReason = null;
      textApi.passDiary(this.assessDiaryDto).then(response => {
        const data = this.ifSuccess(response);
        if (data != null) {
          this.getDiaryAll();
          this.showDiaryOne = false;
          this.$message.success("已通过。已发送邮件通知用户")
        }
      })
    },
    rejectDiary() {
      console.log("拒绝 日记");
      this.showReject = true;
    },
    rejectDiarySubmit() {
      this.assessDiaryDto.diaryId = this.diaryBaseOne.diaryId
      textApi.rejectDiary(this.assessDiaryDto).then(response => {
        const data = this.ifSuccess(response);
        if (data != null) {
          this.getDiaryAll();
          this.showReject = false;
          this.showDiaryOne = false;
          this.$message.success("已驳回，成功发送邮件通知用户")
        }
      })
    }
  },
}
</script>
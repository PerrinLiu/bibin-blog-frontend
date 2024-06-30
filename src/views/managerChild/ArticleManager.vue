<template>
  <div>
    <div>
      <h1>文章管理</h1>
      <el-button @click="dialogVisible = true">新增</el-button><br /><br />
      <el-table :data="tableData" border style="width: 1100px">
        <el-table-column prop="date" label="日期" width="150">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="province" label="省份" width="120">
        </el-table-column>
        <el-table-column prop="city" label="市区" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" width="300">
        </el-table-column>
        <el-table-column prop="zip" label="邮编" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="文章发布" :visible.sync="dialogVisible" width="80%" style="margin-top:-5vh ;" :close-on-click-modal="false">
      <WangEditorView ref="insertData"></WangEditorView>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addArticle">发 布</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import articleApi from '@/api/articleApi';
import WangEditorView from '@/components/WangEditorView.vue';
export default {
  name: 'ArticleManager',
  components: {
    WangEditorView
  },
  data() {
    return {
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
        }
      ],
      dialogVisible: false,
      searchVo: {
        pageSize: 15,
        pageNum: 1,
        searchText: "",
      }
    }
  },
  mounted() {
    this.getArticle();
  },
  methods: {
    // 点击按钮，调用子组件方法添加文章
    async addArticle() {
      const data = await this.$refs.insertData.insertText();
      if (data) {
        this.dialogVisible = false
        this.getData;
      }
    },
    //获取文章
    getArticle() {
      articleApi.listArticle(this.searchVo.pageSize, this.searchVo.pageNum, this.searchVo.searchText).then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.$message({
            message: data.message,
            type: 'success'
          })
        }
      })
    },

  }
}
</script>
<template>
  <div>
    <div>
      <el-dialog title="新增标签" :visible.sync="dialogTableVisible" width="300px">
        <el-input type="text" placeholder="请输入标签名称" v-model="groupVo" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="addGroup()">确 定</el-button>
        </span>
      </el-dialog>
      <h1>文章管理</h1>
      <el-button @click="dialogVisible = true">新增</el-button>&nbsp;&nbsp;
      <el-button type="primary" style="margin-left: 10px" @click="dialogTableVisible = true">新增标签</el-button><br /><br />

      <el-table :data="tableData" border style="width: 1100px" height="620">
        <el-table-column prop="articleTitle" label="标题">
        </el-table-column>

        <el-table-column prop="des" label="描述" width="300">
          <template slot-scope="scope">
            <el-popover placement="top-start" title="文章描述" width="200" trigger="hover" :content="scope.row.des">
              <span slot="reference" style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap; "> {{ scope.row.des }}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="likeSum" label="点赞" width="80">
        </el-table-column>
        <el-table-column prop="collectionsSum" label="收藏" width="80">
        </el-table-column>
        <el-table-column prop="commentSum" label="评论" width="80">
        </el-table-column>
        <el-table-column prop="createTime" label="日期" width="120">
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small" style="margin-right: 10px">编辑</el-button>
            <el-popconfirm @confirm="deleteArticle(scope.row)" title="确定删除改文章?" onfirm-button-type="success">
              <el-button slot="reference" type="text" size="small">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:20px;display: flex;justify-content: left;">
        <el-pagination background layout="prev, pager, next" :pageSize="searchVo.pageSize" :currentPage="searchVo.pageNum" :total="total"
          @current-change="changePage">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="文章发布" :visible.sync="dialogVisible" width="80%" style="margin-top:-5vh ;" :close-on-click-modal="false">
      <WangEditorView ref="insertData" @childEvent="closeDialog" :options="groupList" :key="dialogVisible"></WangEditorView>
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
      tableData: [],
      dialogVisible: false,
      searchVo: {
        pageSize: 10,
        pageNum: 1,
        sort: "1",
      },
      total: 0,
      groupList: [],
      articleDetails: {},
      //新增标签弹窗
      dialogTableVisible: false,
      groupVo: "",
    }
  },
  mounted() {
    this.getGroup();
  },
  methods: {
    // 点击按钮，调用子组件方法添加文章
    addArticle() {
      this.$refs.insertData.insertText();
    },
    //添加文章完成后，关闭对话框
    closeDialog() {
      this.dialogVisible = false;
      this.listArticle();
    },
    //获取文章
    listArticle() {
      articleApi.listArticle(this.searchVo.pageSize, this.searchVo.pageNum, this.searchVo.sort).then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.tableData = data.data.records
          this.total = data.data.total
          this.tableData.forEach(element => {
            element.createTime = element.createTime.substring(0, 10);
          })
        }
      })
    },
    // 获取文章详情
    async getArticle(id) {
      const res = await articleApi.getArticleOne(id);
      const data = this.ifSuccess(res);
      if (data != null) {
        this.articleDetails = data.data;
        let group = this.articleDetails.articleGroupId.split(",");
        const list = [];
        group.forEach((gId) => {
          this.groupList.forEach(item => {
            if (gId == item.id) {
              list.push(item.articleType);
            }
          });
        });
        this.articleDetails.articleGroupId = list.length == 0 ? null : list;
      }
      return true;
    },
    getGroup() {
      articleApi.getGroupList().then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.groupList = data.data;
          this.$store.dispatch("setGroupList", data.data);
          this.listArticle();
        }
      })
    },
    async handleClick(row) {
      this.dialogVisible = true
      await this.getArticle(row.id);
      this.$refs.insertData.changeData(this.articleDetails);
    },
    deleteArticle(row) {
      articleApi.deleteArticle(row.id).then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.listArticle();
        }
      })
    },
    changePage(val) {
      this.searchVo.pageNum = val;
      this.listArticle();
    },
    //新增分组
    addGroup() {
      if (this.groupVo.trim() == "") {
        this.$message({
          message: '分组名称不能为空',
          type: 'warning'
        });
        return;
      }
      articleApi.addGroup(this.groupVo).then((res) => {
        const data = this.ifSuccess(res);
        if (data != null) {
          this.$message.success("新增成功");
          this.dialogTableVisible = false;
          this.groupVo = "";
          this.getGroup();
        }
      })
    }
  }
}
</script>
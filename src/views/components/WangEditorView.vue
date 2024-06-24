<template>
  <div>
    <div style="margin-bottom: 30px;">
      <div>
        <el-input style="width: 300px" placeholder="请输入标题" v-model="articleDto.title"></el-input>
        &nbsp;&nbsp;
        <el-select :multiple="true" style="width: 300px" v-model="articleDto.groupIds" placeholder="选择标签">
          <el-option v-for="item in options" :key="item.id" :label="item.articleType" :value="item.id">
          </el-option>
        </el-select>
        &nbsp;&nbsp;

      </div>
    </div>
    <div style="border: 1px solid #ccc;height: 600px;">
      <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
      <Editor style="height: 500px; overflow-y: hidden" v-model="html" :defaultConfig="editorConfig" :mode="mode" @onCreated="onCreated" />
    </div>
    <el-dialog title="文章发布" :visible.sync="dialogVisible" append-to-body width="50%" style="margin-top:-5vh ;"
      :close-on-click-modal="false">
      <el-form :model="articleDto" label-width="120px">
        <el-form-item label="标题">
          <el-input v-model="articleDto.title"></el-input>
        </el-form-item>
        <el-form-item label="描述" style="position: relative;">
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="articleDto.des">
          </el-input>
        </el-form-item>

        <div style="position:relative;height: 50px;top: -10px;">
          <el-button style="position: absolute;right: 0px;" @click="dialogVisible = false" type="primary">从文章提取</el-button>
        </div>
        <el-row>
          <el-col :span="9">
            <el-form-item label="封面">
              <el-upload class="avatar-uploader" action="/api/user/user/updateUserImg" :show-file-list="false" :headers="uploadHeaders"
                :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img width="300px" height="200px" v-if="articleDto.cover!=null && articleDto.cover!=''" :src="articleDto.cover">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            可选图片<br />
            <el-tag style="width: 210px;height: 105px;" type="success" v-for="(item,index) in images" :key="index" @click="chooseImg(item)">
              <img width="200px" height="100px" :src="item" alt="">
            </el-tag>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import Vue from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import articleApi from "@/api/articleApi";

export default Vue.extend({
  components: { Editor, Toolbar },
  data() {
    return {
      // 标签
      options: [
        {
          value: '1',
          articleType: 'java'
        }, {
          value: '2',
          articleType: 'vue'
        }
      ],
      dialogVisible: false,
      // 文章
      articleDto: {
        title: "",
        articleText: "",
        des: "",
        cover: "",
        groupIds: []
      },
      editor: null,
      html: "<p>hello</p>",
      toolbarConfig: {},
      editorConfig: { MENU_CONF: {}, laceholder: "请输入内容..." },
      mode: "default", // or 'simple'
      //上传图片时，携带请求头
      uploadHeaders: {
        // 在这里添加您的请求头信息
        'x-token': JSON.parse(localStorage.getItem('token'))
      },
      images: [],

    };
  },
  created() {
    this.editorConfig.placeholder = "请输入使用说明内容...";
    this.editorConfig.MENU_CONF["uploadImage"] = {
      timeout: 5 * 1000, // 5s
      fieldName: "image",
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Token": JSON.parse(localStorage.getItem("token")),
      },
      maxFileSize: 10 * 1024 * 1024, // 10M

      base64LimitSize: 5 * 1024, // 5kb 以下插入 base64

      onBeforeUpload(files) {
        return files; // 返回哪些文件可以上传
        // return false 会阻止上传
      },
      onProgress(progress) {
        console.log("onProgress", progress);
      },
      onSuccess(file, res) {
        console.log("onSuccess", file, res);
      },
      onFailed(file, res) {
        alert(res.message);
        console.log("onFailed", file, res);
      },
      onError(file, err, res) {
        alert(err.message);
        console.error("onError", file, err, res);
      },

      // 用户自定义上传图片
      customUpload(file, insertFn) {
        var axios = require("axios");
        var FormData = require("form-data");
        var data = new FormData();
        data.append("image", file); // file 即选中的文件
        var config = {
          method: "post",
          url: "/api/text/article/uploadImg", //上传图片地址
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Token": JSON.parse(localStorage.getItem("token")),
          },
          data: data,
        };

        axios(config)
          .then(function (res) {
            let url = res.data.data; //拼接成可浏览的图片地址
            insertFn(url, "使用说明", url); //插入图片
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    };
  },
  mounted() {
    this.getGroupList();
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    // 提取 img 标签中的 src，存入 images 列表
    extractImages() {
      // 创建一个临时的 DOM 元素来解析 HTML 内容
      const parser = new DOMParser();
      const doc = parser.parseFromString(this.articleDto.articleText, 'text/html');
      // 使用 querySelectorAll 选择所有 img 标签
      const imgTags = doc.querySelectorAll('img');
      // 提取每个 img 标签的 src 属性并存入 images 列表
      this.images = Array.from(imgTags).map(img => img.src);
    },
    //发布文章
    insertText() {
      this.dialogVisible = true;
      const editor = this.editor; // 获取 editor 实例
      if (editor == null) {
        return false;
      }
      // 调用 editor 属性和 API
      this.articleDto.articleText = editor.getHtml();
      this.extractImages();
    },
    async add() {
      console.log(this.articleDto);
      const res = await articleApi.addArticle(this.articleDto);
      const data_1 = this.ifSuccess(res);
      if (data_1 != null) {
        this.$message({
          message: data_1.message,
          type: 'success'
        });
        this.dialogVisible = false;
        return true;
      } else {
        return false;
      }
    },
    //获取分组
    getGroupList() {
      articleApi.getGroupList().then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.options = data.data;
        }
      })
    },
    // 头像上传完毕后，重新获取信息
    handleAvatarSuccess(response) {
      const data = this.ifSuccess(response);
      if (data != null) {
        this.articleDto.cover = data.data;
      }
    },
    // 上传前验证
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
      }
      return isJPG && isLt2M;
    },
    chooseImg(src) {
      this.articleDto.cover = src;
    }
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
});
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
.avatar {
  width: 300px;
  height: 200px;
  display: block;
}
::v-deep .el-tag {
  padding: 5px 10px;
}
</style>
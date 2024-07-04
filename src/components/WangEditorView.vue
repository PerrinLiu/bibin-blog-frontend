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
    <el-dialog title="文章发布" :visible.sync="dialogVisible" append-to-body width="1280px" style="margin-top:-5vh ;"
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
          <el-button style="position: absolute;right: 0px;" @click="getDes()" type="primary">从文章提取</el-button>
        </div>
        <el-row>
          <el-col :span="9">
            <el-form-item label="封面">
              <el-upload class="avatar-uploader" action="/api/text/image/uploadFile" :show-file-list="false" :headers="uploadHeaders"
                :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img width="300px" height="200px" v-if="articleDto.cover!=null && articleDto.cover!=''" :src="articleDto.cover">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="15">
            可选图片<br />
            <el-tag style="width: 220px;height: 120px;padding: 10px;margin-left: 30px;margin-top: 20px;" type="success"
              v-for="(item,index) in images" :key="index" @click="chooseImg(item)">
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
  props: ["options"],
  data() {
    return {
      dialogVisible: false,
      // 文章
      articleDto: {
        articleId: null,
        title: "",
        articleText: "",
        des: "",
        cover: "",
        groupIds: []
      },
      editor: null,
      html: "",
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
        //校验格式
        if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name)) {
          alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
          return;
        }
        var axios = require("axios");
        var FormData = require("form-data");
        var data = new FormData();
        data.append("file", file); // file 即选中的文件
        var config = {
          method: "post",
          url: "/api/text/image/uploadFile", //上传图片地址
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
  },
  methods: {
    onCreated(editor) {
      setTimeout(() => {
        this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
      }, 100);
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
      if (this.images.length > 6) {
        this.images = this.images.slice(0, 6);
      }
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
      const res = await articleApi.addArticle(this.articleDto);
      const data_1 = this.ifSuccess(res);
      if (data_1 != null) {
        this.$message({
          message: data_1.message,
          type: 'success'
        });
        this.dialogVisible = false;
        this.articleDto = {
          id: null,
          title: "",
          articleText: "",
          des: "",
          cover: "",
          groupIds: []
        }
        this.$emit("childEvent");
      }
    },
    // 封面上传完毕后
    handleAvatarSuccess(response) {
      if (response.retCode == 200) {
        this.articleDto.cover = response.data;
      } else {
        this.$message.error(response.message);
      }
    },
    // 上传前验证
    beforeAvatarUpload(file) {
      //校验格式
      if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name)) {
        this.$message.warning('图片类型必须是.gif,jpeg,jpg,png中的一种');
        return false;
      }
      //校验大小
      if (file.size > 10 * 1024 * 1024) {
        this.$message.warning('上传图片大小不能超过 10MB!');
        return false;
      }
      return true;
    },
    // 选择封面
    chooseImg(src) {
      this.articleDto.cover = src;
    },
    // 修改文章时，回显数据
    changeData(articleVo) {
      this.html = articleVo.articleText;
      this.articleDto.articleId = articleVo.id;
      this.articleDto.title = articleVo.articleTitle;
      this.articleDto.des = articleVo.des;
      this.articleDto.cover = articleVo.cover;
      const group = [];
      articleVo.articleGroupId.forEach(element => {
        this.options.forEach(item => {
          if (element == item.articleType) {
            group.push(item.id);
          }
        })
      });
      this.articleDto.groupIds = group;
    },
    // 从文章提取
    getDes() {
      const editor = this.editor; // 获取 editor 实例
      const htmlContent = editor.getHtml();
      // 创建一个 DOM 元素来解析 HTML 内容
      const div = document.createElement('div');
      div.innerHTML = htmlContent;

      // 移除所有代码块
      const codeBlocks = div.querySelectorAll('pre');
      codeBlocks.forEach(codeBlock => codeBlock.remove());

      // 获取移除代码块后的纯文本内容并去除所有空格
      let plainTextNoSpaces = div.innerText.replace(/\s+/g, '');
      if (plainTextNoSpaces.length > 150) {
        plainTextNoSpaces = plainTextNoSpaces.substring(0, 150)
      }
      this.articleDto.des = plainTextNoSpaces;
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
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
      // 文章
      articleDto: {
        title: "",
        articleText: "",
        cover: "1",
        groupIds: []
      },
      editor: null,
      html: "<p>hello</p>",
      toolbarConfig: {},
      editorConfig: { MENU_CONF: {}, laceholder: "请输入内容..." },
      mode: "default", // or 'simple'

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

    //发布文章
    insertText() {
      const editor = this.editor; // 获取 editor 实例
      if (editor == null) {
        return false;
      }
      // 调用 editor 属性和 API
      this.articleDto.articleText = editor.getHtml();
      console.log(this.articleDto);
      return articleApi.addArticle(this.articleDto).then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.$message({
            message: data.message,
            type: 'success'
          })
          return true
        } else {
          return false
        }
      })
    },
    //获取分组
    getGroupList() {
      articleApi.getGroupList().then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.options = data.data;
        }
      })
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
</style>
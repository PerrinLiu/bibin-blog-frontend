<template>
  <div style="border: 1px solid #ccc">
    <div>
      <el-input style="width: 300px" placeholder="请输入标题" v-model="title"></el-input>
      &nbsp;&nbsp;
      <el-select style="width: 100px" v-model="value" placeholder="标签">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      &nbsp;&nbsp;
      <el-button type="primary" @click="insertText">发布</el-button>
    </div>
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor style="height: 500px; overflow-y: hidden" v-model="html" :defaultConfig="editorConfig" :mode="mode"
      @onCreated="onCreated" />
  </div>
</template>


<script>
import Vue from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

export default Vue.extend({
  components: { Editor, Toolbar },
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      title: "",
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
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    //发布
    insertText() {
      const editor = this.editor; // 获取 editor 实例
      if (editor == null) {
        return;
      }
      // 调用 editor 属性和 API
      console.log(editor.getHtml());
    },
  },

  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
});
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
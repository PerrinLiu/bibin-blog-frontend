<template>
  <div>
    <div style="border: 1px solid #ccc;height: 600px;">
      <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
      <Editor style="height: 500px; overflow-y: hidden" v-model="html" :defaultConfig="editorConfig" :mode="mode" @onCreated="onCreated" />
    </div>
    <el-button plain style="position: relative;width: 100%;top: 15px;" @click="submit">提交</el-button>
    <!-- 标题 -->
    <div style="display: flex;justify-content: center;">
      <div v-if="showInput" v-loading="loading" element-loading-text="正在提交~" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="position:fixed;top:0;z-index: 9999;min-width: 1200px;width:100vw; height:100vh;background-color: rgba(0, 0, 0, 0.3);text-align: center;">
        <div style="position: relative;top: 30vh;left:38%;width:300px;height:200px;background-color: rgb(252, 252, 252);">
          <h1 style="position: relative;top:20px;color: #191919;">为小记起个标题叭</h1>

          <el-input v-model="diaryVo.diaryTitle" style="position: relative;top:20px;width:80%;"></el-input>
          <el-radio-group v-model="diaryVo.isOpen" style="position: relative;top:30px;">

            <el-radio label='0'>公开</el-radio>
            <el-radio label='1'>隐私</el-radio>
          </el-radio-group>
          <br />
          <br />
          <br />
          <br />
          <i style="font-size: 30px;cursor: pointer;" @click="showInput = false"
            class="el-icon-error"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i style="font-size: 30px;cursor: pointer;" @click="addDiary(diaryVo)" class="el-icon-success"></i>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
// 导入组件 及 组件样式
import textApi from '@/api/textApi'
export default {
  // 注册
  components: {
    Editor, Toolbar
  },
  data() {
    return {
      html: '',    // 及时转的html
      showInput: false,
      diaryVo: {
        diaryTitle: null,
        diaryText: null, // 输入的markdown
        isOpen: '0', //0代表开放
      },
      loading: false,
      editor: null,
      toolbarConfig: {
        excludeKeys: ['uploadVideo']
      },
      editorConfig: { MENU_CONF: {}, laceholder: "请输入内容..." },
      mode: "default", // or ''
    }
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
        //校验大小
        if (file.size > 3 * 1024 * 1024) {
          alert("图片大小不能超过3M");
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

  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },

    // 提交
    submit() {
      if (this.html == "<p><br></p>" || this.html.trim() == '') {
        this.$message({
          message: '日记内容不能为空',
          type: 'info'
        })
        return;
      }
      // 限制大小为1m
      if (this.html.length > 1 * 1024 * 1024) {
        this.$message({
          message: '日记大小超出限制',
          type: 'warning'
        })
        return;
      }
      this.showInput = true;
    },
    // 添加日记
    addDiary() {
      // 判断标题是否为空
      if (this.diaryVo.diaryTitle == null || this.diaryVo.diaryTitle.trim() == '') {
        this.$message({
          message: '请为日记起个名字',
          type: 'info'
        })
        return;
      }
      // 判断是公开还是隐私
      if (this.diaryVo.isOpen == '1') {
        this.diaryVo.isOpen = 1
      } else {
        this.diaryVo.isOpen = 0
      }
      // 将this.html赋值给diaryText
      // 调用 editor 属性和 API
      const editor = this.editor; // 获取 editor 实例
      if (editor == null) {
        return false;
      }
      this.diaryVo.diaryText = editor.getHtml();
      textApi.addDiary(this.diaryVo).then(response => {
        this.loading = true;
        const data = response.data;
        if (data.retCode == 200) {
          this.$message({
            message: "添加日记成功，待管理员审核",
            type: 'success',
            duration: 1000
          })
          this.loading = false;
          this.$emit('child-event');
          this.showInput = false;
          this.diaryVo = {};
        }
      }).catch(err => {
        this.loading = false;
        console.log(err);
      })

    }
  },
  mounted() {
  }
}
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
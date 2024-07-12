<template>
  <div class="danmu-container">
    <div style="height: 100vh;position: relative;z-index: 100;display: flex;justify-content: center;top: 35vh;">
      <div style="position: relative;top: -15px;">
        <el-input placeholder="快来留言！！！" v-model="msgVo.text" clearable style="width: 300px;" @focus="showBtn = true">
        </el-input>&nbsp;&nbsp;&nbsp;
        <el-button v-if="showBtn" round type="primary" style="height: 40px;" @click="addDanmu">发送</el-button>
      </div>
    </div>
    <transition-group name="danmu" tag="div">
      <div v-for="(msg, index) in messages" :key="index" class="danmu-message" :style="msg.style">
        <div style="background-color: rgba(0, 0, 0, 0.5);border-radius:20px;height: 40px;padding: 0 25px 0px 5px;">
          <div style="position: relative;top: 5px;left: 5px;width: 30px;display: inline;">
            <img :src="msg.userImg" width="30" height="30" style="border-radius: 50%;">
          </div>
          <div
            style="margin-top: 7px;font-size: 14px;height: 100%;line-height: 40px;position: relative;left: 10px;display: inline;top: -5px">
            {{ msg.text }}
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import commentApi from '@/api/commentApi';
export default {
  data() {
    return {
      //发送的弹幕
      msgVo: {
        text: "",
        userImg: this.$store.getters.userInfo == null ? require("@/assets/images/defaul.jpg") : this.$store.getters.userInfo.userImg,
      },
      showBtn: false,
      //展示的弹幕
      messages: [],
      //服务器返回的弹幕
      msgData: [],
      //定时器
      timer: null,
      //页面高度和宽度，用来计算可容纳的弹幕数量，以及弹幕的动画时间
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    };
  },
  mounted() {
    // 初始化时执行一次
    this.getMsgData();
  },
  methods: {
    // 添加弹幕
    addDanmu() {
      if (this.msgVo.text.trim() == "") {
        this.$message.warning("留言不能为空");
        return;
      }
      if (this.msgVo.text.length > 30) {
        this.$message.warning("留言不能超过30个字");
        return
      }
      // 先在本地保存
      this.msgData.push(this.msgVo);
      const right = this.windowWidth < 500 ? -60 : this.windowWidth < 1000 ? -40 : this.windowWidth < 1500 ? -30 : -20;
      this.msgVo.style = {
        right: `${right}%`,
        top: `${Math.random() * 1000}px`,
        background: `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`,
        animationDuration: this.windowWidth / 100 + 's'
      }
      this.messages.push(this.msgVo);

      //如果已经登录调用api保存
      if (this.$store.getters.user != null) {
        commentApi.addDanmu(this.msgVo).then((res) => {
          const data = this.ifSuccess(res)
          if (data != null) {
            this.$message.success("发送成功");
          }
        })
      } else {
        this.$message.warning("成功发送但未登录，将不会保存");
      }
      this.showBtn = false;
      this.msgVo = {
        text: "",
        userImg: this.$store.getters.userInfo == null ? require("@/assets/images/defaul.jpg") : this.$store.getters.userInfo.userImg,
      }
    },
    getMsgData() {
      commentApi.getDanmu().then((res) => {
        const data = this.ifSuccess(res)
        if (data != null) {
          this.msgData = data.data
          this.startRandomMessages();
        }
      })
    },
    // 添加弹幕
    addMessage() {
      //计算弹幕数量，动画时间以及弹幕的位置
      const right = this.windowWidth < 500 ? -60 : this.windowWidth < 1000 ? -40 : this.windowWidth < 1500 ? -30 : -20;  //弹幕的位置
      const length = this.windowHeight / 70;  //每行弹幕数量
      const baseTime = this.windowWidth / 100;  //每行弹幕动画时间
      let top = 20; //每行弹幕的间隔
      for (let i = 0; i < length; i++) {
        let time = Math.random() * 5 + baseTime;
        if (this.msgData.length > this.messages.length) {
          //获取服务器弹幕内容，并且添加到本地弹幕中
          const newMessage = {
            userImg: this.msgData[this.messages.length].userImg,
            text: this.msgData[this.messages.length].text,
            style: {
              right: `${right}%`,
              top: `${top}px`,
              animationDuration: `${time}s`
            }
          };
          top += 55;  //每行弹幕的间隔偏移
          this.messages.push(newMessage);
        }
      }
    },
    // 启动弹幕
    startRandomMessages() {
      this.addMessage(this.windowHeight, this.windowWidth);
      this.timer = setInterval(() => {
        if (this.msgData.length > this.messages.length) {
          this.addMessage(this.windowHeight, this.windowWidth);
        }
      }, 3500);
    },
    // 停止弹幕
    stopRandomMessages() {
      clearInterval(this.timer);
      this.timer = null;
    },
  },

  beforeDestroy() {
    this.stopRandomMessages();
  }
};
</script>

<style scoped>
.danmu-container {
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 60px;
  left: 0px;
  overflow: hidden;
  color: white;
  font-size: 20px;
}
.danmu-message {
  position: absolute;
  white-space: nowrap;
  animation: danmu-move linear infinite;
}

@keyframes danmu-move {
  to {
    right: 110%;
  }
}
</style>

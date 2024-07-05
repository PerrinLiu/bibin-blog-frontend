<template>
  <div id="app" :data-theme="curTheme">

    <router-view :data-theme="curTheme" />

    <el-button type="primary" round class="appBtn" @click="change()" :style="curTheme == 'light' ? 'background:#333' : 'background:#ddd'">
      <i :class="curTheme == 'light' ? 'el-icon-s-opportunity' : 'el-icon-moon'"
        :style="curTheme == 'light' ? 'color:#fff' : 'color:#000'"></i>
    </el-button>
  </div>
</template>


<script>
export default {
  name: 'app',
  data() {
    return {
      curTheme: 'light',
    }
  },
  methods: {
    change() {
      this.curTheme = this.curTheme === 'light' ? 'dark' : 'light'
    }
  }
}
</script>

<style lang="scss">
@import 'assets/css/theme.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
}

body {
  background-color: #83baf1;
  margin: 0;
  padding: 0;
  height: auto;
  overflow-x: hidden;
}

.appBtn {
  bottom: 15px;
  right: 1%;
  z-index: 10;
  position: fixed;
  z-index: 100;
}
</style>
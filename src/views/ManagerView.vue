<template>
  <div class="manger" style="margin: -20px; background: #fff;height: 100vh;overflow: auto;">
    <el-container>
      <el-header style="height: 30px;"></el-header>
      <el-container>
        <el-aside width="300px" style="margin-top: 100px;height: 82.5vh;">
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router>
            <el-menu-item index="/manager">
              <i class="el-icon-menu"></i>
              <span slot="title">数据概览</span>
            </el-menu-item>
            <el-menu-item index="/manager/diaryManager">
              <i class="el-icon-document"></i>
              <span slot="title">碎片</span>
            </el-menu-item>
            <el-menu-item index="/manager/articleManager">
              <i class="el-icon-setting"></i>
              <span slot="title">文章</span>
            </el-menu-item>
            <el-menu-item index="/manager/photoManager">
              <i class="el-icon-setting"></i>
              <span slot="title">照片</span>
            </el-menu-item>
            <el-menu-item index="/manager/messageManager">
              <i class="el-icon-document"></i>
              <span slot="title">评论</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>

    </el-container>

  </div>
</template>

<script>
export default {
  name: 'MangerView',
  data() {
    return {

    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.user == null || (this.user.roleName != '管理员' && this.user.roleName != '系统管理员')) {
        this.$alert('你没有权限访问此页面', '警告', {
          confirmButtonText: '确定',
          callback: () => {
            this.$router.push('/login')
          }
        });
      }
    }, 500);

  },
  methods: {
  }
}
</script>
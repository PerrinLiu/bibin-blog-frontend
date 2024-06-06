<template>
    <div class="manger" style="margin: -20px; background: #fff;">
        <el-container>
            <el-header></el-header>
            <el-container>
                <el-aside width="300px" style="margin-top: 100px;height: 82.5vh;">
                    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen()"
                        @close="handleClose()" router>
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
                        <el-submenu index="6">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>特有权限</span>
                            </template>

                            <span v-if="user != null">

                                <el-menu-item v-for="item in user.menuVos" :key="item.permissionId" index="1-1">
                                    {{ item.permissionName }}
                                </el-menu-item>
                            </span>
                        </el-submenu>
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
            return this.$store.state.user
        }
    },
    handleOpen(index) {
        console.log(index);
    },
    handleClose() {

    }
}
</script>
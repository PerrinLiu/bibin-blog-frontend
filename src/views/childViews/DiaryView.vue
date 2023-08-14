<template>
    <div class="diary-page">
        <div class="backgroundImg">
            <transition name="el-zoom-in-top">
                <div v-show="showImg" class="backgroundImg"
                    style="position: inherit;height:900px;top:-350px;background-image: url('https://llpy-blog.oss-cn-shenzhen.aliyuncs.com/background/%E8%83%8C%E6%99%AF7.webp')">
                </div>
            </transition>
            <div class="backgroundImg-text-div" style="height: 60vh;">
                <h1 class="backgroundImg-text" style="color: rgb(182, 182, 182);">小记</h1>
            </div>

        </div>

        <div class="content" style="margin-top: 50vh;display: flex;justify-content: center;">
            <div style="position: relative;width: 70vw;min-width: 1024px;">
                <el-container>
                    <!-- 头部 -->
                    <el-header id="header" style="width: 50vw;min-width: 720px;">
                        <div class="float-left" style="position:relative;left: 200px;">
                            <h3 style="color: rgb(70, 70, 70);cursor: pointer;" @click="searchMe()"><i
                                    class="el-icon-s-help"></i>&nbsp;&nbsp;只看我的</h3>
                        </div>
                        <div class="float-right" style="position: relative;top: 10px;">
                            <el-button plain @click="dialogDiary = true">添加小记</el-button>
                        </div>
                        <!-- 日记表单 -->
                        <el-dialog title="添加日记" :visible.sync="dialogDiary" width="700px" :close-on-click-modal="false">
                            <span>这是一段信息</span>
                        </el-dialog>
                    </el-header>
                    <!-- 内容 -->
                    <el-main>
                        
                    </el-main>

                </el-container>

            </div>
            <!-- 用来撑起高度 -->
            <div class="content-after" style="height: 60px;">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            // 背景图片
            showImg: false,
            // 日记表单
            dialogDiary: false,
            diaryContent: ''
        }
    },
    mounted() {
        this.showImg = true;
    }
}
</script>

<style scoped>
@import '../../assets/css/default.css';


.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
    transition: transform 1.2s;
}
</style>

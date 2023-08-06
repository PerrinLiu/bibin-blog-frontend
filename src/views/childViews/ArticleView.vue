<template>
    <div class="article-page">
        <div class="backgroundImg">
            <transition name="el-zoom-in-top">
                <div v-show="showImg" class="backgroundImg"
                    style="position: inherit;top:-280px;background-image: url('https://llpy-blog.oss-cn-shenzhen.aliyuncs.com/background/3.jpg')">
                </div>
            </transition>
            <h1 class="backgroundImg-text" style="top: 15vh;left: 46vw;color: aliceblue;">文章</h1>
        </div>

        <div class="content" style="margin-top: 50vh;">
            下滑
            <el-button @click="getImg()">获取图片</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showImg: false
        }
    },
    mounted(){
        this.showImg = true;
    }
}
</script>

<style scoped>
.article-page {
    height: 1000px;
}
.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
    transition: transform 1.2s;
}
</style>

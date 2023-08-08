<template>
    <div class="article-page">
        <div class="backgroundImg">
            <transition name="el-zoom-in-top">
                <div v-show="showImg" class="backgroundImg"
                    style="position: inherit;height:900px;top:-200px;background-image: url('https://llpy-blog.oss-cn-shenzhen.aliyuncs.com/background/%E8%83%8C%E6%99%AF10.webp')">
                </div>
            </transition>
            <h1 class="backgroundImg-text" style="top: 15vh;left: 46vw;color: aliceblue;">文章</h1>
        </div>

        <div class="content" style="margin-top: 50vh;">
            <div style="height: 1000px;"></div>
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
.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
    transition: transform 1.2s;
}
</style>

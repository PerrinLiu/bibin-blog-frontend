<template>
    <div class="photo-page">
        <div class="backgroundImg">
            <transition name="el-zoom-in-top">
                <div v-show="showImg" class="backgroundImg"
                    style="position: inherit;top:-300px;background-image: url('https://llpy-blog.oss-cn-shenzhen.aliyuncs.com/background/%E8%83%8C%E6%99%AF9.webp')">
                </div>
            </transition>
            <h1 class="backgroundImg-text" style="top: 15vh;left: 44vw;color: aliceblue;">照片墙</h1>
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

<template>
    <div class="love-page">
        <div class="backgroundImg">
            <transition name="el-zoom-in-top">
                <div v-show="showImg" class="backgroundImg"
                    style="position: inherit;height:900px;top:-200px;background-image: url('http://localhost:8080/img/%E5%AE%9D%E8%B4%9D.292eae5b.jpg')">
                </div>
            </transition>
            <div class="backgroundImg-text-div" style="height: 60vh;">
                <h1 class="backgroundImg-text" style="color: rgb(17, 13, 13);">记恋</h1>
            </div>
        </div>

        <div class="content" style="margin-top: 50vh;">
            <div style="height: 1000px;"></div>
            <!-- 用来撑起高度 -->
            <div class="content-after" style="height: 60px;">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showImg: false,

        }
    },
    mounted() {
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

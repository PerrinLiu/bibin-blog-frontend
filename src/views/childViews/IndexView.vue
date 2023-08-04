<template>
    <div class="index-page">
        <div class="div-with-lines">
            <h1 class="backgroundImg-text">Hi,Bibin!</h1>
        </div>
        <transition name="el-zoom-in-top">
            <div v-show="showImg" class="backgroundImg" :style="`background-image: url(${userImg})`">
            </div>
        </transition>

        <div class="field">
            下滑页
            <el-button @click="getImg()">获取图片</el-button>
        </div>

    </div>
</template>

<script>
import userApi from '@/api/userApi'
import ImgApi from '@/api/ImgApi'
export default {
    data() {
        return {
            userImg: '',
            showImg: false
        }
    },
    methods: {
        logout() {
            userApi.getUser().then(response => {
                console.log(response.data);
            })
        },
        getImg() {
            ImgApi.getImg().then(response => {
                const randomIndex = Math.floor(Math.random() * response.data.length);
                this.userImg = response.data[randomIndex].url;
            })
        }
    },
    mounted() {
        this.getImg();
        this.showImg = true;
    }
}
</script>

<style scoped>


.field {
    position: relative;
    margin-top: 90vh;
    height: 160vh;
    width: 100vw;
    left: -20px;
    bottom: -20px;
    background-size: cover;
    background-image: url('@/assets/images/login.jpg');
}

.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
    transition: transform 1.2s;
}
</style>

<template>
    <div class="index-page">
        <div class="div-with-lines">
            <h1 class="backgroundImg-text">Hi,Bibin!</h1>
        </div>
        <transition name="el-zoom-in-top">
            <div v-show="showImg" class="backgroundImg" :style="`background-image: url(${userImg})`">
            </div>
        </transition>


        <div class="content">
            <!-- 波浪 -->
            <div class="wave">
                <div style="width: 200%;height:100%;position: absolute;top: 20px;">
                    <div v-for="i in 20" :key="i" class="wave1">
                    </div>
                </div>

                <div style="width: 200%;height:100%;position: absolute;">
                    <div v-for="i in 20" :key="i" class="wave2">
                    </div>
                </div>
            </div>
            <div class="wave-next">
                <i class="el-icon-arrow-down"></i>
            </div>
            下滑
            <el-button @click="getImg()">获取图片</el-button>
        </div>

    </div>
</template>

<script>
import userApi from '@/api/userApi'
import ImgApi from '@/api/backgroundApi'
export default {
    data() {
        return {
            userImg: '',
            showImg: false,
            changeImg: true,
            token: null,
            waveHeight: 55, // 初始波浪高度
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
        this.token = localStorage.getItem('token');
        console.log("index:" + this.token);
        this.showImg = true;
    }
}
</script>

<style scoped>
.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
    transition: transform 1.2s;
}

.wave {
    position: absolute;
    height: 100px;
    width: 100vw;
    top: -100px;
    overflow: hidden;
}

.wave:hover {
    transition: 0.3s;
    background-color: rgba(14, 13, 13, 0.5);
}

.wave-next {
    position: absolute;
    top: -80px;
    width: 40px;
    left: 50%;
    text-align: center;
    color: black;
    font-size: 45px;
    font-weight: 900;
    cursor: pointer;
    animation: waveNext 3.5s linear infinite;
}

@keyframes waveNext {
    0% {
        transform: translateY(10px);
    }

    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(10px);
    }
}
.wave1,
.wave2 {
    float: left;
    top: 15px;
    height: 200px;
    width: 150px;
    border-radius: 50%;

}

.wave1 {
    background-color: rgba(255, 255, 255, 0.9);
    animation: waveAnimation 3.5s linear infinite;
}

.wave2 {
    position: relative;
    left: -85px;
    background-color: rgba(250, 250, 250, 0.4);
    animation: waveAnimation 2s linear infinite;
}

@keyframes waveAnimation {
    0% {
        transform: translateX(0) translateY(5px) rotate(5deg);
        /* 调整波浪的高度 */
    }

    25% {
        transform: translateX(-30%) translateY(5px) rotate(45deg);
    }

    50% {
        transform: translateX(-50%) translateY(-5px) rotate(90deg);
        /* 调整波浪的高度 */
    }

    75% {
        transform: translateX(-75%) translateY(0px) rotate(45deg);
    }

    100% {
        transform: translateX(-100%) translateY(3px) rotate(5deg);
        ;
        /* 调整波浪的高度 */
    }
}
</style>

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
                <i @click="waveNext()" class="el-icon-arrow-down"></i>
            </div>
            <div style="position: relative;top: 50px;">
                <el-container>
                    <el-aside width="400px" style="position: relative;left: 150px;">
                        <div style="width: 300px;position: relative;top: -30px;">
                            <!-- 名片 -->
                            <el-card class="box-card box-card1" shadow="always">
                                <div style="text-align: center;">
                                    <span><img class="card-img" width="100px" height="100px"
                                            src="@/assets/images/defaul.jpg" alt=""
                                            style="border-radius: 50%;border: 1px solid #030303;"></span>
                                    <h2 style="font-size: 30px;">Bibin</h2>
                                </div>
                                <div style="text-align: center;margin-top: -10px;">
                                    <div style="float: left;position: relative;left: 20px;margin-left:30px">
                                        <h4>文章</h4>
                                        0
                                    </div>
                                    <div style="float: left;position: relative;left: 20px;margin-left:30px">
                                        <h4>分类</h4>
                                        0
                                    </div>
                                    <div style="float: left;position: relative;left: 20px;margin-left:30px">
                                        <h4>访问量</h4>
                                        0
                                    </div>
                                </div>
                            </el-card>

                            <!-- 搜索框 -->
                            <el-card class="box-card box-card2" shadow="always">
                                <span style="position: relative;top: -10px;font-weight: 900;">搜搜</span>
                                <el-input placeholder="请输入内容" v-model="searchText">
                                </el-input>
                                <i style="position: absolute;top: 50px;right: 35px;font-size: 20px;cursor: pointer;"
                                    @click="search()" class="el-icon-search"></i>
                            </el-card>
                            <!-- 推荐文章 -->
                            <el-card class="box-card box-card1" shadow="always">
                                <span style="font-weight: 900;position: relative;"><i
                                        class="el-icon-reading"></i>&nbsp;推荐文章</span>
                                <el-empty style="position: relative;top: -30px;" description="博主暂无推荐"></el-empty>
                            </el-card>
                            <!-- 赞赏 -->
                            <el-card class="box-card box-card3" shadow="always">
                                <span style="font-weight: 900;"><i class="el-icon-chicken"></i>&nbsp;赞赏</span>
                                <el-empty style="position: relative;top: -60px;" description="无任何记录"></el-empty>
                            </el-card>


                            <!-- 文章分类 -->
                            <el-card class="box-card box-card3" shadow="always">
                                <span style="font-weight: 900;"><i class="el-icon-location-outline"></i>&nbsp;标签</span>
                                <el-empty style="position: relative;top: -60px;" description="暂无标签"></el-empty>
                            </el-card>



                        </div>
                    </el-aside>
                    <el-main style="position: relative;left: 200px;">
                        <div style="width: 60%;margin-top: -20px;margin-left: 70px;">
                            <el-card style="height: 300px;">

                            </el-card>
                            <el-card style="height: 300px;margin-top: 40px;">

                            </el-card>
                            <el-card style="height: 300px;margin-top: 40px;">

                            </el-card>
                            <el-card style="height: 300px;margin-top: 40px;">

                            </el-card>
                            <el-card style="height: 300px;margin-top: 40px;">

                            </el-card>
                        </div>
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
    data() {
        return {
            userImg: '',
            showImg: false,
            changeImg: true,
            token: null,
            searchText:null,
            waveHeight: 55, // 初始波浪高度
        }
    },
    methods: {

        getImg() {
            const randomIndex = Math.floor(Math.random() * 6) + 1;
            this.userImg = "https://llpy-blog.oss-cn-shenzhen.aliyuncs.com/background/背景"+randomIndex+".webp";
        },
        // 页面下滑
        waveNext() {
            const scrollDuration = 400; // 滚动总时间（毫秒）
            const scrollDistance = window.innerHeight + 4; // 滚动距离
            const startTime = performance.now(); // 开始时间
            const scrollStep = timestamp => {
                const currentTime = timestamp - startTime;
                const progress = Math.min(currentTime / scrollDuration, 1);

                window.scrollTo(0, progress * scrollDistance);
                if (currentTime < scrollDuration) {
                    requestAnimationFrame(scrollStep);
                }
            };
            requestAnimationFrame(scrollStep);
        },
        // 搜索
        search() {
            console.log(123);
        }
    },
    mounted() {
        this.getImg();
        this.token = localStorage.getItem('token');
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
    top: -70px;
    width: 40px;
    left: 50%;
    text-align: center;
    color: black;
    font-size: 55px;
    font-weight: 1200;
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
    background-color: rgb(255, 255, 255);
    animation: waveAnimation 5s linear infinite;
}

.wave2 {
    position: relative;
    left: -85px;
    background-color: rgba(255, 255, 255, 0.4);
    animation: waveAnimation 3s linear infinite;
}

@keyframes waveAnimation {
    0% {
        transform: translateX(0) translateY(0px) rotate(0deg);
        /* 调整波浪的高度 */
    }

    25% {
        transform: translateX(-25%) translateY(10px) rotate(90deg);
    }

    50% {
        transform: translateX(-50%) translateY(0px) rotate(180deg);
        /* 调整波浪的高度 */
    }

    75% {
        transform: translateX(-75%) translateY(15px) rotate(270deg);
    }

    100% {
        transform: translateX(-100%) translateY(0px) rotate(360deg);
        ;
        /* 调整波浪的高度 */
    }
}

.box-card {
    position: relative;
    margin-top: 40px;
    box-shadow: 2px -2px 5px rgba(0, 0, 0, 0.5) !important;
}

.box-card:hover {
    transform: scale(1.01);
}

.card-img:hover {
    cursor: pointer;
    transition: 0.5s;
    rotate: 360deg;
}

.box-card1 {
    height: 300px;
    background-size: 300% 300%;
    background-image: linear-gradient(90deg, #3db7f0, #8bceee, #0aa6f5);
    animation: colorChange 5s linear infinite;
}

/* 定义动画效果 */
@keyframes colorChange {
    0% {
        background-position: 0%;
    }

    25% {
        background-position: 50%;
    }

    50% {
        background-position: 100%;
    }

    75% {
        background-position: 50%;
    }

    100% {
        background-position: 0%;
    }
}

.box-card2 {
    height: 100px;
}

.box-card3 {
    height: 250px;
}
</style>

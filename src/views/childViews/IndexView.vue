<template>
    <div class="index-page  ">
        <div class="div-with-lines">
            <div class="backgroundImg-text-div">
                <span v-if="isPhone">
                    <h1 class="backgroundImg-text" style="font-size: 40px;">Hi,Bibin!</h1>
                </span>
                <span v-else>
                    <h1 class="backgroundImg-text">Hi,Bibin!</h1>
                </span>
            </div>

        </div>
        <transition name="el-zoom-in-top">
            <div v-show="showImg" class="backgroundImg" :style="`background-image: url(${userImg})`"
                style="background-position: center center;">
            </div>
        </transition>


        <div class="content item" style="position: relative;">
            <!-- 波浪 -->
            <div class="wave">
                <div style="width: 200%;height:100%;position: absolute;top: 20px;z-index: 1;">
                    <div v-for="i in 20" :key="i" class="wave1 item">
                    </div>
                </div>

                <div style="width: 200%;height:100%;position: absolute;">
                    <div v-for="i in 20" :key="i" class="wave2">
                    </div>
                </div>
            </div>
            <div class="wave-next" style="z-index: 99;">
                <i @click="waveNext()" class="el-icon-arrow-down "></i>
            </div>
            <div style="position: relative;top: 50px;">
                <span v-if="isPhone">
                    <el-container>
                        <div style="width: 80%;position: relative;top: -30px;min-width: 280px;left: 10%;">
                            <!-- 名片 -->
                            <el-card class="box-card box-card1 " shadow="always">
                                <div style="text-align: center;">
                                    <span>
                                        <img class="card-img" width="100px" height="100px"
                                            src="@/assets/images/defaul.jpg"
                                            style="border-radius: 50%;border: 1px solid #030303;">
                                    </span>
                                    <h2 style="font-size: 30px;">Bibin</h2>
                                </div>
                                <div
                                    style="position:relative;text-align: center;margin-top: -10px;display: flex;  justify-content: center; /* 水平居中 */">
                                    <div style="float: left;">
                                        <h4>文章</h4>
                                        0
                                    </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div style="float: left;">
                                        <h4>分类</h4>
                                        0
                                    </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div style="float: left;">
                                        <h4>访问量</h4>
                                        {{ access }}
                                    </div>
                                </div>
                            </el-card>

                            <!-- 搜索框 -->
                            <el-card class="box-card box-card2 item" shadow="always">
                                <span style="position: relative;top: -10px;font-weight: 900;">搜搜</span>
                                <el-input placeholder="请输入内容" v-model="searchText">
                                </el-input>
                                <i style="position: absolute;top: 52px;right: 35px;font-size: 20px;cursor: pointer;"
                                    @click="search()" class="el-icon-search"></i>
                            </el-card>
                            <!-- 推荐文章 -->
                            <el-card class="box-card box-card1" shadow="always">
                                <span style="font-weight: 900;position: relative;"><i
                                        class="el-icon-reading"></i>&nbsp;推荐文章</span>
                                <el-empty style="position: relative;top: -30px;" description="博主暂无推荐"></el-empty>
                            </el-card>
                            <!-- 赞赏 -->
                            <el-card class="box-card box-card3 item" shadow="always">
                                <span style="font-weight: 900;"><i class="el-icon-chicken"></i>&nbsp;赞赏</span>
                                <el-empty style="position: relative;top: -60px;" description="无任何记录"></el-empty>
                            </el-card>


                            <!-- 文章分类 -->
                            <el-card class="box-card box-card3 item" shadow="always">
                                <span style="font-weight: 900;"><i class="el-icon-location-outline"></i>&nbsp;标签</span>
                                <el-empty style="position: relative;top: -60px;" description="暂无标签"></el-empty>
                            </el-card>


                            <el-card style="height: 300px;margin-top: 40px;">

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
                    </el-container>
                </span>
                <span v-else>
                    <el-container>
                        <el-aside width="40%"
                            style="position: relative;display: flex;  justify-content: center; /* 水平居中 */">
                            <div style="width: 50%;position: relative;top: -30px;min-width: 280px;">
                                <!-- 名片 -->
                                <el-card class="box-card box-card1" shadow="always">
                                    <div style="text-align: center;">
                                        <span><img class="card-img" width="100px" height="100px"
                                                src="@/assets/images/defaul.jpg" alt=""
                                                style="border-radius: 50%;border: 1px solid #030303;"></span>
                                        <h2 style="font-size: 30px;">Bibin</h2>
                                    </div>
                                    <div
                                        style="position:relative;text-align: center;margin-top: -10px;display: flex;  justify-content: center; /* 水平居中 */">
                                        <div style="float: left;">
                                            <h4>文章</h4>
                                            0
                                        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <div style="float: left;">
                                            <h4>分类</h4>
                                            0
                                        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <div style="float: left;">
                                            <h4>访问量</h4>
                                            {{ access }}
                                        </div>
                                    </div>
                                </el-card>

                                <!-- 搜索框 -->
                                <el-card class="box-card box-card2 item" shadow="always">
                                    <span style="position: relative;top: -10px;font-weight: 900;">搜搜</span>
                                    <el-input placeholder="请输入内容" v-model="searchText">
                                    </el-input>
                                    <i style="position: absolute;top: 52px;right: 35px;font-size: 20px;cursor: pointer;"
                                        @click="search()" class="el-icon-search"></i>
                                </el-card>
                                <!-- 推荐文章 -->
                                <el-card class="box-card box-card1" shadow="always">
                                    <span style="font-weight: 900;position: relative;"><i
                                            class="el-icon-reading"></i>&nbsp;推荐文章</span>
                                    <el-empty style="position: relative;top: -30px;" description="博主暂无推荐"></el-empty>
                                </el-card>
                                <!-- 赞赏 -->
                                <el-card class="box-card box-card3 item" shadow="always">
                                    <span style="font-weight: 900;"><i class="el-icon-chicken"></i>&nbsp;赞赏</span>
                                    <el-empty style="position: relative;top: -60px;" description="无任何记录"></el-empty>
                                </el-card>


                                <!-- 文章分类 -->
                                <el-card class="box-card box-card3 item" shadow="always">
                                    <span style="font-weight: 900;"><i
                                            class="el-icon-location-outline"></i>&nbsp;标签</span>
                                    <el-empty style="position: relative;top: -60px;" description="暂无标签"></el-empty>
                                </el-card>



                            </div>
                        </el-aside>
                        <el-main style="position: relative;width: 60vw;">
                            <div style="width: 70%;margin-top: -20px;min-width: 600px;">
                                <el-card class="box-card item" v-for="item in 4" :key="item" style=" height: 300px;">
                                    {{ item }}
                                </el-card>
                            </div>
                        </el-main>
                    </el-container>
                </span>

            </div>
            <!-- 用来撑起高度 -->
            <div class="content-after" style="height: 60px;">

            </div>
        </div>

    </div>
</template>

<script>
import userApi from '@/api/userApi';
export default {
    data() {
        return {
            //用户头像
            userImg: '',
            //背景图片
            showImg: false,
            //搜索内容
            searchText: null,
            waveHeight: 55, // 初始波浪高度
            //是否是手机端
            isPhone: '',
            //滚动距离
            roll: '',
            access: 0, //访问量
            currentTheme: 'light'
        }
    },
    // 页面加载完成执行
    mounted() {
        //获取页面背景
        this.getImg();
        //背景图片展示
        this.showImg = true;
        // 使用窗口大小监听来更新 isMobile 值
        window.addEventListener('resize', this.updateLayout);
        this.updateLayout(); // 初始化时执行一次s
        //页面刷新时回到顶部
        this.scrollTop();
        // 获得访问量
        this.getAccess();
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    methods: {
        // 是否更改布局的判断方法
        updateLayout() {
            if (window.innerWidth <= 940) {  // 根据实际情况设置阈值
                //给未登录更新动态样式
                this.isPhone = true;
            } else {
                this.isPhone = false;
                this.roll = -5;
            }
        },
        // 获得背景图片
        getImg() {
            const randomIndex = Math.floor(Math.random() * 6) + 1;
            this.userImg = "https://llpy-blog.oss-cn-shenzhen.aliyuncs.com/background/背景" + randomIndex + ".webp";
        },
        // 页面下滑
        waveNext() {
            const scrollDuration = 400; // 滚动总时间（毫秒）
            const scrollDistance = window.innerHeight - this.roll; // 滚动距离
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
        // 回到顶部
        scrollTop() {
            const scrollDuration = 100; // 滚动总时间（毫秒）
            const scrollDistance = -window.innerHeight + 4; // 滚动距离
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
        },
        // 获得访问量
        getAccess() {
            userApi.getAccess().then(response => {
                const data = response.data.data;
                this.access = data;
            }).catch(err => {
                console.log(err);
            })
        }
    },
    beforeDestroy() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
        }
    },
}
</script>

<style lang="scss" scoped>
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
    display: flex;
    justify-content: center;
    /* 水平居中 */
    width: 100vw;
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
    background-color: rgb(250, 250, 250);
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
    border-radius: 30px;
    box-shadow: 2px 2px 6px 0.5px rgba(0, 0, 0, 0.5) !important;
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
    background-image: linear-gradient(90deg, #728086, #8bceee, #88949b);
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

<template>
    <div class="love-page">
        <div class="backgroundImg">
            <transition name="el-zoom-in-top">
                <div v-show="showImg" class="backgroundImg" style="position: inherit;height:900px;top:-200px;"
                    :style="{ 'background-image': `url(${BgImg})` }">
                </div>
            </transition>

        </div>

        <div class="backgroundImg-text-div" style="height: 0vh;position: relative;top: 22vh;">

            <h1 class="backgroundImg-text" >{{ formattedTime }}</h1>

        </div>

        <div class="content" style="margin-top: 50vh;">
            <div style="height: 1000px;">
                
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
            showImg: false,
            BgImg: require('@/assets/images/宝贝.jpg'),
            startDate: new Date('2022-09-03'), // 设置起始日期
            currentDate: new Date(), // 获取当前日期
            formattedTime: 0, // 用于存储已经过去的天数
        }
    },
    mounted() {
        this.showImg = true;
        // 计算已经过去的天数
        this.calculateElapsedTime();

        // 设置一个定时器，每秒更新一次时间
        this.timer = setInterval(this.calculateElapsedTime, 1000);
    },
    beforeDestroy() {
        // 在组件销毁前清除定时器
        clearInterval(this.timer);
    },
    methods: {
        calculateElapsedTime() {
            const startDate = this.startDate;
            const currentDate = new Date();

            const elapsedMilliseconds = currentDate - startDate;

            const millisecondsInSecond = 1000;
            const secondsInMinute = 60;
            const minutesInHour = 60;
            const hoursInDay = 24;
            const daysInYear = 365;
            const monthsInYear = 12;


            let elapsedSeconds = Math.floor(elapsedMilliseconds / millisecondsInSecond);

            const years = Math.floor(elapsedSeconds / (daysInYear * hoursInDay * minutesInHour * secondsInMinute));
            elapsedSeconds -= years * daysInYear * hoursInDay * minutesInHour * secondsInMinute;

            const months = Math.floor(elapsedSeconds / (daysInYear / monthsInYear * hoursInDay * minutesInHour * secondsInMinute));
            elapsedSeconds -= months * (daysInYear / monthsInYear) * hoursInDay * minutesInHour * secondsInMinute;

            const days = Math.floor(elapsedSeconds / (hoursInDay * minutesInHour * secondsInMinute));
            elapsedSeconds -= days * hoursInDay * minutesInHour * secondsInMinute;

            const hours = Math.floor(elapsedSeconds / (minutesInHour * secondsInMinute));
            elapsedSeconds -= hours * minutesInHour * secondsInMinute;

            const minutes = Math.floor(elapsedSeconds / secondsInMinute);

            const seconds = Math.floor(elapsedSeconds % secondsInMinute);

            const formattedTime = `${years}年${months}月${days}天${hours}:${minutes}:${seconds}`;
            
            this.formattedTime = formattedTime;
        },
    },
}
</script>

<style scoped>
.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
    transition: transform 1.2s;
}
</style>

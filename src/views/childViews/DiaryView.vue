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
                            <el-button plain @click="diaryYN()">添加小记</el-button>
                        </div>
                        <!-- 日记表单 -->
                        <el-dialog title="添加日记" :visible.sync="dialogDiary" width="900px" :close-on-click-modal="false">
                            <!-- 绑定方法 -->
                            <mark-down-view @child-event="getDiary"></mark-down-view>
                        </el-dialog>
                    </el-header>
                    <!-- 内容 -->
                    <el-main style="position: relative;height: auto;">
                        <div class="diary-container">
                            <div v-for="(column, columnIndex) in columns" :key="columnIndex" class="column" ref="myCard">
                                <el-card class="box-card color-card" v-for="o in column" :key="o.diaryId"
                                    style="min-width: 300px;">
                                    <!-- 卡片内容 -->
                                    <div class="card-content">
                                        <h2 style="position: relative;top: -20px;">{{ o.diaryTitle }}</h2>
                                        <p style="width: 96%;position: relative;top: -30px;" v-html="o.diaryText"></p>
                                        <span class="time">{{ formatDate(o.createTime) }}</span>
                                    </div>
                                </el-card>
                            </div>
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
import MarkDownView from '../component/MarkDownView';
import textApi from '@/api/textApi';
export default {
    components: {
        MarkDownView
    },
    data() {
        return {
            // 背景图片
            showImg: false,
            // 日记表单
            dialogDiary: false,
            // 日记信息
            diaryInfo: [],
            // token
            token: null,
            columns: [] // 将卡片信息分配到列中
        }
    },
    mounted() {
        this.showImg = true;
        this.token = localStorage.getItem('token');
        if (this.token !== null) {
            this.getDiary();
        }
        this.calculateColumnLayout();
        window.innerWidth = 200;
        window.addEventListener('resize', this.calculateColumnLayout);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.calculateColumnLayout);
    },
    methods: {
        getDiary() {
            textApi.getDiary().then(response => {
                this.diaryInfo = response.data.data;
                this.dialogDiary = false;
            }).catch(err => {
                console.log(err);
            })
        },
        // 如果用户没登陆，点击添加时，提示先登录
        diaryYN() {
            if (this.token == null) {
                this.$message({
                    message: "请先登录",
                    type: 'warning',
                });
            } else {
                this.dialogDiary = true;
            }
        },
        formatDate(datetimeString) {
            const date = new Date(datetimeString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        calculateColumnLayout() {
            this.columns = Array.from({ length: 3 }, () => []);
            this.diaryInfo.forEach((item, index) => {
                const columnIndex = index % 3;
                this.columns[columnIndex].push(item);
            });
        },
    },
    watch: {
        diaryInfo: {
            immediate: true,
            handler() {
                this.calculateColumnLayout();
            }
        }
    }
}
</script>

<style scoped>
@import '../../assets/css/default.css';

.diary-container {
    display: flex;
    justify-content: space-between;
    /* 在容器的两侧分布卡片，形成间距 */
    gap: 20px;
    /* 卡片之间的间距 */

}

.column {
    flex: 1;
}

.box-card {
    min-width: 300px;
    display: flex;
    flex-direction: column;
}

.color-card {
    margin-bottom: 10px;
}

.card-content {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    /* 卡片之间的纵向间距 */
}

.time {
    position: relative;
    bottom: -30px;
    /* 将时间部分置底 */
    font-weight: 600;
}

.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
    transition: transform 1.2s;
}</style>

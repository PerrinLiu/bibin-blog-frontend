<template>
    <div class="diary-page">

        <el-dialog title="碎片内容" :visible.sync="showDiaryOne" :width="isPhone ? '90%' : '50%'">
            <el-card class="box-card">
                <span v-if="diaryBaseOne != null">
                    <div style="width: 100%;" v-html="diaryBaseOne.diaryText">
                    </div>
                </span>
            </el-card>
        </el-dialog>
        <div class="backgroundImg">
            <transition name="el-zoom-in-top">
                <div v-show="showImg" class="backgroundImg"
                    style="position: inherit;height:900px;top:-100px;background-image: url('https://llpy-blog.oss-cn-shenzhen.aliyuncs.com/background/%E8%83%8C%E6%99%AF7.webp')">
                </div>
            </transition>
            <div class="backgroundImg-text-div" style="height: 60vh;">
                <h1 class="backgroundImg-text" style="color: bisque;">碎片</h1>
            </div>

        </div>

        <div class="content item" style="margin-top: 50vh;display: flex;justify-content: center;" v-loading="loading"
            element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">



            <!-- 手机端 -->
            <span v-if="isPhone">
                <div style="position: relative;width: 100%;">
                    <el-container>
                        <!-- 头部 -->
                        <el-header id="header" style="width: 50vw;">
                            <div class="float-left" style="position:relative;left: 0px;width: 150px;">
                                <h3 style="color: rgb(70, 70, 70);cursor: pointer;">
                                    <span v-if="showMe" @click="searchMe()">
                                        <i class="el-icon-s-help"></i>&nbsp;&nbsp;只看我的
                                    </span>
                                    <span v-else @click="showMe = true; getDiaryAll()">
                                        <i class="el-icon-s-help"></i>&nbsp;&nbsp;查看全部
                                    </span>
                                </h3>
                            </div>
                            <div class="float-right" style="position: absolute;top: 10px;right:100px;width: 30px;">
                                <el-button class="item" plain @click="diaryYN()">添加小记</el-button>
                            </div>
                            <!-- 日记表单 -->
                            <el-dialog title="添加日记" :visible.sync="dialogDiary" width="90vw"
                                :close-on-click-modal="false">
                                <!-- 绑定方法 -->
                                <mark-down-view @child-event="getDiaryAll"></mark-down-view>
                            </el-dialog>
                        </el-header>
                        <!-- 内容 -->
                        <el-main style="position: relative;height: auto;">
                            <span v-if="diaryBase != null">
                                <div class="diary-container">
                                    <!-- 循环遍历每一列 -->
                                    <div v-for="(column, columnIndex) in columns" :key="columnIndex" class="column"
                                        ref="myCard">
                                        <!-- 循环遍历每个卡片 -->
                                        <el-card class="box-card color-card item" :body-style="{ padding: '0px' }"
                                            v-for="o in column" :key="o.diaryId" style="min-width: 300px;">
                                            <!-- 卡片内容 -->
                                            <div class="card-content" style="margin-bottom: 0px;margin-left: 20px;">
                                                <h5 style="position: relative;height:20px;top: -3px;">{{ o.diaryTitle }}
                                                </h5>
                                                <span style="position: relative;top: -20px;font-size: 12px;"
                                                    class="time">{{ o.createTime }}&nbsp;&nbsp;&nbsp; {{ o.nickname }}
                                                    <span style="position: absolute;right: 20px;top: -25px;">
                                                        <img style="width:40px;height:40px;border-radius: 50%;"
                                                            :src="o.userImg">
                                                    </span>
                                                    <span
                                                        style="position: absolute;top:-20px;right:80px;font-size: 30px;cursor: pointer;"
                                                        @click="getDiaryOne(o.diaryId); showDiaryOne = !showDiaryOne">
                                                        <i class="el-icon-thumb"></i>
                                                    </span>
                                                </span>
                                            </div>
                                        </el-card>
                                    </div>
                                </div>
                            </span>
                            <span v-else>
                                <el-empty description="无任何数据"></el-empty>
                            </span>
                            <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
                                :current-page="pageNum" @current-change="handleCurrentChange">
                            </el-pagination>
                        </el-main>

                    </el-container>
                </div>
            </span>
            <!-- 电脑端 -->
            <span v-else>
                <div style="position: relative;width: 70vw;min-width: 1024px;min-height: 600px;">
                    <el-container>
                        <!-- 头部 -->
                        <el-header id="header" style="width: 50vw;min-width: 720px;">
                            <div class="float-left" style="position:relative;left: 200px;">
                                <h3 style="color: rgb(70, 70, 70);cursor: pointer;">
                                    <span v-if="showMe" @click="searchMe()">
                                        <i class="el-icon-s-help"></i>&nbsp;&nbsp;只看我的
                                    </span>
                                    <span v-else @click="showMe = true; getDiaryAll()">
                                        <i class="el-icon-s-help"></i>&nbsp;&nbsp;查看全部
                                    </span>

                                </h3>
                            </div>
                            <div class="float-right" style="position: relative;top: 10px;">
                                <el-button class="item" plain @click="diaryYN()">添加小记</el-button>
                            </div>
                            <!-- 日记表单 -->
                            <el-dialog title="添加日记" :visible.sync="dialogDiary" width="90vw"
                                :close-on-click-modal="false">
                                <!-- 绑定方法 -->
                                <mark-down-view @child-event="getDiaryAll"></mark-down-view>
                            </el-dialog>
                        </el-header>
                        <!-- 内容 -->
                        <el-main style="position: relative;height: auto;">
                            <span v-if="diaryBase == null">
                                <el-empty description="无任何数据"></el-empty>
                            </span>
                            <span v-else>
                                <div class="diary-container">
                                    <!-- 循环遍历每一列 -->
                                    <div v-for="(column, columnIndex) in columns" :key="columnIndex" class="column"
                                        ref="myCard">
                                        <!-- 循环遍历每个卡片 -->
                                        <el-card class="box-card color-card item" v-for="o in column" :key="o.diaryId"
                                            style="min-width: 300px;">
                                            <!-- 卡片内容 -->
                                            <div class="card-content">
                                                <h3 style="position: relative;top: -20px;">{{ o.diaryTitle }} </h3>
                                                <span style="position: absolute;right: 0px;">
                                                    <img style="width:80px;height: 80px;border-radius: 50%;"
                                                        :src="o.userImg">
                                                </span>
                                                <span
                                                    style="position: absolute;top:20px;right:130px;font-size: 36px;cursor: pointer;"
                                                    @click="getDiaryOne(o.diaryId); showDiaryOne = !showDiaryOne">
                                                    <i class="el-icon-thumb"></i>
                                                </span>
                                                <span class="time">
                                                    {{ o.createTime }}&nbsp;&nbsp;&nbsp;&nbsp;{{ o.nickname }}
                                                </span>
                                            </div>
                                        </el-card>
                                    </div>
                                </div>
                            </span>


                            <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
                                :current-page="pageNum" @current-change="handleCurrentChange">
                            </el-pagination>
                        </el-main>

                    </el-container>
                </div>
            </span>

            <!-- 用来撑起高度 -->
            <div class="content-after" style="height: 60px;">
                <!-- 隐藏 不要让数据清空 -->
                <span style="display: none;">{{ user }}{{ isPhone }} {{ yes(isPhone) }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import MarkDownView from '../components/MarkDownView';
import textApi from '@/api/textApi';
export default {
    components: {
        MarkDownView
    },
    data() {
        return {
            total: 0,
            pageNum: 1,
            pageSize: 30,
            // 背景图片
            showImg: false,
            // 日记表单
            dialogDiary: false,
            // token
            token: null,
            columns: [], // 将日记信息分配到列中，每列是一个数组
            loading: false,  //加载
            column: null,  //布局列
            diaryBase: null,  //日记基础信息
            diaryBaseOne: null,
            flag: null,  //标记是否为电脑端布局
            showMe: true,  //只看我的
            showDiaryOne: false, //单个日记内容
        }
    },
    mounted() {
        // 开始时显示背景图片，让他实现有动画
        this.showImg = true;
        // 获得token
        this.token = localStorage.getItem('token');
        this.getDiaryAll();
        //监听浏览器窗口大小发生
        window.addEventListener('resize', this.calculateColumnLayout);
    },
    beforeDestroy() {
        // 组件销毁时移除监听事件
        window.removeEventListener('resize', this.calculateColumnLayout);
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        isPhone() {
            return this.$store.state.isPhone;
        },
    },
    methods: {
        // 判断isPhone得到值之后，当前是手机端还是电脑端，选择调用哪个方法
        yes(isPhone) {
            // 不为空且不相等时，改变赋值，重新调用方法
            if (isPhone != null) {
                if (this.flag != isPhone) {
                    this.flag = isPhone;

                }
            }
        },
        // 获取所有日记
        getDiaryAll() {
            this.dialogDiary = false;
            this.getDiaryBase();

        },
        handleCurrentChange(val) {
            this.pageNum = val;
            if (!this.showMe) {
                this.getDiaryBaseByUser();
            } else {
                this.getDiaryAll();
            }
        },

        // 获取日记基本信息
        getDiaryBase() {
            this.loading = true;
            textApi.getDiaryBase(this.pageSize, this.pageNum).then(response => {
                this.diaryBase = response.data.data.records;
                this.total = response.data.data.total;
                this.diaryBase.forEach(element => {
                    element.createTime = element.createTime.substring(0, 10);
                });
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                this.loading = false;
            })
        },
        // 获取单个用户日记基本信息
        getDiaryBaseByUser() {
            textApi.getDiaryBaseByUser(this.pageSize, this.pageNum).then(response => {
                this.diaryBase = response.data.data.records;
                this.total = response.data.data.total;
                this.diaryBase.forEach(element => {
                    element.createTime = element.createTime.substring(0, 10);
                });
            }).catch(err => {
                console.log(err);

            }).finally(() => {
                this.loading = false;
            })
        },
        // 获取当前用户日记
        searchMe() {
            if (!this.isLogin()) {
                return;
            }
            this.showMe = false;
            this.loading = true;

            this.getDiaryBaseByUser();


        },
        // 获取单个日记内容
        getDiaryOne(diaryId) {
            textApi.getDiaryOne({
                params: {
                    diaryId: diaryId
                }
            }).then(response => {
                this.diaryBaseOne = response.data.data;
            }).catch(err => {
                console.log(err);
            })
        },
        // 判断用户是否登录
        isLogin() {
            if (this.token == null) {
                this.$message({
                    message: "请先登录",
                    type: 'warning',
                });
                return false;
            }
            return true;
        },
        // 如果用户没登陆，点击添加时，提示先登录
        diaryYN() {
            if (!this.isLogin()) return;
            this.dialogDiary = true;
        },
        // 计算卡片列的布局
        calculateColumnLayout() {
            this.column = this.isPhone ? 1 : 3;
            this.columns = Array.from({ length: this.column }, () => []); // 创建三个空列
            const diary = this.diaryBase;
            if (diary != null) {
                diary.forEach((item, index) => {
                    const columnIndex = index % this.column; // 根据索引确定列位置
                    if (this.columns[columnIndex] != undefined) {
                        this.columns[columnIndex].push(item); // 将卡片信息放入对应的列
                    }

                });
            }

        },

    },
    watch: {
        // 当卡片信息改变时重新计算布局
        diaryInfo: {
            immediate: true, // 立即触发
            handler() {
                this.calculateColumnLayout();
            }
        },
        diaryBase: {
            immediate: true, // 立即触发
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
    /* 列均匀分配剩余空间 */
}

.box-card {
    min-width: 300px;
    display: flex;
    flex-direction: column;
}

img {
    width: 100%;
}

.box-card {
    width: 100% !important;
}

.color-card {
    margin-bottom: 10px;
}

.card-content {
    display: flex;
    position: relative;
    flex-direction: column;
    margin-bottom: 20px;
    /* 卡片之间的纵向间距 */
}

.time {
    font-size: 14px;
    bottom: -25px;
    position: relative;
    /* 将时间部分置底 */
    font-weight: 600;
}

.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
    transition: transform 1.2s;
}
</style>

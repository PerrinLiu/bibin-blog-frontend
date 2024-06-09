<template>
    <div class="article-page">
        <div class="backgroundImg">
            <transition name="el-zoom-in-top">
                <div v-show="showImg" class="backgroundImg"
                    style="position: inherit;height:900px;background-image: url('https://llpy-blog.oss-cn-shenzhen.aliyuncs.com/background/%E8%83%8C%E6%99%AF10.webp')">
                </div>
            </transition>
            <div class="backgroundImg-text-div" style="height: 60vh;">
                <h1 class="backgroundImg-text" style="color: rgb(17, 13, 13);">文章</h1>
            </div>
        </div>

        <div class="content item center" style="margin-top: 50vh;">
            <div class="content-inner">
                <div class="center">
                    <el-input v-model="searchVo.title" placeholder="请输入内容" suffix-icon="el-icon-search"
                        style="width: 50%;"></el-input>
                </div>
                <div>
                    <el-row>
                        <el-col :span="8" v-for="(o) in  12 " :key="o">
                            <el-card :body-style="{ padding: '0px' }" style="margin: 20px;">
                                <img width="100%" height="250px" style="cursor: pointer;"
                                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                    class="image" @click="goDetail()">
                                <div style="padding: 20px;">
                                    <span>好吃的汉堡</span>
                                    <div style="margin-top: 10px;position: relative;">
                                        <span style="font-size: 16px;color: #ccc;">2020-10-10</span>
                                        <span style="font-size: 16px;position: absolute;right: 0px;">
                                            <i class="el-icon-star-on">&nbsp;6</i>&nbsp;&nbsp;
                                            <i class="el-icon-view">&nbsp;952</i>&nbsp;&nbsp;
                                            <i class="el-icon-s-comment">&nbsp;23</i>
                                        </span>
                                    </div>
                                    <div style="margin-top: 10px">
                                        <el-tag style="margin-right:16px" v-for="item in 3" :key="item">
                                            标签{{ item }}
                                        </el-tag>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
                <div style="margin-top:20px;display: flex;justify-content: center;">
                    <el-pagination background layout="prev, pager, next" :pageSize="searchVo.pageSize"
                        :currentPage="searchVo.pageNum" :total="total" @current-change="changePage">
                    </el-pagination>
                </div>
                <!-- 用来撑起高度 -->
                <div class=" content-after" style="height: 60px;">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showImg: false,
            searchVo: {
                pageSize: 15,
                pageNum: 1,
                title: "",
            },
            total: 50,
        }
    },
    mounted() {
        this.showImg = true;
    },
    methods: {
        goDetail() {
            console.log("点击了卡片, 跳转到详情页");
        },
        changePage(val) {
            this.searchVo.pageNum = val;
            this.getArticle();
        },
        getArticle() {
            console.log("搜索文章", this.searchVo);
        }
    }
}
</script>

<style scoped>
.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
    transition: transform 1.2s;
}

.content-inner {
    width: 70%;
    min-width: 1024px;
    margin-top: 50px;
}

.center {
    display: flex;
    justify-content: center;
}
</style>

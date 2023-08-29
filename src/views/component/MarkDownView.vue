<template>
    <div>
        <span v-if="isPhone">
            <div>
                <mavon-editor v-model="diaryVo.diaryText" ref="md" @change="change" style="min-height: 500px" />

                <el-button plain style="position: relative;width: 100%;top: 15px;" @click="submit">提交</el-button>

                <!-- 标题 -->
                <div style="display: flex;justify-content: center;">
                    <div v-if="showInput" v-loading="loading" element-loading-text="正在提交~"
                        element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
                        style="position:fixed;top:0;left: ;z-index: 9999;min-width: 1200px;width:100vw; height:100vh;background-color: rgba(0, 0, 0, 0.3);text-align: center;">
                        <div
                            style="position: relative;top: 30vh;left:38%;width:300px;height:200px;background-color: rgb(252, 252, 252);">
                            <h1 style="position: relative;top:20px;color: #191919;">为小记起个标题叭</h1>

                            <el-input v-model="diaryVo.diaryTitle"
                                style="position: relative;top:20px;width:80%;"></el-input>
                            <el-radio-group v-model="diaryVo.isOpen" style="position: relative;top:30px;">

                                <el-radio label='0'>公开</el-radio>
                                <el-radio label='1'>隐私</el-radio>
                            </el-radio-group>
                            <br />
                            <br />
                            <br />
                            <br />
                            <i style="font-size: 30px;cursor: pointer;" @click="showInput = false"
                                class="el-icon-error"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <i style="font-size: 30px;cursor: pointer;" @click="addDiary(diaryVo)"
                                class="el-icon-success"></i>
                        </div>

                    </div>
                </div>

            </div>
        </span>
        <span v-else>
            <mavon-editor v-model="diaryVo.diaryText" ref="md" @change="change" style="min-height: 500px" />

            <el-button plain style="position: relative;width: 100%;top: 15px;" @click="submit">提交</el-button>

            <!-- 标题 -->
            <div style="display: flex;justify-content: center;">
                <div v-if="showInput" v-loading="loading" element-loading-text="正在提交~"
                    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
                    style="position:fixed;top:0;left: ;z-index: 9999;min-width: 1200px;width:100vw; height:100vh;background-color: rgba(0, 0, 0, 0.3);text-align: center;">
                    <div
                        style="position: relative;top: 30vh;left:42%;width:300px;height:200px;background-color: rgb(252, 252, 252);">
                        <h1 style="position: relative;top:20px;color: #191919;">为小记起个标题叭</h1>



                        <el-input v-model="diaryVo.diaryTitle" style="position: relative;top:20px;width:80%;"></el-input>
                        <el-radio-group v-model="diaryVo.isOpen" style="position: relative;top:30px;">

                            <el-radio label='0'>公开</el-radio>
                            <el-radio label='1'>隐私</el-radio>
                        </el-radio-group>
                        <br />
                        <br />
                        <br />
                        <br />
                        <i style="font-size: 30px;cursor: pointer;" @click="showInput = false"
                            class="el-icon-error"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <i style="font-size: 30px;cursor: pointer;" @click="addDiary(diaryVo)" class="el-icon-success"></i>
                    </div>

                </div>
            </div>

        </span>

    </div>
</template>
  
  
  
<script>
// 导入组件 及 组件样式
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import textApi from '@/api/textApi'
export default {
    // 注册
    components: {
        mavonEditor,
    },
    data() {
        return {
            html: '',    // 及时转的html
            showInput: false,
            diaryVo: {
                diaryTitle: null,
                diaryText: null, // 输入的markdown
                isOpen: '0', //0代表开放
            },
            loading: false,
        }
    },
    computed: {
        isPhone() {
            return this.$store.state.isPhone;
        }
    },
    methods: {
        // 所有操作都会被解析重新渲染
        change(value, render) {
            // render 为 markdown 解析后的结果[html]
            this.html = render;

            if (this.html.includes('<img')) {
                // 如果包含图片，限制图片大小再发请求
                this.html = this.html.replace(/<img/g, '<img style="width:47%;margin-top:20px;margin-left:2%"');
            }
            if (this.html.length > 5 * 1024 * 1024) {
                this.$message({
                    message: '日记大小超出限制',
                    type: 'warning'
                })
            }
        },
        // 提交
        submit() {
            if (this.diaryVo.diaryText == null || this.diaryVo.diaryText.trim() == '') {
                this.$message({
                    message: '日记内容不能为空',
                    type: 'info'
                })
                return;
            }
            // 限制大小为5m
            if (this.html.length > 5 * 1024 * 1024) {
                this.$message({
                    message: '日记大小超出限制',
                    type: 'warning'
                })
                return;
            }
            console.log(this.diaryVo.diaryText);
            this.showInput = true;
        },
        // 添加日记
        addDiary() {
            // 判断标题是否为空
            if (this.diaryVo.diaryTitle == null || this.diaryVo.diaryTitle.trim() == '') {
                this.$message({
                    message: '请为日记起个名字',
                    type: 'info'
                })
                return;
            }
            // 判断是公开还是隐私
            if(this.diaryVo.isOpen =='1'){
                this.diaryVo.isOpen = 1
            }else{
                this.diaryVo.isOpen = 0
            }
            // 将this.html赋值给diaryText 
            this.diaryVo.diaryText = this.html;

            textApi.addDiary(this.diaryVo).then(response => {
                this.loading = true;
                const data = response.data;
                if (data.retCode == 200) {
                    this.$message({
                        message: data.message,
                        type: 'success',
                        duration: 1000
                    })
                    this.loading = false;
                    this.$emit('child-event');
                    this.showInput = false;
                    this.diaryVo = {};
                }
            }).catch(err => {
                this.loading = false;
                console.log(err);
            })
        }
    },
    mounted() {

    }
}
</script>
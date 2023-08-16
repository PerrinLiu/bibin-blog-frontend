<template>
    <div>
        <mavon-editor v-model="diaryVo.diaryText" ref="md" @change="change" style="min-height: 500px" />

        <el-button plain style="position: relative;width: 100%;top: 15px;" @click="submit">提交</el-button>

        <!-- 标题 -->
        <div style="display: flex;justify-content: center;">
            <div v-if="showInput"
                style="position:fixed;top:0;left: ;z-index: 9999;min-width: 1200px;width:100vw; height:100vh;background-color: rgba(0, 0, 0, 0.3);text-align: center;">
                <div style="position: relative;top: 30vh;left:42%;width:300px;height:150px;background-color: rgb(252, 252, 252);">
                    <h1 style="position: relative;top:20px;color: #191919;">为小记起个标题叭</h1>
                    <el-input v-model="diaryVo.diaryTitle" style="position: relative;top:20px;width:80%;"></el-input>
                    <br/>
                    <br/>
                    <br/>
                        <i style="font-size: 30px;cursor: pointer;" @click="showInput = false" class="el-icon-error"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <i style="font-size: 30px;cursor: pointer;" @click="addDiary(diaryVo)" class="el-icon-success"></i>
                </div>

            </div>
        </div>



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
            diaryVo:{
                diaryTitle: '',
                diaryText: '', // 输入的markdown
            }
        }
    },
    methods: {
        // 所有操作都会被解析重新渲染
        change(value, render) {
            // render 为 markdown 解析后的结果[html]
            this.html = render;
        },
        // 提交
        submit() {
            this.showInput = true;
            console.log(this.html);
        },
        // 添加日记
        addDiary(){
            console.log(this.diaryVo);
            this.diaryVo.diaryText = this.html;
            textApi.addDiary(this.diaryVo).then(response =>{
                console.log(this.diaryVo);
                const data = response.data;
                if(data.retCode == 200){
                    this.$message({
                        message: data.message,
                        type:'success',
                        duration:1000
                    })
                    this.$emit('child-event');
                    this.showInput = false;
                    this.diaryVo = {};

                }
            }).catch(err =>{
                console.log(err);
            })
        }
    },
    mounted() {

    }
}
</script>
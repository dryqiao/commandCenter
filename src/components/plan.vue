<template>
    <div class="scenery">
        <div v-for="(item,index) in matrixData" :key="index" class="box" @mouseover="closebtn=index" @mouseleave="closebtn=null">
            <Button :class="{hide:closebtn !== index}" shape="circle" icon="close" class="btn_close" type="error" @click.stop="handlerDelete(index)">
            </Button>
            <planBox :oMatrixData="item"></planBox>
        </div>
    </div>
</template>
<script>
import planBox from './plan_box'
import api from '../api/api'
import axios from 'axios'
export default {
    data() {
        return {
            matrixData: [],
            closebtn: false,
            isShow: false,
            modal1: false,
            oFormData: {
                sceneName: '',
                rowNum: '',
                columnNum: '',
                sceneId: null
            },
            ruleValidate: {
                sceneName: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                rowNum: [
                    { required: true, type: "number", message: '行数不能为空', trigger: 'blur' },
                ],
                columnNu: [
                    { required: true, type: "number", message: '列数不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        // 获取布景
        api.getScheme()
            .then(res => {
                this.matrixData = res.r
                console.log(this.matrixData)
            }, err => {
                console.log('err', err)
            })
            .catch(error => {
                console.log('error', error)
            })
    },
    methods: {
        handlerDelete(index) {
            console.log(this.matrixData[index].sceneId)
            //调用删除接口
            api.deleteScheme({
                sceneId: this.matrixData[index].sceneId
                })
                .then(res => {
                    this.matrixData.splice(index, 1)
                })
        }
    },
    components: {
        planBox 
    }
}
</script>

<style lang="less">
.scenery {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 20px;
    background: #ffffff;
    .box {
        position: relative;
        height: 200px;
        .btn_close {
            position: absolute;
            right: -5px;
            top: -5px;
            z-index: 999;
            &.hide {
                display: none
            }
        }
    }
}
</style>
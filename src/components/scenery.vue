<template>
    <div class="scenery">
        <div v-for="(item,index) in matrixData" :key="index" class="box" @mouseover="closebtn=index" @mouseleave="closebtn=null">
            <Button :class="{hide:closebtn !== index}" type="primary" 
                shape="circle" 
                icon="close" 
                class="btn_close" 
                @click.stop="handlerDelete(index)">
            </Button>
            <matrixBox :oMatrixData="item"></matrixBox>
        </div>

        <div class="add">
            <Button class="add_btn" type="primary" @click="isShow = true">
                <Icon type="plus-round"></Icon>
            </Button>
            <div class="text">
                <span>新建布景</span>
            </div>
        </div>
        <Modal v-model="isShow" title="新建布景" @on-ok="handlerSubmit">
            <Form :model="oFormData" :rules="ruleValidate" label-position="left" :label-width="60">
                <FormItem label="名称" prop="sceneName">
                    <Input v-model="oFormData.sceneName" autofocus></Input>
                </FormItem>
                <FormItem label="行数" prop="rowNum">
                    <Input v-model="oFormData.rowNum" number></Input>
                </FormItem>
                <FormItem label="列数" prop="columnNum">
                    <Input v-model="oFormData.columnNum" number></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
import matrixBox from './matrix_box'
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
        api.getScene()
            .then(res => {
                this.matrixData = res.r
                console.log(this.matrixData)
            },err => {
                console.log('err',err)
            })
            .catch(error => {
                console.log('error',error)
            })
    },
    methods: {
        handlerSubmit() {
            api.insertScene(Object.assign({}, this.oFormData))
                .then(res => {
                    this.matrixData = res.r
                    console.log(this.matrixData)
                    //深拷贝，否则会双向绑定
                    // this.matrixData.push(Object.assign({}, this.oFormData))
                    //清空弹窗
                    this.oFormData = {
                        name: '',
                        row: '',
                        col: '',
                    }
                })
                .catch(error => {
                    console.log('error:',error)
                })
        },
        handlerDelete(index) {
            console.log(this.matrixData[index].sceneId)
            //调用删除接口
            api.deleteScene({
                    sceneId:this.matrixData[index].sceneId
                })
                .then(res=>{
                    this.matrixData.splice(index, 1)
                })
        }
    },
    components: {
        matrixBox
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
    .add {
        height: 200px;
        margin-left: 20px;
        .text {
            text-align: center;
        }
        .add_btn {
            width: 180px;
            height: 180px;
            span {
                font-size: 64px;
            }
        }
    }
}
</style>
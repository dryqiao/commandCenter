<template>
    <div class="scenery">
        <div v-for="(item,index) in matrixData" :key="index" class="box"
            @mouseover="closebtn=index"
            @mouseleave="closebtn=null"
            @click="matrixClickHandler(index)">
            <Button :class="{hide:closebtn !== index}" 
                type="primary" shape="circle" icon="close" 
                class="btn_close" @click="handlerDelete(index)">
            </Button>
            <matrixBox :oFormData="item"></matrixBox>
        </div>

        <div class="add">
            <Button class="add_btn" type="primary" @click="isShow = true">
                <Icon type="plus-round"></Icon>
            </Button>
            <div class="text"><span>新建布景</span></div>
        </div>
        <Modal v-model="isShow" title="新建布景" @on-ok="handlerSubmit">
            <Form :model="formData" label-position="left" :label-width="40">
                <FormItem label="名称">
                    <Input v-model="formData.name" autofocus></Input>
                </FormItem>
                <FormItem label="行数">
                    <Input v-model="formData.row" number></Input>
                </FormItem>
                <FormItem label="列数">
                    <Input v-model="formData.col" number></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
import matrixBox from './matrixBox'
export default {
    data() {
        return {
            matrixData: [],
            closebtn: false,
            isShow: false,
            modal1: false,
            formData: {
                name: '',
                row: '',
                col: '',
            }
        }
    },
    methods: {
        handlerSubmit() {
            //深拷贝，否则会双向绑定
            this.matrixData.push(Object.assign({}, this.formData))
            this.formData = {
                name: '',
                row: '',
                col: '',
            }
        },
        handlerDelete(index) {
            this.matrixData.splice(index, 1)
        },
        matrixClickHandler(index) {
            localStorage.setItem('layout',this.matrixData[index])
            this.$router.push('/layout')
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
            &.hide{
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
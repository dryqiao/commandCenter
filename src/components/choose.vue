<template>
    <div class="scenery">
        <div v-for="(item,index) in matrixData" :key="index" class="box"
            @mouseover="closebtn=index"
            @mouseleave="closebtn=null">
            <matrixBox :oMatrixData="item" @click.stop="matrixClickHandler(index)"></matrixBox>
        </div>
    </div>
</template>
<script>
import matrixBox from './matrix_box'
export default {
    data() {
        return {
            matrixData: [{
                name: 'aaa',
                row: 3,
                col: 3,
            }],
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
    created() {
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
            this.$router.push('/layout/config')
        }
    },
    components: {
        matrixBox
    }
}
</script>

<style lang="less" scoped>
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
            &.hide{
                display: none
            }
        }
    }
}
</style>
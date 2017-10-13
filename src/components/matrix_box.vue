<template>
    <div class="matrix-box">
        <div class="table_box" @click="matrixClickHandler">
            <table>
                <tr v-for="(tr,index) in oMatrixData.rowNum" :key="index">
                    <td v-for="(td,index) in oMatrixData.columnNum" :key="index"></td>
                </tr>
            </table>
        </div>
        <div class="text">
            <Input type="text" v-model="oMatrixData.sceneName" @on-blur="blurHandler"></Input>
        </div>
    </div>
</template>
<script>
    import api from '../api/api'
export default {
    data() {
        return {
            oldName : ''
        }
    },
    props: {
        oMatrixData: Object
    },
    created() {
        console.log(this.oMatrixData)
        this.oldName = this.oMatrixData.sceneName
    },
    mounted(){
    },
    methods: {
        matrixClickHandler() {
            console.log(this.oMatrixData)
            let aoMatrix = []
            //创建初始二维数组
            for(let i = 0;i<this.oMatrixData.rowNum;i++){
                aoMatrix[i] = new Array
                for(let j = 0;j<this.oMatrixData.columnNum;j++){
                    aoMatrix[i].push({
                        "mix": false,
                        "content": "",
                        "col": 0,
                        "row": 0,
                        "choosed":false,
                        "hasChild":false,
                        "img" : '',
                        "list":[]
                    })
                }
            }
            localStorage.setItem('layout', JSON.stringify(aoMatrix))
            localStorage.setItem('sceneId', this.oMatrixData.sceneId)
            this.$router.push('/layout/config')
        },
        blurHandler:function() {
           
            if(this.oMatrixData.sceneName != this.oldName){
                 console.log(this.oMatrixData)
                //修改名称
                api.updateScene(this.oMatrixData)
                    .then(res => {
                            //记录当前名称
                            this.oldName = this.oMatrixData.sceneName
                    })
                    .catch(err => console.log('matrixbox',err))
            }
        }
    }
}
</script>

<style lang="less">
@border : 1px solid #cccccc;
.matrix-box {
    width: 180px;
    height: 180px;
    margin-left: 20px;
    cursor: pointer;
    .table_box {
        height: 100%;
        border: 8px solid #cccccc;
    }
    table {
        width: 100%;
        height: 100%;
        border-top: @border;
        border-left: @border;
        border-collapse: collapse;
        tr {
            td {
                border-right: @border;
                border-bottom: @border;
            }
        }
    }
    .text {
        margin-top: 5px;
        text-align: center;
        input {
            text-align: center;
            border: none;
        }
    }
    &:hover .table_box,
    &:hover>table,
    &:hover td {
        border-color: #3f8faa;
    }
}
</style>
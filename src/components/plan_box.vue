<template>
    <div class="matrix-box">
        <div class="table_box" @click="matrixClickHandler">
            <table>
                <tr v-for="(tr,index) in JSON.parse(oMatrixData.schemeJson)" :key="index">
                    <td v-for="(td,colIndex) in tr" 
                        v-show="!td.mix"
                        ref="td"
                        :key="colIndex"
                        :rowspan="td.row"
                        :colspan="td.col"
                        :style="tdSize">
                            <Cell v-if="!choose" :td="td"></Cell>
                        </td>
                </tr>
            </table>
        </div>
        <div class="text">
            <Input v-if="!choose" type="text" v-model="oMatrixData.schemeName" @on-blur="blurHandler"></Input>
        </div>
    </div>
</template>
<script>
import Cell from './plan_cell'
import api from '../api/api'
export default {
    data() {
        return {
            oldName : ''
        }
    },
    props: {
        oMatrixData: Object,
        choose: Boolean//为true表示是从布局管理进来的
    },
    components : {
        Cell
    },
    created() {
        if(this.oMatrixData.schemeName){
            this.oldName = this.oMatrixData.schemeName
        }
    },
    computed: {
        tdSize :function() {
            return {
                height: 164 / 3 +'px',
                width: 164 / 3 +'px'
            }
        }
    },
    methods: {
        matrixClickHandler() {
            if(this.choose){
                localStorage.setItem('layout', JSON.stringify(this.oMatrixData))
                localStorage.setItem('sceneId', this.oMatrixData.sceneId)
                this.$router.push('/layout/config')
            }else {
                this.$router.push({
                    path:'/layout/config',
                    query:{
                        schemeId : this.oMatrixData.schemeId
                }})
            }
        },
        blurHandler:function() {
            if(this.oMatrixData.schemeName != this.oldName){
                 console.log(this.oMatrixData)
                //修改名称
                api.updateScheme(this.oMatrixData)
                    .then(res => {
                            //记录当前名称
                            this.oldName = this.oMatrixData.schemeName
                    })
                    .catch(err => console.log('matrixbox',err))
            }
        },
        setSize: function() {
            this.$refs.td.forEach(_td => {
               _td.style.height = _td.clientHeight + 'px'
                _td.style.width = _td.clientWidth + 'px'
            })
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
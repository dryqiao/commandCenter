<template>
    <div class="matrix-box">
        <div class="table_box" @click="matrixClickHandler">
            <table>
                <tr v-for="(tr,index) in oMatrixData || 3" :key="index">
                    <td v-for="(td,index) in tr.col || 3" :key="index"></td>
                </tr>
            </table>
        </div>
        <div class="text">
            <Input type="text" v-model="oMatrixData.name"></Input>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    props: {
        oMatrixData: Array
    },
    created() {
    },
    mounted(){
        console.log(this.oMatrixData)
    },
    methods: {
        matrixClickHandler() {
            console.log(this.oMatrixData)
            localStorage.setItem('layout', JSON.stringify(this.oMatrixData))
            this.$router.push('/layout/config')
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
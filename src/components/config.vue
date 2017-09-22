<template>
    <div class="matrix_config">
        <div class="matrix_wrapper">
            <table>
                <tr v-for="(tr,rowIndex) in oConfigData.row || 3" :key="rowIndex">
                    <td v-for="(td,colIndex) in oConfigData.col || 3" :key="colIndex" @click="tdClickHandler(rowIndex,colIndex)" :class="{choose:nIndex == 1 + rowIndex * (oConfigData.col)+colIndex}"></td>
                </tr>
            </table>
        </div>
        <div class="btn_wrapper">
            <Button size="large">上墙</Button>
            <Button size="large">保存</Button>
        </div>

        <div class="table_wrapper">
            <Table stripe :columns="aoColumns" :data="aoTableData"></Table>
        </div>
    </div>
</template>
<script>
import matrixBox from './matrix_box'
export default {
    data() {
        return {
            oConfigData: {},
            nIndex: 0,
            aoColumns: [
                {
                    title: '序号',
                    key: 'index',
                    type: 'index'
                }, {
                    title: '功能名称',
                    key: 'module'
                }, {
                    title: '交互方式',
                    key: 'mutual'
                }, {
                    title: '周期(S)',
                    key: 'cycle'
                }, {
                    title: '顺序',
                    key: 'queue',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    size: 'small',
                                    icon: 'arrow-up-c'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                    }
                                }
                            }),
                            h('Button', {
                                props: {
                                    size: 'small',
                                    icon: 'arrow-down-c'
                                },
                                on: {
                                    click: () => {
                                    }
                                }
                            })
                        ]);
                    }
                }, {
                    title: '删除',
                    key: 'acttion',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            aoTableData: [{
                module: "OEE",
                mutual: "轮播",
                cycle: "60"
            }]
        }
    },
    props: {
    },
    created() {
        this.oConfigData = JSON.parse(localStorage.getItem('layout'))
    },
    methods: {
        tdClickHandler: function(rowIndex, colIndex) {
            let _index = rowIndex * (this.oConfigData.col) + colIndex + 1
            if (this.nIndex == _index) {
                this.nIndex = 0
            } else {
                this.nIndex = _index
            }
        }
    },
    computed: {
    },
    components: {
        matrixBox
    }
}
</script>

<style lang="less" scoped>
@border : 1px solid #3f91a9;
.matrix_config {
    width: 100%;
    height: 100%; // display: flex;
    // flex-direction: row;
    // flex-wrap: wrap;
    padding: 20px;
    background: #ffffff;
    .matrix_wrapper {
        width: 70%;
        height: 70%;
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
                    background: #ebf5f7;
                    &.choose {
                        background: #a6ccd7
                    }
                }
            }
        }
    }
    .btn_wrapper {
        width: 70%;
        margin-top: 20px;
        text-align: center;
    }
    .table_wrapper {
        margin-top: 20px;
        .ivu-table-header th{
            background-color: #3f8faa;
        }
    }
}
</style>
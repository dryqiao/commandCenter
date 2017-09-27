<template>
    <div class="matrix_config">
        <!-- 配置矩阵 -->
        <div class="matrix_wrapper">
            <table>
                <template v-for="(tr,rowIndex) in oConfigData">
                    <tr :key="rowIndex">
                        <td v-for="(td,colIndex) in tr.col" 
                        v-if="!td.mix"
                        :key="colIndex"
                        :rowspan="td.row"
                        :colspan="td.col"
                        :class="{mix:td.mix}">
                            <Cell 
                            :td="td" 
                            :rowIndex="rowIndex" 
                            :colIndex="colIndex"
                            :size="tr.size"
                            v-on:tdClick="tdClickHandler"></Cell>
                        </td>
                    </tr>
                </template>

            </table>
        </div>
        <!-- 模块列表 -->
        <div class="moudule_wrapper">
            <Menu>
                <Submenu name="oMouduleData.name" v-for="(oMouduleData,index) in aoModuleData" :key="index">
                    <template slot="title">
                        <Icon type="ios-paper"></Icon>
                        {{oMouduleData.text}}
                    </template>
                    <MenuItem v-for="(oList,index1) in oMouduleData.lists" :key="index1" :name="oList.name||0"> {{oList.text}}
                    <Input v-if="oList.input" v-model="url"></Input>
                    <Upload v-if="oList.upload" action="//jsonplaceholder.typicode.com/posts/">
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                    </Upload>
                    </MenuItem>
                </Submenu>

            </Menu>
        </div>
        <!-- 右键列表 -->
        <div v-show="rightList" class="event_list" @mouseover="listOnBlur" @mouseout="listBlurHandler">
            <ul>
                <li @click.stop="mixHandler">合并
                    <Icon type="chevron-right"></Icon>
                </li>
                <li @click.stop="reductHandler">还原
                    <Icon type="chevron-right"></Icon>
                </li>
                <li @click.stop="splitHandler">拆分
                    <Icon type="chevron-right"></Icon>
                </li>
            </ul>
        </div>
        <!-- 按钮 -->
        <div class="btn_wrapper">
            <Button size="large">上墙</Button>
            <Button size="large">保存</Button>
        </div>
        <!-- 表格 -->
        <div class="table_wrapper">
            <Table stripe :columns="aoColumns" :data="aoTableData"></Table>
        </div>
    </div>
</template>
<script>
    import Cell from './cell'

export default {
    data() {
        return {
            url:'',
            rightList: true,
            oConfigData: {},
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
            }],
            aoModuleData: [
                {
                    name: 'feature',
                    text: '功能',
                    lists: [{
                        name: 'production',
                        text: '生产进度'
                    }, {
                        name: 'mass',
                        text: '产量'
                    }]
                },
                {
                    name: 'diy',
                    text: '自定义功能',
                    lists: [{
                        name: 'url',
                        text: `URL:`,
                        input: true
                    }, {
                        name: 'img',
                        text: `图片:`,
                        upload: true
                    }]
                },
                {
                    name: 'selected',
                    text: '已选功能',
                    lists: [{

                    }]
                }
            ],
            mixSelectedTds: [],
            aoMixData: []
        }
    },
    props: {
    },
    created() {
        this.oConfigData = JSON.parse(localStorage.getItem('layout'))
        
    },
    mounted() {
        let _size = this.oConfigData[0].size[0]
        for(var i = 0;i < _size; i++){
             this.aoMixData[i] = new Array;
        }
    },
    methods: {
        tdClickHandler:function(_data){
            this.aoMixData[_data[0]].push(_data[1])
        },
        tdRightClickHandler: function(rowIndex, colIndex) {
            console.log('you')
            let _index = rowIndex * (this.oConfigData.col) + colIndex + 1
            this.rightList = true
        },
        listOnBlur: function() {
            this.rightList = true
        },
        listBlurHandler: function() {
        },
        mixHandler: function() {
            let singleIndex = null//记录单行时行索引值
            // 获取非空的行
            let rowList=this.aoMixData.filter((_value,index)=>{
                if(_value.length>0){
                    singleIndex = index
                    return true
                }
            })
            if(rowList.length === 1 && rowList[0].length>1){
                // 单行多个格子合并
                rowList[0].sort().forEach((_num,index)=>{
                    let _mix = this.oConfigData[singleIndex].col[_num]
                    console.log(_num,index)
                    if(index === 0){
                        _mix.mix = false
                        _mix.col = rowList[0].length
                    }else{
                        _mix.mix = true//true表示被融合了，隐藏掉
                        _mix.col = 0
                    }
                });
            }

        },
        reductHandler: function() {

        },
        splitHandler: function() {

        }
    },
    computed: {
    },
    components: {
        Cell
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
        width: 60vw;
        height: 60vh;
        table {
            width: 100%;
            height: 100%;
            border-top: @border;
            border-left: @border;
            border-collapse: collapse;
            tr {
                td {
                    position: relative;
                    border-right: @border;
                    border-bottom: @border;
                    background: #ebf5f7;
                    .tag {
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        width: 0px;
                        height: 0px;
                        border-bottom: 30px solid transparent;
                        border-left: 30px solid #3f91a9;
                        span {
                            margin-left: -28px;
                            color: #ffffff;
                            font-size: 18px;
                        }
                    }
                    &.choose {
                        background: #a6ccd7
                    }
                }
            }
        }
    }
    .moudule_wrapper {
        position: absolute;
        right: 20px;
        top: 10px;
        width: 20vw;
        height: 70vh;
        border: 1px solid #cccccc;
    }
    .btn_wrapper {
        width: 60vw;
        margin-top: 20px;
        text-align: center;
    }
    .table_wrapper {
        margin-top: 20px;
        .ivu-table-header th {
            background-color: #3f8faa;
        }
    }
    .event_list {
        position: absolute;
        top: 100px;
        left: 100px;
        border: 1px solid #cccccc;
        li {
            width: 100px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            cursor: pointer;
            &:hover {
                color: #ffffff;
                background: #3f91a9;
            }
        }
    }
}
</style>
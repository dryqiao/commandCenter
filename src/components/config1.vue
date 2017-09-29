<template>
    <div class="matrix_config">
        <!-- 配置矩阵 -->
        <div class="matrix_wrapper">
            <table @mousedown="mouseDownHandler"
                    @mousemove="mouseMoveHandler"
                    @mouseup="mouseUpHandler">
                <template v-for="(tr,rowIndex) in oConfigData">
                    <tr :key="rowIndex">
                        <td v-for="(td,colIndex) in tr" 
                        v-if="!td.mix"
                        :key="colIndex"
                        :rowspan="td.row"
                        :colspan="td.col"
                        :class="{mix:td.mix}">
                            <Cell 
                            :td="td" 
                            :rowIndex="rowIndex" 
                            :colIndex="colIndex"
                            :size="tr.length"
                            v-on:tdClick="tdClickHandler"
                            v-on:tdMouseDown="tdMouseDownHandler"
                            v-on:tdMouseUp="tdMouseUpHandler"></Cell>
                        </td>
                    </tr>
                </template>

            </table>
        </div>
        <div class="dashed_box" :style="styleBox" :class="{hide:box_hide}"></div>

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
            box_hide: true,
            styleBox:{
                left:'',
                top:'',
                width:'',
                height:''
            },
            url:'',
            rightList: true,
            oConfigData: [],
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
            aoMixData: [],
            firstTd:[],//起始点
            nowSelectedTds:[],//框选中的格子
            nowSelectedSize:[],//框选的尺寸
            nowFirstTd:[],//框选的起始点
        }
    },
    props: {
    },
    created() {
        this.oConfigData = JSON.parse(localStorage.getItem('layout'))
    },
    mounted() {
        let _size = this.oConfigData.length
        for(var i = 0;i < _size; i++){
             this.aoMixData[i] = new Array
             this.nowSelectedTds[i] = new Array
        }
    },
    methods: {
        mouseDownHandler:function(){
            this.styleBox.left = event.clientX+'px'
            this.styleBox.top = event.clientY+'px'
        },
        mouseMoveHandler:function(){
            this.box_hide = false
            if(event.which == 1){
                this.styleBox.width = event.clientX - Number(this.styleBox.left.split('px')[0]) + 'px'
                this.styleBox.height = event.clientY - Number(this.styleBox.top.split('px')[0]) + 'px'
            }
        },
        mouseUpHandler:function(){
            this.box_hide = false
            this.styleBox.width = '0px'
            this.styleBox.height = '0px'
        },
        tdClickHandler:function(_data){
            // if(_data[0]){
            //     this.aoMixData[_data[1]].push(_data[2])
            // }else{
            //     // 取消选中，删掉
            //     this.aoMixData[_data[1]].splice(this.aoMixData[_data[1]].indexOf(_data[2]),1)
            // }
        },
        tdMouseUpHandler:function(_data){
            let _rowIndex =_data[0] < this.firstTd[0]?_data[0]:this.firstTd[0],
                _colIndex = _data[1] < this.firstTd[1]?_data[1]:this.firstTd[1],
                _row = (_data[0] - this.firstTd[0]) > 0?_data[0] - this.firstTd[0]:this.firstTd[0] - _data[0],
                _col = (_data[1] - this.firstTd[1]) > 0?_data[1] - this.firstTd[1]:this.firstTd[1] - _data[1]
            this.nowSelectedSize=[_row+1,_col+1]
            this.nowFirstTd=[_rowIndex,_colIndex]
            this.nowSelectedTds.forEach((_a,index)=> {
                
                _a.forEach(_b=>{
                    this.oConfigData[index][_b].choosed = false
                })
            })
            for(var i = 0;i < this.nowSelectedTds.length; i++){
                this.nowSelectedTds[i] = new Array
            }
            for(let i = 0;i<_row+1;i++){
                for(let j = 0;j<_col+1;j++){
                    // if(this.nowSelectedTds[i+_rowIndex].indexOf(j+_colIndex) === -1){
                        this.nowSelectedTds[i+_rowIndex].push(j+_colIndex)
                        this.oConfigData[i+_rowIndex][j+_colIndex].choosed = true
                    // }
                }
            }
            console.log(this.nowSelectedTds)
        },
        tdMouseDownHandler:function(_data){
            this.firstTd = _data
            if(this.aoMixData[_data[0]].indexOf(_data[1]) === -1){
                this.aoMixData[_data[0]].push(_data[1])
            }
        },
        listOnBlur: function() {
            this.rightList = true
        },
        listBlurHandler: function() {
        },
        mixHandler: function() {
            for(let i=0;i < this.nowSelectedSize[0];i++){
                for(let j = 0;j<this.nowSelectedSize[1];j++){
                    let _mix = this.oConfigData[this.nowFirstTd[0]+i][this.nowFirstTd[1]+j]
                    if(i === 0 && j=== 0){
                        _mix.mix = false
                        _mix.row = this.nowSelectedSize[0]
                        _mix.col = this.nowSelectedSize[1]
                        _mix.choosed = true
                    }else{
                        _mix.mix = true//true表示被融合了，隐藏掉
                        _mix.col = 0
                        _mix.row = 0
                        _mix.choosed = false
                    }
                }
            }


            // let singleIndex = null//记录单行时行索引值
            // // 获取非空的行
            // let rowList=this.aoMixData.filter((_value,index)=>{
            //     if(_value.length>0){
            //         singleIndex = index
            //         return true
            //     }
            // })
            // if(rowList.length === 1 && rowList[0].length>1){
            //     // 单行多个格子合并
            //     rowList[0].sort().forEach((_num,index)=>{
            //         let _mix = this.oConfigData[singleIndex].col[_num]
            //         console.log(_num,index)
            //         if(index === 0){
            //             _mix.mix = false
            //             _mix.col = rowList[0].length
            //         }else{
            //             _mix.mix = true//true表示被融合了，隐藏掉
            //             _mix.col = 0
            //         }
            //     });
            // }

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
    .dashed_box{
        position: fixed;
        border: 1px dotted #cccccc;
        &.hide{
            display: none;
        }
    }
}
</style>
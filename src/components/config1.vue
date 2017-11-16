<template>
    <div class="matrix_config">
        <!-- 配置矩阵 -->
        <div class="matrix_wrapper">
            <table @mousedown="mouseDownHandler"
                    @mousemove="mouseMoveHandler"
                    @mouseup="mouseUpHandler">
                <template v-if="oConfigData.length > 0" v-for="(tr,rowIndex) in oConfigData">
                    <tr :key="rowIndex">
                        <td v-for="(td,colIndex) in tr" 
                        v-show="!td.mix"
                        ref="td"
                        :key="colIndex"
                        :rowspan="td.row"
                        :colspan="td.col"
                        :style="{
                            width:'10px',
                            height:'100px'}">
                            <Cell 
                            :td="td" 
                            :rowIndex="rowIndex" 
                            :colIndex="colIndex"
                            :size="tr.length"
                            v-on:tdMouseDown="tdMouseDownHandler"
                            v-on:tdMouseUp="tdMouseUpHandler"
                            v-on:tdRightClick="tdRightClickHandler"></Cell>
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
                    <MenuItem v-for="(oList,index1) in oMouduleData.lists" :key="index1" :name="oList.name||0"
                     @dblclick.stop.native="mouduleDbClickHandler(oList)"> {{oList.text}}
                    <Input v-if="oList.input" v-model="url"></Input>
                    <Upload v-if="oList.upload" action="//jsonplaceholder.typicode.com/posts/">
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                    </Upload>
                    </MenuItem>
                </Submenu>
            </Menu>
        </div>
        <!-- 右键列表 -->
        <div v-show="rightList" 
        class="event_list" 
        :style="rightStyle"
        @mouseover="listOnBlur" 
        @mouseout="listBlurHandler">
            <ul>
                <li @click.stop="mixHandler">合并<Icon type="chevron-right"></Icon></li>
                <li @click.stop="reductHandler">还原<Icon type="chevron-right"></Icon></li>
                <!-- <li @click.stop="splitHandler">拆分<Icon type="chevron-right"></Icon></li> -->
            </ul>
        </div>
        <!-- 按钮 -->
        <div class="btn_wrapper">
            <label for="">预案名称:</label>
            <Input v-model="schemeName" placeholder="请输入..." style="width: 200px"></Input>
            <Button size="large">上墙</Button>
            <Button size="large" @click="saveHandler">保存</Button>
        </div>
        <!-- 表格 -->
        <div class="table_wrapper">
            <Table stripe :columns="aoColumns" :data="aoTableData"></Table>
        </div>
    </div>
</template>
<script>
    import Cell from './cell'
    import api from '../api/api'
export default {
    data() {
        return {
            schemeName: '',
            box_hide: true,
            styleBox:{
                left:'',
                top:'',
                width:'',
                height:''
            },
            rightStyle: {
                left: '',
                top: '',
            },
            url:'',
            rightList: false,
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
                                        let index = params.index//当前表格行点击的数据索引
                                        if(index > 0 && index <= this.aoTableData.length){
                                            let  _index = this.nowSelectedTds[0],//当前选中框的行列索引
                                                _list = this.oConfigData[_index[0]][_index[1]].list,//当前框的list
                                                tmp = _list[index]//存储当前数据用于交换
                                            //调换顺序
                                            this.$set(_list,index,_list[index - 1])
                                            this.$set(_list,index - 1,tmp)
                                        }
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
                                        let index = params.index//当前表格行点击的数据索引
                                        if(index >= 0 && index < this.aoTableData.length - 1){
                                            let 
                                                _index = this.nowSelectedTds[0],//当前选中框的行列索引
                                                _list = this.oConfigData[_index[0]][_index[1]].list,//当前框的list
                                                tmp = _list[index]//存储当前数据用于交换
                                            //调换顺序
                                            this.$set(_list,index,_list[index + 1])
                                            this.$set(_list,index + 1,tmp)
                                        }
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
                                        let _index = this.nowSelectedTds[0]
                                        this.oConfigData[_index[0]][_index[1]].list.splice(params.index,1)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            aoTableData: [],
            aoModuleData: [
                {
                    name: 'feature',
                    text: '功能',
                    lists: [{
                        name: 'production',
                        text: '生产进度',
                        src: require('../assets/img/production.png')
                    }, {
                        name: 'mass',
                        text: '生产产量',
                        src: require('../assets/img/mass.png')
                    }, {
                        name: 'oee',
                        text: '全局设备效率',
                        src: require('../assets/img/oee.png')
                    }, {
                        name: 'order',
                        text: '异常事件',
                        src: require('../assets/img/order.png')
                    }, {
                        name: 'state',
                        text: '设备状态分布',
                        src: require('../assets/img/state.png')
                    }, {
                        name: 'reason',
                        text: '不合格品原因分析',
                        src: require('../assets/img/reason.png')
                    }, {
                        name: 'stock',
                        text: '库存',
                        src: require('../assets/img/stock.png')
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
            mixedTd:[],
            sceneId: null,
            schemeId: null,
            tag: 0 //1表示更新，0表示新建
        }
    },
    beforeRouteLeave(to, from, next) {
        this.$Modal.confirm({
            title: '警告',
            content: '<p>确认离开？</p>',
            onOk: () => {
                next()
            },
            onCancel: () => {
                next(false)
            }
        });
    },
    created() {
        if(this.$route.query.schemeId >= 0){
            // 预案点击进入
            api.getScheme({
                schemeId : this.$route.query.schemeId
            }).then( res => {
                res = res.r[0]
                this.tag = 1
                this.oConfigData = JSON.parse(res.schemeJson)
                this.schemeName = res.schemeName
                this.schemeId = res.schemeId
                this.sceneId = res.sceneId
            })
        }else{
            //布局点击进入
            this.sceneId = localStorage.getItem('sceneId')
            //获取空二维数组
            let storageData = JSON.parse(localStorage.getItem('layout'))
            this.oConfigData = JSON.parse(storageData.schemeJson)
        }
    },
    mounted() {
    },
    updated() {
    },
    methods: {
        mouseDownHandler:function(){
            //记录选择框初始位置
            this.styleBox.left = event.clientX+'px'
            this.styleBox.top = event.clientY+'px'
        },
        mouseMoveHandler:function(){
            // console.log('move',event)
            //鼠标左键点击拖动框选事件
            if(event.which == 1){
                //设置选择框可见和长宽
                this.box_hide = false
                this.styleBox.width = event.clientX - Number(this.styleBox.left.split('px')[0]) + 'px'
                this.styleBox.height = event.clientY - Number(this.styleBox.top.split('px')[0]) + 'px'
            }else{
                this.box_hide = true
            }
        },
        mouseUpHandler:function(){
            //隐藏选择框
            this.box_hide = true
            this.styleBox.width = '0px'
            this.styleBox.height = '0px'
        },
        // 右键点击事件
        tdRightClickHandler:function(_data){
            let [row,col,index,size] = _data,
                nowTd = this.nowSelectedTds[0],
                tag = false//右键点击在选中的多个格子内，则标记为true
            if(this.nowSelectedTds.length >= 1){
                this.nowSelectedTds.forEach(td => {
                    if(td[0] === row && td[1] ===col){
                        tag = true
                    }
                })
            }
            // console.log('right')
            if(tag){
                this.rightList = true
                // 获取当前格子DOM
                let _td = this.$refs.td[index - 1]
                // 设置列表位置
                this.rightStyle.left = event.offsetX + _td.offsetLeft + 'px'
                this.rightStyle.top = event.offsetY + _td.offsetTop + 'px'
            }
        },
        tdMouseUpHandler:function(_data){
            // 当前只有一个格子选中，且点击在它上面
            if(this.firstTd.join(',') === _data.join(',') && this.nowSelectedTds.length === 1 && this.nowSelectedTds[0].join(',') === _data.join(',')){
                console.log(this.nowSelectedTds)
                this.oConfigData[_data[0]][_data[1]].choosed = false
                 this.aoTableData = []
                 this.nowSelectedTds = []
            }else{
            // 若选中的单元格中包含融合块
                // 获取起点与尺寸
                let _rowIndex =_data[0] < this.firstTd[0]?_data[0]:this.firstTd[0],
                    _colIndex = _data[1] < this.firstTd[1]?_data[1]:this.firstTd[1],
                    _row = (_data[0] > this.firstTd[0])?_data[0] - this.firstTd[0]:this.firstTd[0] - _data[0],
                    _col = (_data[1] > this.firstTd[1])?_data[1] - this.firstTd[1]:this.firstTd[1] - _data[1],
                    colList = [],
                    rowList = []
                rowList.push(_rowIndex)
                colList.push(_colIndex)
                this.nowSelectedSize=[_row+1,_col+1]
                this.nowFirstTd=[_rowIndex,_colIndex]
                //取消选中
                this.nowSelectedTds.forEach((_a,index)=> {
                    this.oConfigData[_a[0]][_a[1]].choosed = false
                })
                //清空选中数组
                this.nowSelectedTds = []
                //选中操作
                for(let i = 0;i<_row+1;i++){
                    for(let j = 0;j<_col+1;j++){
                        let _td = this.oConfigData[i+_rowIndex][j+_colIndex]
                        // if(_td.hasChild === true){
                        //     rowList.push(i + _rowIndex)
                        //     rowList.push(i + _rowIndex + _td.row - 1)
                        //     colList.push(j + _colIndex)
                        //     colList.push(j + _colIndex +_td.col - 1)
                        // }
                            this.nowSelectedTds.push([i+_rowIndex,j+_colIndex])
                            _td.choosed = true
                    }
                }

//                 this.nowFirstTd = [rowList.sort()[0],colList.sort()[0]]

// this.nowSelectedSize = [rowList.sort()[rowList.length - 1] - rowList.sort()[0],colList.sort()[colList.length - 1] - colList.sort()[0]]


                console.log('up',rowList,colList)
                //修改表格数据
                this.aoTableData = this.oConfigData[_rowIndex][_colIndex].list
            }

            console.log('up-nowSelectedTds:',this.nowSelectedTds)
        },
        tdMouseDownHandler:function(_data){
            this.firstTd = _data
            // if(this.aoMixData[_data[0]].indexOf(_data[1]) === -1){
            //     this.aoMixData[_data[0]].push(_data[1])
            // }
        },
        listOnBlur: function() {
            this.rightList = true
        },
        listBlurHandler: function() {
            // setTimeout(()=>{
            this.rightList = false
            // },500)
        },
        mixHandler: function() {
            if(this.nowSelectedTds.length > 1){
                for(let i=0;i < this.nowSelectedSize[0];i++){
                    for(let j = 0;j<this.nowSelectedSize[1];j++){
                        let _mix = this.oConfigData[this.nowFirstTd[0]+i][this.nowFirstTd[1]+j]
                        if(i === 0 && j=== 0){
                            _mix.mix = false
                            _mix.row = this.nowSelectedSize[0]
                            _mix.col = this.nowSelectedSize[1]
                            _mix.choosed = true
                            _mix.hasChild = true
                            // console.log(_mix.size)
                        }else{
                            _mix.mix = true//true表示被融合了，隐藏掉
                            _mix.col = 0
                            _mix.row = 0
                            _mix.choosed = false
                            _mix.hasChild = false
                        }
                    }
                }
                this.nowSelectedTds = []
                this.nowSelectedTds.push(this.nowFirstTd)
                console.log(this.nowSelectedTds)
            }
        },
        reductHandler: function() {
            console.log('reduct')
            // 当前选中格子数为1
            if(this.nowSelectedTds.length === 1){
                let _td = this.nowSelectedTds[0],
                    gz = this.oConfigData[_td[0]][_td[1]],
                    _row = gz.row,
                    _col = gz.col
                // 有融合子元素时才进行还原
                if(gz.hasChild){
                    for(let i=0;i < _row;i++){
                        for(let j = 0;j < _col;j++){
                            let _mix = this.oConfigData[_td[0]+i][_td[1]+j]
                            console.log(_mix)
                                _mix.mix = false
                                _mix.col = 0
                                _mix.row = 0
                                _mix.choosed = false
                                _mix.hasChild = false
                        }
                    }
                    this.nowFirstTd = []
                    this.nowSelectedSize = []
                    this.nowSelectedTds = []
                }
            }
        },
        splitHandler: function() {

        },
        mouduleDbClickHandler: function(oList){
            if(this.nowSelectedTds.length>0 && oList.src){
                let _td = this.nowSelectedTds[0]
                this.oConfigData[_td[0]][_td[1]].img = oList.src
                //更新表格数据
                this.oConfigData[_td[0]][_td[1]].list.push({
                    module: oList.text,
                    mutual: "轮播",
                    cycle: "60"
                })
            }
        },
        saveHandler: function(){
            if(this.tag === 0){
                api.insertScheme({
                    schemeName: this.schemeName,
                    sceneId: this.sceneId,
                    schemeJson: JSON.stringify(this.oConfigData)
                }).then(res => {
                    this.$Message.success('保存成功');
                    //新建成功后，将标记改为1
                    this.tag = 1
                })
                .catch(error => {
                    console.log('insert failed')
                })
            }else {
                api.updateScheme({
                    schemeName: this.schemeName,
                    schemeId: this.schemeId,
                    schemeJson: JSON.stringify(this.oConfigData)
                }).then(res => {
                    this.$Message.success('保存成功');
                    console.log(res)
                    // this.$router.push('/plan')
                })
                .catch(error => {
                    console.log('insert failed')
                })
            }
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
        background: #ffffff;
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
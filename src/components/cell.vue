<template>
    <div :class="classes" 
        ref="cell" 
        @mousedown="mouseDownHandler"
        @mouseup="mouseUpHandler"
        @contextmenu.prevent="rightClickHandler"
        >
        <img v-if="td.img.length > 0" :src="td.img" alt="#" :style="imgStyle">
        <div class="tag">
            <span>{{cellIndex}}</span>
        </div>
    </div>
</template>
<script>

export default {
    name: 'TableCell',
    components: {},
    props: {
        td: Object,
        size: Number,//列尺寸
        rowIndex: Number,
        colIndex: Number
    },
    data() {
        return {
            cellIndex: null,
            imgStyle: {
                height: '',
            },
        };
    },
    mounted() {
        this.cellIndex = this.size * this.rowIndex + this.colIndex + 1
    },
    updated(){
        // console.log(this.td)
    },
    computed: {
        classes() {
            return [
                'cell',
                {
                    [`choosed`]: this.td.choosed,
                }
            ];
        }
    },
    watch: {
        'td.img':{
            handler:function(val,oldVal){
                // console.log(val)
                // 监听td.img，修改图片高度
                // this.imgStyle.height = this.$refs.cell.clientHeight + 'px'
                
                // this.imgStyle.width = this.$refs.cell.clientWidth + 'px'
            },
            deep:true
        }
    },
    methods: {
        // clickHandler:function(){
        //     console.log('click td')
        //     this.$emit('tdClick',[this.rowIndex,this.colIndex])
        // },
        mouseDownHandler:function(){
            if(event.which === 1){
                console.log('mousedown td')
                this.$emit('tdMouseDown',[this.rowIndex,this.colIndex])
            }
            
        },
        mouseUpHandler:function(){
            if(event.which === 1){
                console.log('mouseup td')
                this.$emit('tdMouseUp',[this.rowIndex,this.colIndex])
            }
        },
        rightClickHandler:function(){
            console.log('right td')
            this.$emit('tdRightClick',[this.rowIndex,this.colIndex,this.cellIndex,this.size])
        }
    },
    created() {
    },
    updated() {

    }
};
</script>
<style lang="less" scoped>
@border : 1px solid #3f91a9;
.cell {
    position: relative;
    width: 100%;
    height: 100%;
    background: #ebf5f7;
    overflow: hidden;
    vertical-align: middle;
    font-size: 0px;
    img{
        width: 100%;
        height: 100%;
    }   
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
    &.choosed {
        background: #a6ccd7
    }
    .dashed_box{
        position: absolute;
        border: 1px dotted #cccccc;
    }
}
</style>

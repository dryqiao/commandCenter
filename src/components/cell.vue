<template>
    <div :class="classes" 
        ref="cell" 
        @click.stop="clickHandler"
        @mousedown="mouseDownHandler"
        @mouseup="mouseUpHandler"
        @click.right="rightClickHandler"
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
        size: Number,
        rowIndex: Number,
        colIndex: Number
    },
    data() {
        return {
            cellIndex: null,
            imgStyle: {
                height: '0px',
                // width: '0px',
            },
        };
    },
    mounted() {
        console.log(this.$refs.cell)
        this.cellIndex = this.size * this.rowIndex + this.colIndex + 1
        this.$nextTick(()=>{
            this.imgStyle.height = this.$refs.cell.clientHeight + 1 + 'px'
            // this.imgStyle.width = this.$refs.cell.clientWidth + 'px'
        })
    },
    updated(){
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
    methods: {
        clickHandler:function(){
            this.$emit('tdClick',[this.rowIndex,this.colIndex])
        },
        mouseDownHandler:function(){
            this.$emit('tdMouseDown',[this.rowIndex,this.colIndex])
        },
        mouseUpHandler:function(){
            this.$emit('tdMouseUp',[this.rowIndex,this.colIndex])
        },
        rightClickHandler:function(){
            this.$emit('tdRightClick',[this.rowIndex,this.colIndex])
        }
    },
    created() {
    },
    updated() {
        console.log(this.td.img.length)

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
    img{
        width: 100%;
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

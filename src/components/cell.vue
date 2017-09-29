<template>
    <div :class="classes" 
        ref="cell" 
        @click.stop="clickHandler"
        @mousedown="mouseDownHandler"
        @mouseup="mouseUpHandler"
        >
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
        };
    },
    mounted() {
        this.cellIndex = this.size * this.rowIndex + this.colIndex + 1
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
        }
    },
    created() {
    }
};
</script>
<style lang="less" scoped>
@border : 1px solid #3f91a9;
.cell {
    position: relative;
    height: 100%;
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
    &.choosed {
        background: #a6ccd7
    }
    .dashed_box{
        position: absolute;
        border: 1px dotted #cccccc;
    }
}
</style>

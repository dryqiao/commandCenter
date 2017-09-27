<template>
    <div :class="classes" 
        ref="cell" 
        @click.stop="clickHandler">
        <!-- @mousedown.right.prevent="tdRightClickHandler(rowIndex,colIndex)" 
        @mousemove.stop="slideHandler(rowIndex,colIndex)"> -->
        <!-- <template v-if="renderType === 'index'">{{naturalIndex + 1}}</template>
        <template v-if="renderType === 'selection'">
            <Checkbox :value="checked" @click.native.stop="handleClick" @on-change="toggleSelect" :disabled="disabled"></Checkbox>
        </template>
        <template v-if="renderType === 'html'">
            <span v-html="row[column.key]"></span>
        </template>
        <template v-if="renderType === 'normal'">
            <span>{{row[column.key]}}</span>
        </template>
        <template v-if="renderType === 'expand' && !row._disableExpand">
            <div :class="expandCls" @click="toggleExpand">
                <Icon type="ios-arrow-right"></Icon>
            </div>
        </template> -->

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
        size: Array,
        rowIndex: Number,
        colIndex: Number
    },
    data() {
        return {
            cellIndex: null,
            choosed:false
        };
    },
    mounted() {
        this.cellIndex = this.size[1] * this.rowIndex + this.colIndex + 1
    },
    computed: {
        classes() {
            return [
                'cell',
                {
                    [`choosed`]: this.choosed,
                }
            ];
        }
    },
    methods: {
        clickHandler:function(){
            this.choosed =!this.choosed
            this.$emit('tdClick',[this.rowIndex,this.colIndex])
        },
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
}
</style>

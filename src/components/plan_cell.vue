<template>
    <div :class="classes">
        <img v-if="td.img.length > 0" :src="td.img" alt="#" :style="imgStyle">
    </div>
</template>
<script>

export default {
    name: 'TableCell',
    components: {},
    props: {
        td: Object
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
    },
    updated(){
    },
    computed: {
        classes() {
            return [
                'plan_cell',
                {
                    [`choosed`]: this.td.choosed,
                }
            ];
        }
    },
    methods: {
        // clickHandler:function(){
        //     console.log('click td')
        //     this.$emit('tdClick',[this.rowIndex,this.colIndex])
        // },
        // mouseDownHandler:function(){
        //     if(event.which === 1){
        //         console.log('mousedown td')
        //         this.$emit('tdMouseDown',[this.rowIndex,this.colIndex])
        //     }
            
        // },
        // mouseUpHandler:function(){
        //     if(event.which === 1){
        //         console.log('mouseup td')
        //         this.$emit('tdMouseUp',[this.rowIndex,this.colIndex])
        //     }
        // },
        // rightClickHandler:function(){
        //     console.log('right td')
        //     this.$emit('tdRightClick',[this.rowIndex,this.colIndex,this.cellIndex,this.size])
        // }
    },
    created() {
    },
    updated() {

    }
};
</script>
<style lang="less" scoped>
@border : 1px solid #3f91a9;
.plan_cell {
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

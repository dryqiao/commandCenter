<template>
    <div :class="classes" ref="plan_cell">
        <img v-if="td.img.length > 0" :src="td.img" alt="#">
    </div>
</template>
<script>
export default {
    name: 'planCell',
    components: {},
    props: {
        td: Object
    },
    data() {
        return {
        };
    },
    mounted() {
    },
    updated(){
    },
    computed: {
        imgStyle() {
            // return {
            //     height: this.$refs.plan_cell.height,
            //     width: this.$refs.plan_cell.width,
            // }
        },
        classes() {
            return [
                'plan_cell',
                {
                    [`choosed`]: this.td.choosed,
                }
            ]
        }
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

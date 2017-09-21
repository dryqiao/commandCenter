<template>
    <div class="layout_manage">
       <router-view></router-view>
    </div>
</template>
<script>
import matrixBox from './matrix_box'
export default {
    data() {
        return {
           
        }
    },
    methods: {
      
    },
    components: {
        matrixBox
    }
}
</script>

<style lang="less">
.layout_manage {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 20px;
    background: #ffffff;
}
</style>
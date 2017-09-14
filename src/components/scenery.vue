<template>
  <div class="scenery">
      <div class="add">
          <Button class="add-btn" type="primary" @click="isShow = true">新建布景</Button>
      </div>
  </div>
</template>
<script>
export default {
  data(){
      return {
          isShow:false
      }
  }
}
</script>

<style lang="less">
    .scenery{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        padding: 20px;
        background: #ffffff;
        .add-btn{
            width: 180px;
            height: 180px;
            span {
                font-size: 36px;
            }
        }
    }
</style>
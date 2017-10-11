<template>
  <header>
      <!-- <img src="../assets/img/logo.png" alt=""> -->
      <span class="title">指挥中心后台管理系统</span>
      <div class="info">
          <span href="#">sysadmin</span>
          <span href="#">退出</span>
      </div>
  </header>
</template>

<style lang="less">
header{
    height: 60px;
    line-height: 60px;
    background: #33ccff;
    vertical-align: middle;
    background-image: url('../assets/img/LOGO.png');
    vertical-align: middle;
    .title{
        color: #ffffff;
        margin-left: 180px;
    }
    .info{
        float: right;
        margin-right: 20px;
        height: 100%;
        color: #ffffff;
        span{
            cursor: pointer;
        }
    }
}
</style>

<<script>
export default {
  
}
</script>

<template>
    <div class="scenery">
        <div class="diy">
            <p>自定义布局</p>
            <div class="box">
                <planBox :oMatrixData="matrixData" :choose="true"></planBox>
            </div>
        </div>
        
        <div>
            <p>参考布局</p>
            <div class="box">
                <planBox :oMatrixData="matrixData" :choose="true"></planBox>
            </div>
        </div>
    </div>
</template>
<script>
import planBox from "./plan_box";
export default {
  data() {
    return {
      matrixData: {}
    };
  },
  created() {
    //此处不解析JSON字符串，组件里解析
    this.matrixData = JSON.parse(localStorage.getItem("layout"));
    // this.matrixData.sceneId = localStorage.getItem('sceneId')
    // this.matrixData.schemeName = `${}`
  },
  methods: {},
  components: {
    planBox
  }
};
</script>

<style lang="less" scoped>
.scenery {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 20px;
  background: #ffffff;
  p {
    font-size: 24px;
  }
  .box {
    position: relative;
    height: 200px;
  }
}
</style>
<template>
  <div class="matrix-box">
      <table>
          <tr v-for="(tr,index) in oFormData.row || 3" :key="index">
              <td v-for="(td,index) in oFormData.col || 3" :key="index"></td>
          </tr>
      </table>
      <div><span>{{oFormData.name}}</span></div>
  </div>
</template>
<script>
export default {
  data(){
      return {
      }
  },
  props : {
      oFormData: Object
  },
  methods : {
      
  }
}
</script>

<style lang="less">
@border : 1px solid #000000;
   .matrix-box{
       width: 180px;
       height: 180px;
       margin-left: 20px;
       cursor: pointer;
       table{
           width: 100%;
           height: 100%;
           border-top: @border;
           border-left: @border;
           border-collapse: collapse;
           tr{
               td{
                   border-right:@border;
                   border-bottom:@border;
               }
           }
       }
   }
</style>
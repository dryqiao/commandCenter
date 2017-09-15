<template>
  <div id="app">
    <!--头部-->
    <v-header></v-header>
    <!--布局-->
    <div class="layout">
      <Row type="flex">
        <Col :span="spanLeft" class="sidebar" :class="{'layout-hide-text': spanLeft < 3}">
          <!--左边菜单栏-->
          <div >
          <!--缩放按钮-->
          <div class="toggleBox">
            <Button type="text" class="toggle" @click="toggleClick">
              <Icon type="navicon" size="32"></Icon>
            </Button>
          </div>
          <!--侧边栏-->
          <Menu theme="dark"width="auto">
            <Menu-item v-for="item in sideitems"  class="menu-item" :name="item.id" :key="item.id">
              <li  @click="go(item.link)">
              <!--<router-link :to="item.link"></router-link>-->
                <!-- <img :src="item.src"> -->
                <span class="text">{{item.name}}</span>
              </li>
            </Menu-item>
          </Menu>
        </div>
        </Col>

        <Col :span="spanRight">
          <!--右边；路由-->
          <div class="content" :style="{height:contentHeight}">
          <router-view></router-view>
        </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
  import header from './components/header.vue';
  export default {
    data(){
        return {
          contentHeight: `${document.documentElement.clientHeight-60}px`,
          spanLeft:3,
          spanRight: 21,
          isFold:false,
          sideitems:[{
              id : 1,
              name : '布景管理',
              // src:require("./components/a.png"),
              link:'/scenery'
          },{
              id : 2,
              name : '布局管理',
              link:'/layout'
            },{
              id : 3,
              name : '预案管理',
              link:'/maintenanceOrder'
            }]
        }
    },
  components : {
        'v-header':header
  },
  created(){
//    this.$router.push({path:'/hello'});
  },
  methods:{
    toggleClick () {
        if (this.spanLeft === 3) {
          this.spanLeft = 1;
          this.spanRight = 23;
        } else {
          this.spanLeft = 3;
          this.spanRight = 21;
        }
    },
    go (routerName) {
        this.$router.push({path:routerName});
    }
  }
}
</script>

<style lang="less">
  #app{
    .layout{
      /*缩进动画*/
      .ivu-col{
        transition: width .2s ease-in-out;
      }
      .sidebar{
        background:#333333;
        &.layout-hide-text{
         li{
          span{display: none;}
          }
         }
        .toggleBox{
          text-align: center;
        }
        li{
          vertical-align: middle;
          background:#333333;
          img{
            width: 24px;
            height: 24px;
            background-repeat: no-repeat;
            vertical-align: top;
          }
          .text{
            text-align: center;
            vertical-align: middle;
          }
        }
      }
      .content{
        /*height:1000px;*/
        padding: 10px 20px 10px 20px;
        background: #dae2e5;
      }
    }
  }
</style>

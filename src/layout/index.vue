<template>
  <div class="layout">
    <el-container >
      <el-aside :style="'width:'+ autoWidth ">
        <LogoBar :collapsed = "collapsed"/>
        <MenuBar :collapsed = "collapsed"/>
      </el-aside>

      <el-container>
        <el-header>
          <el-row>
            <!--侧边栏展开折叠按钮-->
            <el-icon style="font-size: 26px; margin-right: 15px" @click="()=>(collapsed = !collapsed)">
              <component :is="collapsed ? Expand :Fold"/>
            </el-icon>

            <header-bar/>

          </el-row>
        </el-header>
        <el-main>
          <tab-bar/>
          <app-main></app-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script  setup lang="ts">
import LogoBar from "./components/LogoBar/index.vue"
import MenuBar from "./components/MenuBar/index.vue"
import AppMain from './components/AppMain/AppMain.vue'
import HeaderBar from './components/HeaderBar/index.vue'
import TabBar from './components/TabBar/TabBar.vue'
import {Expand, Fold} from '@element-plus/icons-vue'
import {computed, ref} from "vue";
import {isMobile} from "../utils/isMobile"

const collapsed = ref<Boolean>(false);

const autoWidth = computed(()=>{
  if (collapsed.value && isMobile()){
    return "0px"
  }else if(collapsed.value){
    return "64px"
  }else {
    return "200px"
  }
})



</script>

<style lang="scss">
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  .el-header{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 60px;
  }

  .el-footer {
    line-height: 60px;
  }

  .el-aside {
    background-color: $menuBg;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 200px;
    width: 200px;
    height: 100%;
    overflow: hidden;
  }

}
</style>



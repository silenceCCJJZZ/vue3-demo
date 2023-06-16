<template>

  <el-breadcrumb>
    <el-breadcrumb-item v-for="(item,index) in breadCrumb" :key="index"
    >{{item.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>

</template>

<script setup lang="ts">
import {useRoute,RouteLocationMatched} from "vue-router";
import {ref,watch,Ref} from "vue";


const route = useRoute();
const breadCrumb:Ref<RouteLocationMatched[]> = ref([]);

const getBreadCrumb= ()=>{
  //过滤路由信息
  let matched = route.matched.filter((item)=>item.meta && item.meta.title && item.children.length !==1)
  //拿到第一条数据
  let first=matched[0];
  //判断
  if(first.path !=="/index"){
    matched = [{path:'/index',meta:{title:'首页'}}as any].concat(matched)
  }
  breadCrumb.value = matched;
}

getBreadCrumb()

watch(()=>route.path,()=>{
  getBreadCrumb()
})


</script>

<style lang="scss" scoped>

</style>

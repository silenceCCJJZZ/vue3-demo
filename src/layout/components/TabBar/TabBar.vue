<template>
  <el-tabs
      v-model="activeKey"
      type="card"
  >
    <el-tab-pane
        v-for="item in tabsList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
    >
      {{ item.content }}
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import {Itab} from "../../../store/type";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {computed, ref, watch} from "vue";

const store = useStore();
const route = useRoute();

//访问store中 getters、state 需要计算属性
const tabsList = computed(()=>{
    return store.getters.getAddTab
})
//索引
const activeKey = ref('')

//添加tab
const addTab=()=>{
    const {meta,path} = route
    const tab:Itab = {
        path:path,
        title:meta.title as string
    }
    //只能通过 commit 方法来调用 mutations
    store.commit("addTab",tab)
}

//监控
watch(()=>route.path,()=>{
    activeKey.value = route.path
    addTab()
})

</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>

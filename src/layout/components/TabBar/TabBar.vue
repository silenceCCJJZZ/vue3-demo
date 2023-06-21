<template>
  <el-tabs
      v-model="activeKey"
      type="card"
      @tab-click="clickHandle"
      @tab-remove="removeTab"
  >
    <el-tab-pane
        v-for="item in tabsList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
        closable
    >
      {{ item.content }}
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import {Itab} from "../../../store/type";
import {useRoute,useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed, ref, watch} from "vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

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

//点击tab
const clickHandle=(event:any)=>{
    router.push({path:event.props.name})
}

//删除tab
const removeTab=(targetName:string)=>{
    if(tabsList.value.length===1){
        return alert("只有一个tab，不可删除")
    }
    //删除是当前tab页
    if (activeKey.value === targetName){
        tabsList.value.forEach((tab:Itab,index:number)=>{
          if(tab.path === targetName){
            const nextTab = tabsList.value[index+1] || tabsList.value[index-1];
            if(nextTab){
              activeKey.value = nextTab.path;
            }
          }
        })
    }
    store.commit("closeCurrentTab",targetName)

}

</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>

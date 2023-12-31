<template>
  <el-tabs
      v-model="activeKey"
      type="card"
      @tab-click="clickHandle"
      @tab-remove="removeTab"
      @contextmenu.prevent.native = "openContextMenu($event)"
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
  <ul v-show="contextMenuVisible" :style="{left:left+'px',top:top + 'px'}" class="contextmenu">
    <li @click="closeAllTabs">关闭所有</li>
    <li @click="closeOtherTabs('left')">关闭左边</li>
    <li @click="closeOtherTabs('right')">关闭右边</li>
    <li @click="closeOtherTabs('other')">关闭其他</li>
  </ul>

</template>
<script lang="ts" setup>
import {Itab} from "../../../store/type";
import {useRoute,useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed, onMounted, Ref, ref, watch} from "vue";

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

//加入缓存存储tab
const refresh=()=>{
  window.addEventListener("beforeunload", ()=>{
    sessionStorage.setItem('TABS_ROUTES',JSON.stringify(tabsList.value))
  })

  let session = sessionStorage.getItem('TABS_ROUTES')
  if(session){
    let tabItem = JSON.parse(session)
    tabItem.forEach((tab:Itab)=>{
      store.commit("addTab",tab)
    })
  }
}

//修复刷新后位置会改变，先刷新再addTab
refresh()

//监控
watch(()=>route.path,()=>{
    activeKey.value = route.path
    addTab()
},{immediate:true})//立即执行，修复刷新后，没有选中tab标签

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

const contextMenuVisible:Ref<boolean>= ref(false);
const left = ref('')
const top = ref('')
//右键显示菜单
const openContextMenu=(event:any)=>{
  console.log(event)
  if(event.srcElement.id){
    let currentContextTabId = event.srcElement.id.split('-')[1];
    //右键后，保存路由path到store中
    store.commit("saveCurContextTabId",currentContextTabId);
    contextMenuVisible.value = true
    left.value = event.clientX;
    top.value = event.clientY+10;

  }
}
//关闭所有
const closeAllTabs=()=>{
  store.commit("closeAllTabs");
  contextMenuVisible.value = false
  router.push("/index")
}

//关闭其他（包括关闭左、右、其他）
const closeOtherTabs=(par:string)=>{
  store.commit("closeOtherTabs",par)
  contextMenuVisible.value = false
}

// 监控右键删除列表，如果点击，tab消失
watch(()=>contextMenuVisible.value,()=>{
  if (contextMenuVisible.value){
      window.addEventListener("click",()=>contextMenuVisible.value=false)
  }else{
    //移除监听
    window.addEventListener("click",()=>contextMenuVisible.value=false)
  }
})

</script>
<style lang="scss">
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.contextmenu{
  width: 100px;
  margin: 0;
  border: 1px solid #ccc;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.2);
  li {
    margin: 0;
    padding: 7px 16px;
    &:hover{
      background: #f2f2f2;
      cursor: pointer;
    }
  }
}
</style>

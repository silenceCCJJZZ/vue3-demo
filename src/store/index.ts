import {createStore} from 'vuex'
import {Itab} from "./type";

interface State {
    tabsList:Array<Itab>
    contextMenuTabId:string
}

export const store = createStore<State> ({
    //state，用于存储应用程序的状态数据，可以是任意数据类型。
    state:{
        tabsList:[],
        contextMenuTabId:''
    },

    // mutations，用于修改 state 中的数据，只能进行同步操作。
    mutations:{
        //添加tab
        addTab(state:State,tab:Itab){
            //添加便签页，在添加前会判断该标签页是否已经存在
            const isSome = state.tabsList.some((item)=>item.path == tab.path)
            if(!isSome){
                state.tabsList.push(tab)
            }
        },
        //删除tab
        closeCurrentTab(state:State,targetName:string){
            const index = state.tabsList.findIndex((item)=>item.path==targetName)
            state.tabsList.splice(index,1)
        },
        //右键打开菜单保存path
        saveCurContextTabId(state:State,currentContextTabId:string){
            state.contextMenuTabId= currentContextTabId
        },
        //关闭所有tab
        closeAllTabs(state:State){
            state.tabsList=[]
            //删除缓存
            sessionStorage.removeItem("TABS_ROUTES")
        },
        //关闭其他tab
        closeOtherTabs(state:State,par:string){
            if (par == 'other'){
                state.tabsList = state.tabsList.filter((item)=> item.path == state.contextMenuTabId)
            }else if(par == 'left'){
                const index = state.tabsList.findIndex((item)=> item.path == state.contextMenuTabId)
                state.tabsList.splice(0,index)
            }else if(par == 'right'){
                const index = state.tabsList.findIndex((item)=> item.path == state.contextMenuTabId)
                state.tabsList.splice(index+1)
            }

        }


    },
    // getters，用于派生 state 中的属性，类似于计算属性。
    getters:{
        getAddTab(state:State){
            return state.tabsList
        }
    }
})

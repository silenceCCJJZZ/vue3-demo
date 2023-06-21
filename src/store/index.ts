import {createStore} from 'vuex'
import {Itab} from "./type";

interface State {
    tabsList:Array<Itab>
}

export const store = createStore<State> ({
    //state，用于存储应用程序的状态数据，可以是任意数据类型。
    state:{
        tabsList:[]
    },

    // mutations，用于修改 state 中的数据，只能进行同步操作。
    mutations:{
        addTab(state:State,tab:Itab){
            //添加便签页，在添加前会判断该标签页是否已经存在
            const isSome = state.tabsList.some((item)=>item.path == tab.path)
            if(!isSome){
                state.tabsList.push(tab)
            }
        },
        closeCurrentTab(state:State,targetName:string){
            const index = state.tabsList.findIndex((item)=>item.path==targetName)
            state.tabsList.splice(index,1)
        }
    },
    // getters，用于派生 state 中的属性，类似于计算属性。
    getters:{
        getAddTab(state:State){
            return state.tabsList
        }
    }
})

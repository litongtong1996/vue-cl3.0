import Vue from "vue"
import Vuex from "vuex"
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

// 1.安装插件
Vue.use(Vuex)
// 2.创建store对象
const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
  //   state: {
  //     cartList: []
  //   },
  //    mutations: {
  //     // mutations唯一的目的就是改变state中的状态
  //     // mutations中每个方法完成的事情尽可能单一
  //     /** addCart(state, payload) {
  //         // payload新添加的商品
  //         // let oldProduct = null
  //         // for(let item of state.cartList){
  //         //     if(item.iid === payload.iid){
  //         //         oldProduct = item
  //         //     }
  //         // }
  //         // 1.查找之前数组是否有该商品
  //         let oldProduct = state.cartList.find(item => item.iid === payload.iid)
  //         // 判断oldProduct
  //         if (oldProduct) {
  //           oldProduct.count += 1
  //         } else {
  //           payload.count = 1
  //           state.cartList.push(payload)
  //         }
  //       }
  //       代码重构
  //       */
  //      addCounter(state, payload){
  //         payload.count++
  //      },
  //      addToCart(state, payload){
  //         state.cartList.push(payload)
  //      }
  //   },
  //   actions: {
  //     addCart(context, payload) {
  //       // 查找之前数组是否有该商品
  //       let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
  //       // 判断oldProduct
  //       if (oldProduct) {
  //         // oldProduct.count += 1
  //         context.commit("addCounter",oldProduct)
  //       } else {
  //         payload.count = 1
  //         // context.state.cartList.push(payload)
  //         context.commit("addToCart",payload)
  //       }
  //     }
  //   }
})
// 3.挂载到vue实例上
export default store

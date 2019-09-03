import {ADD_COUNTER,ADD_TO_CART } from "./mutation-types"
export default {
  addCart(context, payload) {
    return new Promise((resolve,reject)=>{
      // 查找之前数组是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    // 判断oldProduct
    if (oldProduct) {//数量加一
      // oldProduct.count += 1
    //   context.commit("addCounter", oldProduct)
      context.commit(ADD_COUNTER, oldProduct)
      resolve("商品数量+1")
    } else {//添加新的商品
      payload.count = 1
      // context.state.cartList.push(payload)
    //   context.commit("addToCart", payload)
      context.commit(ADD_TO_CART, payload)
      resolve("添加新的商品")
    }
    })
  }
}

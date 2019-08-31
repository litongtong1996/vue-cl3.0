import {ADD_COUNTER,ADD_TO_CART } from "./mutation-types"
export default {
  addCart(context, payload) {
    // 查找之前数组是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    // 判断oldProduct
    if (oldProduct) {
      // oldProduct.count += 1
    //   context.commit("addCounter", oldProduct)
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      // context.state.cartList.push(payload)
    //   context.commit("addToCart", payload)
      context.commit(ADD_TO_CART, payload)
    }
  }
}

import {ADD_COUNTER,ADD_TO_CART } from "./mutation-types"
export default {
//   addCounter(state, payload) {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
//   addToCart(state, payload) {
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  }
}

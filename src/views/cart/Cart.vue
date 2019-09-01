<template>
  <div class="cart">
    <!-- 导航 -->
    <Nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </Nav-bar>
    <!-- 商品列表 -->
    <Cart-list/>
    <!-- 商品汇总 -->
    <Cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar"

import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 两种语法
    ...mapGetters(["cartLength"])
    // ...mapGetters({
    //   length:'cartLength'
    // })
    // cartLength(){
    //   // return this.$store.state.cartList.length
    //   return this.$store.getters.cartLength
    // }
  }
};
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>

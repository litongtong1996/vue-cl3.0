<template>
  <div class="cart-list">
    <Scroll class="center" ref="scroll">
      <Cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item" />
    </Scroll>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["cartList"])
  },
  components: {
    Scroll,
    CartListItem
  },
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>
<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
.center {
  height: 100%;
  overflow: hidden;
}
</style>
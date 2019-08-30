import {
  debounce
} from "./utils"
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // 1.监听图片加载完毕
    const newrefresh = debounce(this.$refs.scroll.refresh, 50);
    // 对监听事件进行保存
    this.itemImgListener = () => {
      // this.$refs.scroll.refresh();
      newrefresh()
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  }
}

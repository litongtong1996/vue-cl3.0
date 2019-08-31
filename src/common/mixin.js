import {
  debounce
} from "./utils"
import BackTop from "components/content/backTop/BackTop"; 
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
      // newrefresh: null
    }
  },
  mounted() {
    // 1.监听图片加载完毕
    const newrefresh = debounce(this.$refs.scroll.refresh, 50);
    // 对监听事件进行保存
    this.itemImgListener = () => {
      // this.$refs.scroll.refresh();
      newrefresh()
      // this.newrefresh()
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  }
}
// 混入的方式
export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return {
      isShowBackTop: false
    }
  },
  methods:{
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    }
  }
}

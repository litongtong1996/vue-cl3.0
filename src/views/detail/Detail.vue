<template>
  <div class="detail">
    <!-- 导航 -->
    <Detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <Scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <Detail-swiper :top-images="topImages" />
      <Detail-base-info :goods="goods" />
      <Detail-shop-info :shop="shop" />
      <Detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <Detail-param-info :param-info="paramInfo" ref="params" />
      <Detail-comment-info :comment-info="commentInfo" ref="comment" />
      <Goods-list :goods="recommends" ref="recommend" />
    </Scroll>
    <Back-top @click.native="backClick" v-show="isShowBackTop" />
    <Detail-bottom-bar @addCart="addToCart"/>
    <!-- <Toast :message="message" :show="show"/> -->
  </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar"

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList"
// import Toast from "components/common/toast/Toast"

import {debounce} from "common/utils"
import {itemListenerMixin, backTopMixin} from "common/mixin"
import {mapActions} from 'vuex'

import { getDaetil, Goods, Shop, GoodsParam, getRecommend } from "network/detail";
import { log } from 'util';
export default {
  name: "Detail",
  // 混入
  mixins:[itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
      // message: '',
      // show: false
    };
  },
  created() {
    // 1.保存传入的ID
    this.iid = this.$route.params.iid;
    // 2.根据ID请求数据
    getDaetil(this.iid).then(res => {
      // 1.获取顶部的轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.创建商品店铺信息
      this.shop = new Shop(data.shopInfo);
      //4.保存商品详情
      this.detailInfo = data.detailInfo;
      //   5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      /** 
      // 1.在此处取值时this.$refs.params.$el还没渲染取不到值
      this.$nextTick(()=>{
        // 2.在此处取值，是根据最新的数据，DOM已经渲染出来了
        // 但是图片还没有完全加载出来取出的值是不对的
        // offsetTop值不对事大多因为图片
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs)
      })
      */
    });
    // 3.请求推荐数据
    getRecommend().then(res=>{
      this.recommends = res.data.list
    })
    // 4.给getThemeTopY赋值,并进行防抖
    this.getThemeTopY = debounce(()=>{
      this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs)
        //hack做法： Number.MAX_VALUE 在push一个最大值
    })
  },
  mounted(){
    //  // 1.监听图片加载完毕
    // const newrefresh = debounce(this.$refs.scroll.refresh,50);
    // // 对监听事件进行保存
    // this.itemImgListener = () => {
    //   // this.$refs.scroll.refresh();
    //   newrefresh()
    // }
    // this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  destroyed(){
    // 取消全局事件的监听
    this.$bus.$off("itemImageLoad",this.itemImgListener)
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh();
      // this.newrefresh()
      this.getThemeTopY()
    },
    titleClick(index){
      // console.log(index)
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },
    contentScroll(position){
      // console.log(position)
      // 1.获取y值
      const positionY = -position.y
      /**  2.position中的y值和标题中的值进行对比
       * [0,768,1456,2342]
       * position.y在 0 和 768 之间，index = 0
       * position.y在 768 和 1456 之间，index = 1
       * position.y在 1456 和 2342 之间，index = 2
       * position.y超过 2342，index = 3
      */
     let length = this.themeTopYs.length
        for(let i = 0; i< length - 1;i++){
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        // 判断返回顶部是否显示
      this.isShowBackTop = (-position.y) > 1000;
    //  for(let i = 0; i<length;i++){
    //    if(this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || 
    //    (i === length - 1 && positionY >= this.themeTopYs[i])){
    //      this.currentIndex = i
    //      this.$refs.nav.currentIndex = this.currentIndex
    //    }
    //  }
    },
    addToCart(){
      // 1.获取购物车展示信息
      const product = {}
      product.imgage = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // 2.将商品加入购物车
      // this.$store.cartList.push() 不建议这样使用
      // this.$store.commit("addCart",product)
      // this.$store.dispatch("addCart",product).then(res=>{
      //   console.log(res)
      // })
      this.addCart(product).then(res=>{
        // console.log(res)
        // this.show = true
        // this.message = res
        this.$toast.show(res,2000)
        // setTimeout(()=>{
        //   this.show = false
        // this.message = ''
        // },1500)
      })
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
    // Toast
  }
};
</script>
<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 58px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
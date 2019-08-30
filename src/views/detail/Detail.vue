<template>
  <div class="detail">
    <!-- 导航 -->
    <Detail-nav-bar class="detail-nav" @titleClick="titleClick"/>
    <Scroll class="content" ref="scroll">
      <Detail-swiper :top-images="topImages" />
      <Detail-base-info :goods="goods" />
      <Detail-shop-info :shop="shop" />
      <Detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <Detail-param-info :param-info="paramInfo" ref="params"/>
      <Detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <Goods-list :goods="recommends" ref="recommend"/>
    </Scroll>
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

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList"

import {debounce} from "common/utils"
import {itemListenerMixin} from "common/mixin"

import { getDaetil, Goods, Shop, GoodsParam, getRecommend } from "network/detail";
import { log } from 'util';
export default {
  name: "Detail",
  // 混入
  mixins:[itemListenerMixin],
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
      getThemeTopY: null
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
        // console.log(this.themeTopYs)
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
    imageLoad() {
      this.$refs.scroll.refresh();
      // this.newrefresh()
      this.getThemeTopY()
    },
    titleClick(index){
      // console.log(index)
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
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
    Scroll,
    GoodsList
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
  height: calc(100% - 44px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
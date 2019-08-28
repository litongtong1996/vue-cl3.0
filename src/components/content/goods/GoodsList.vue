<template>
    <div class="goods">
        <Goods-list-item v-for="(item,index) in goods" :key="index" :goodsItem="item"/>
    </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem"
export default {
    components:{
        GoodsListItem
    },
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>
<style scoped>
.goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
}
</style>
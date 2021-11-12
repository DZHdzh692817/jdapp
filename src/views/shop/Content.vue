<template>
    <div class="content">
        <div class="category">
            <!-- category__item--active -->
            <div class="category__item" :class="item.tab === currentTab ? 'category__item--active' : ''"
                v-for="(item, index) in categories" 
                :key="index" 
                @click="handleTabClick(item.tab)"
            >
                {{item.name}}
            </div>
            <!-- <div class="category__item">休息食品</div>
            <div class="category__item">时令蔬菜</div>
            <div class="category__item">肉蛋家禽</div> -->
        </div>
        <div class="product">
            <div class="product__item" v-for="(item, index) in list" :key="index">
                <img class="product__item__img" :src="item.imgUrl"/>
                <div class="product__item__detail">
                    <h4 class="product__item__title">{{item.name}}</h4>
                    <p class="product__item__sales">月售{{item.sales}}份</p>
                    <div class="product__item__price">
                        <span class="product__item__yen">&yen;</span>{{item.price}}
                        <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
                    </div>
                </div>
                <!-- 加减号 -->
                <div class="product__number">
                    <span class="product__number__minus iconfont" @click="() =>{ changeCartItem(shopId, item.id, item, -1, shopName) }">&#xe8b1;</span>
                    <!-- <span class="product__number__count">{{ getProductCartCount(shopId, item.id) }}</span> -->
                    <span class="product__number__count">{{cartList?.[shopId]?.productList?.[item.id]?.count || 0}}</span>
                    <span class="product__number__plus iconfont" @click="() =>{ changeCartItem(shopId, item.id, item, 1, shopName) }">&#xe667;</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { get } from '../../utils/request.js'
//import { useCommonCartEffect } from './commonCartEffect'
import { useCommonCartEffect } from '../../effects/cartEffects'

const categories = [
  { name: '全部商品', tab: 'all' },
  { name:'秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit'}
]
// Tab 切换相关的逻辑
const useTabEffect = () => {
    const currentTab = ref(categories[0].tab)
    const handleTabClick = (tab) => {
        currentTab.value = tab
    }
    return { currentTab, handleTabClick }
}

// 列表内容相关的逻辑
const useCurrentListEffect = (currentTab, shopId) => {
    
    const content = reactive({ list: []})
    
    const getContentData = async () => {
        const result = await get(`/api/shop/${shopId}/products`, {
            tab: currentTab.value
        })
        if(result?.errno === 0 && result?.data?.length) {
            content.list = result.data;
        }
    }
    //刚加载页面的时候 或者数据变化的时候 都会执行watchEffect
    watchEffect( ()=> {
        getContentData()
    })
    const { list } = toRefs(content)
    return { list }
}

const useCartEffect = () => {
    const store = useStore();
    const { changeCartItemInfo, cartList } = useCommonCartEffect();
    const changeCartItem = (shopId, productId, item, num, shopName) => {
        changeCartItemInfo(shopId, productId, item, num);

        changeShopName(shopId, shopName)
    }
    //把店铺名称也加进去
    const changeShopName = (shopId, shopName) => {
        store.commit('changeShopName', {
            shopId,
            shopName
        })
    }
    const getProductCartCount = (shopId, productId) => {
        return cartList?.[shopId]?.productList?.[productId]?.count || 0
    }

    return { cartList, changeCartItem, getProductCartCount }
}

export default {
    name: 'Content',
    props: [ 'shopName' ],
    setup() {
        const route = useRoute();
        
        const shopId = route.params.id
        const { currentTab, handleTabClick } = useTabEffect();
        const { list } = useCurrentListEffect(currentTab, shopId);

        const { cartList, changeCartItem, getProductCartCount } = useCartEffect();

        return {
            list, 
            categories, 
            currentTab, 
            handleTabClick, 
            shopId, 
            //changeCartItemInfo, 
            cartList, 
            changeCartItem,
            getProductCartCount
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.content {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 1.5rem;
    bottom: .5rem;
}
.category {
    width: .76rem;
    background: $search-bgColor;
    height: 100%;
    overflow-y: scroll;// 超出布局向下混动
    &__item {
        line-height: .4rem;
        text-align: center;
        font-size: .14rem;
        color: $content-fontcolor;
        &--active {
            background: #ffffff;
        }
    }
}
.product {
    overflow-y: scroll;// 超出布局向下混动
    flex: 1;
    &__item {
        position: relative;
        display: flex;
        padding: .12rem 0;
        margin: 0 .16rem;
        border-bottom: .01rem solid #f1f1f1;
        &__detail {
            overflow: hidden;
        }
        &__img {
            width: .68rem;
            height: .68rem;
            margin-right: .16rem;
        }
        &__title {
            margin: 0;
            line-height: .2rem;
            font-size: .14rem;
            color: $content-fontcolor;
            @include ellipsis;
        }
        &__sales {
            margin: .06rem 0;
            line-height: .16rem;
            font-size: .12rem;
            color: $content-fontcolor;
        }
        &__price {
            margin: 0;
            line-height: .2rem;
            font-size: .14rem;
            color: #E93B3B;
        }
        &__yen {
            font-size: .12rem;
        }
        &__origin {
            margin-left: .06rem;
            line-height: .2rem;
            font-size: .12rem;
            color: #999;
            text-decoration: line-through;
        }
        .product__number {
            position: absolute;
            right: 0;
            bottom: .12rem;
            &__count {
                margin: 0 .05rem;
                font-size: .14rem;
                color: $content-fontcolor;
            }
            &__minus {
                color: #666;
            }
            &__plus {
                // background: #0091FF;
                color: #0091FF;
            }
        }
    }
}
</style>
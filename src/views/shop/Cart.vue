<template>
    <!-- 蒙层 -->
    <div class="mask" v-if="showCart && calculations.total > 0" @click="handleCartShowChange"></div>
    <div class="cart">

        <div class="product" v-if="showCart && calculations.total > 0">
            <div class="product__header">
                <div class="product__header__all" @click="() => setCartItemsChecked(shopId)">
                    <span class="product__header__icon iconfont" v-html="calculations.allChecked ? '&#xe656;' : '&#xe7ae;'"></span>
                    全选
                </div>
                <div class="product__header__clear">
                    <span class="product__header__clear__spn" @click="()=>clearCartProducts(shopId)">清空购物车</span>
                </div>
            </div>
            <template v-for="(item, index) in productList" :key="index">
                <div class="product__item" v-if="item.count > 0">
                    <div 
                        class="product__item__checked iconfont" v-html="item.check ? '&#xe656;' : '&#xe7ae;' " 
                        @click="() => changeCartItemChecked(shopId, item.id)"></div>
                    <img class="product__item__img" :src="item.imgUrl"/>
                    <div class="product__item__detail">
                        <h4 class="product__item__title">{{item.name}}</h4>
                        <div class="product__item__price">
                            <span class="product__item__yen">&yen;</span>{{item.price}}
                            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
                        </div>
                    </div>
                    <!-- 加减号 -->
                    <div class="product__number">
                        <span class="product__number__minus iconfont" @click="() =>{ changeCartItemInfo(shopId, item.id, item, -1) }">&#xe8b1;</span>
                        <span class="product__number__count">{{item.count || 0}}</span>
                        <span class="product__number__plus iconfont" @click="() =>{ changeCartItemInfo(shopId, item.id, item, 1) }">&#xe667;</span>
                    </div>
                </div>
            </template>
        </div>

        <div class="check">
            <div class="check__icon">
                <img src="http://www.dell-lee.com/imgs/vue3/basket.png" class="check__icon__img" @click="handleCartShowChange"/>
                <div class="check__icon__tag">{{ calculations.total }}</div>
            </div>
            <div class="check__info">
                总计: <span class="check__info__price">&yen; {{calculations.price}}</span>
            </div>
            <div class="check__btn" v-show="calculations.total > 0">
                <!-- <router-link :to="{name: 'Order'}">去结算</router-link> -->
                <router-link :to="{path: `/order/${shopId}`}">去结算</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
//import { useCommonCartEffect } from './commonCartEffect'
import { useCommonCartEffect } from '../../effects/cartEffects'

//计算总数量 和总计
const useCartEffect = (shopId) => {

    const { cartList, productList, changeCartItemInfo, calculations } = useCommonCartEffect(shopId);

    const store = useStore();
    //const cartList = store.state.cartList;//改写js文件中

    //改写js文件中
    // const calculations = computed(() => {
    //     const productList = cartList[shopId]?.productList
    //     const result = { total: 0, price: 0, allChecked: true}
    //     // let total = 0//总数
    //     // let price = 0//总计
    //     // let allChecked = true//默认是全选的
    //     if(productList) {
    //         for(let i in productList) {
    //             const product = productList[i]
    //             result.total += product.count
    //             if(product.check) {
    //                 result.price += (product.count * product.price)
    //             }
    //             //没有全部选中的时候
    //             if( product.count > 0 && !product.check) {
    //                result.allChecked = false
    //             }
    //         }
    //     }
    //     result.price = result.price.toFixed(2)
    //     return result
    // })
    //改写js文件中
    // const productList = computed(()=> {
    //     const productList = cartList[shopId]?.productList || []
    //     return productList
    // })

    //选中按钮
    const changeCartItemChecked = (shopId, productId) => {
        store.commit('changeCartItemChecked', {
            shopId,
            productId,
        }) 
    }
    //清空购物车
    const clearCartProducts = (shopId) => {
        store.commit('clearCartProducts', { shopId }) 
    }

    //点击全选
    const setCartItemsChecked = (shopId) => {
        store.commit('setCartItemsChecked', { shopId }) 
    }

    return { calculations, productList, changeCartItemInfo, changeCartItemChecked, clearCartProducts, setCartItemsChecked }
}

//展示隐藏购物车
const toggleCartEffect = () => {
    const showCart = ref(false);
    //显示隐藏购物车
    const handleCartShowChange = () => {
        showCart.value = !showCart.value
    }
    return { showCart, handleCartShowChange }
}
 
export default {
    name: 'Cart',
    setup () {
        const route = useRoute();
        const shopId = route.params.id;

        const { calculations, productList, changeCartItemInfo, changeCartItemChecked, clearCartProducts, setCartItemsChecked } = useCartEffect(shopId);

        const { showCart, handleCartShowChange } = toggleCartEffect();
 
        return { 
            calculations, productList, shopId, changeCartItemInfo, 
            changeCartItemChecked, clearCartProducts, setCartItemsChecked, showCart, handleCartShowChange
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.mask {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 1;
}
.cart {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background: #fff;
}
.check {
    display: flex;
    height: .49rem;
    border-top: .01rem solid #f1f1f1;
    line-height: .49rem;
    &__icon {
        position: relative;
        width: .84rem;
        &__img {
            display: block;
            margin: .12rem auto;
            width: .28rem;
            height: .26rem;
        }
        &__tag {
            position: absolute;
            right: .1rem;
            top: .05rem;
            min-width: .25rem;
            height: .25rem;
            background-color: #E93B3B;
            border-radius: .1rem;
            font-size: .15rem;
            line-height: .25rem;
            text-align: center;
            color: #fff;
            transform: scale(.5);
            transform-origin: left center;
        }
    }
    &__info {
        flex: 1;
        color: $content-fontcolor;
        font-size: .12rem;
        &__price {
            font-size: .18rem;
            color: #E93B3B;
        }
    }
    &__btn {
        width: .98rem;
        background-color: #4FB0F9;
        color:#fff;
        font-size: .14rem;
        text-align: center;
        a {
            text-decoration: none;
            color:#fff;
        }
    }
}

.product {
    background: #fff;
    overflow-y: scroll;// 超出布局向下混动
    flex: 1;
    &__header {
        display: flex;
        line-height: .51rem;
        border-bottom: .01rem solid #f1f1f1;
        font-size: .14rem;
        color: $content-fontcolor;
        &__all {
            width: .64rem;
            margin-left: .18rem;
        }
        &__icon {
            display: inline-block;
            vertical-align: top;
            margin-right: .1rem;
            color: #0091FF;
            font-size: .2rem;
        }
        &__clear {
            flex: 1;
            text-align: right;
            margin-right: .16rem;
            &__spn {
                display: inline-block;
            }
        }
    }
    &__item {
        position: relative;
        display: flex;
        padding: .12rem 0;
        margin: 0 .16rem;
        border-bottom: .01rem solid #f1f1f1;
        &__detail {
            overflow: hidden;
        }
        &__checked {
            line-height: .5rem;
            margin-right: .2rem;
            color: #0091FF;
            font-size: .2rem;
        }
        &__img {
            width: .46rem;
            height: .46rem;
            margin-right: .16rem;
        }
        &__title {
            margin: 0;
            line-height: .2rem;
            font-size: .14rem;
            color: $content-fontcolor;
            @include ellipsis;
        }
        &__price {
            margin: .06 0 0 0;
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
                color: #0091FF;
            }
        }
    }
}
</style>
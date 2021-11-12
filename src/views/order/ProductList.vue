<template>
    <div class="product">
        <div class="product__title">{{shopName}}</div>
        <div class="product__wrapper">
            <div class="product__list">
                <template v-for="(item, index) in productList" :key="index">
                    <div class="product__item" v-if="item.count > 0">
                        <img class="product__item__img" :src="item.imgUrl"/>
                        <div class="product__item__detail">
                            <h4 class="product__item__title">{{item.name}}</h4>
                            <div class="product__item__price">
                                <span>
                                    <span class="product__item__yen">&yen;</span>
                                    {{item.price}} x {{item.count}}
                                </span>
                                <span class="product__item__total">
                                    <span class="product__item__yen">&yen;</span>
                                    {{(item.price * item.count).toFixed(2)}}
                                </span>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>   
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'
export default {
    name: 'ProductList',
    setup () {
        const route = useRoute();
        const shopId = route.params.id

        const { productList, shopName } = useCommonCartEffect(shopId);

        return { productList, shopName }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.product {
    margin: .16rem .18rem .2rem .18rem;
    background-color: #fff;
    &__title {
        font-size: .16rem;
        padding: .16rem;
        color: #333333;
    }
    &__wrapper {
        overflow-y: scroll;
        position: absolute;
        margin: 0 .18rem;
        left: 0;
        right: 0;
        top: 2.6rem;
        bottom: .6rem;
    }
    &__list {
        background: #fff;
    }
    &__item {
        position: relative;
        display: flex;
        padding: 0 .16rem .16rem .16rem;
        &__img {
            width: .46rem;
            height: .46rem;
            margin-right: .16rem;
        }
        &__detail {
            flex: 1;
        }
        &__title {
            margin: 0;
            line-height: .2rem;
            font-size: .14rem;
            color: $content-fontcolor;
            @include ellipsis;
        }
        &__price {
            display: flex;
            margin: .06rem 0 0 0;
            line-height: .2rem;
            font-size: .14rem;
            color: #E93B3B;
        }
        &__total {
            text-align: right;
            flex: 1;
            color: #000;
        }
        &__yen {
            font-size: .12rem;
        }
    }
}
</style>
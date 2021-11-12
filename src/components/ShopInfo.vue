<template>
    <div class="shop">
        <img class="shop__img" :src="item.imgurl"/>
        <div class="shop__content" :class=" hideBorder ? '' : 'shop__bordered'">
            <div class="shop__content__title">{{item.name}}</div>
            <div class="shop__content__tags">
                <span class="shop__content__tag">月售:{{item.sales}}+</span>
                <span class="shop__content__tag">起送:￥{{item.expressLimit}}</span>
                <span class="shop__content__tag">基础运费:￥{{item.expressPrice}}</span>
            </div>
            <p class="shop__content__highlight">{{item.slogan}}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ShopInfo',
    props: {
        item: [Array, Object],
        hideBorder: Boolean,
        //index: Number
    }
}
</script>

<style lang="scss" scoped>
@import '../style/viriables.scss';
.shop {
    display: flex;
    padding-top: .12rem;
    &__img {
        width: .56rem;
        height: .56rem;
        margin-right: .16rem;
    }
    &__bordered {
        border-bottom: .01rem solid $content-bgColor;
    }
    &__content {
        flex: 1;
        padding-bottom: .12rem;
        
        &__title {
            line-height: .22rem;
            font-size: .16rem;
            color: $content-fontcolor;
        }
        &__tags {
            margin: 0.08rem 0 0 0;
            line-height: .18rem;
            font-size: .13rem;
            color: $content-fontcolor;
        }
        &__tag {
            margin-right: .16rem;
        }
        &__highlight {
            line-height: .18rem;
            font-size: .13rem;
            color: #E93B3B;
            margin: .08rem 0 0 0;
        }
    }
}
</style>
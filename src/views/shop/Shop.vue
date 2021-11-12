<template>
    <div class="wrapper">
        <div class="search">
            <div class="search__back iconfont" @click="handleBack">&#xe685;</div>
            <div class="search__content">
                <span class="search__content__icon iconfont">&#xe602;</span>
                <input class="search__content__input" placeholder="请输入商品名称搜索"/>
            </div>
        </div>

        <ShopInfo :item="item" :hideBorder="true" v-show="item.imgurl"/>

        <Content :shopName="item.name" />

        <Cart />
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request.js'
import ShopInfo from '../../components/ShopInfo'
import Content from './Content'
import Cart from './Cart'

//获取该商铺信息
const getShopInfoEffect = () => {
    //从上页传递来的参数
    const route = useRoute()//console.log(route)//console.log(route.params.id)

    const data = reactive({ item: {} })
    //const item = reactive({})//这写法为啥不行？
    const getData = async () => {
        const result = await get(`/api/shop/${route.params.id}`)
        //console.log(result)
        if(result?.errno === 0 && result?.data) {
            data.item = result.data
        }
    }
    const { item } = toRefs(data)
    return { getData, item }
}

export default {
    name: 'Shop',
    components: {
        ShopInfo,
        Content,
        Cart
    },
    setup() {
        const router = useRouter();
        const { getData, item } = getShopInfoEffect();
        //获取数据
        getData();

        const handleBack = () => {
            router.back()
        }
        return { item, handleBack }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper {
    padding: 0 .18rem;
}
.search {
    margin: .2rem 0 0 0;
    display: flex;
    align-items: center;
    &__back {
        width: .3rem;
        font-size: .2rem;
        color: #B6B6B6;
    }
    &__content {
        display: flex;
        align-items: center;
        flex: 1;
        background: #f5f5f5;
        border-radius: .16rem;
        &__icon {
            margin: 0 .12rem 0 .16rem;
            color: #8a7c7c;
        }
        &__input {
            width: 100%;
            border: none;
            background: none;
            outline: none;
            height: .32rem;
            padding-right: .2rem;
            color: $content-fontcolor;
        }
    }
}
</style>
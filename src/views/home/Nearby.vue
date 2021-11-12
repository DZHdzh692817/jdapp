<template>
    <div class="nearby">
        <h3 class="nearby__title">附件店铺</h3>
        <router-link :to="`/shop/${item.id}`" v-for="(item, index) in nearbyList" :key="index">
             <ShopInfo :item="item"/>
        </router-link>
       
        <!-- <div class="nearby__item" v-for="(item, index) in nearbyList" :key="index">
            <img class="nearby__item__img" :src="item.imgurl"/>
            <div class="nearby__content">
                <div class="nearby__content__title">{{item.name}}</div>
                <div class="nearby__content__tags">
                    <span class="nearby__content__tag">月售:{{item.sales}}+</span>
                    <span class="nearby__content__tag">起送:￥{{item.expressLimit}}</span>
                    <span class="nearby__content__tag">基础运费:￥{{item.expressPrice}}</span>
                </div>
                <p class="nearby__content__highlight">{{item.slogan}}</p>
            </div>
        </div> -->
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '../../utils/request.js'
import ShopInfo from '../../components/ShopInfo'

const nearByEffect= () => {
    const nearbyList = ref([]);
    const getNearbyList = async () => {
        const result = await get('/api/shop/hot-list')
        //console.log(result)
        if(result?.errno === 0 && result?.data?.length) {
            nearbyList.value = result.data
        }
    }
    return { nearbyList, getNearbyList }
}

export default {
  name: 'Nearby',
  components: { ShopInfo },
  setup () {
    const router = useRouter();
    const { nearbyList, getNearbyList } = nearByEffect();
    //获取"附件店铺"数据
    getNearbyList();

    return {
      nearbyList, getNearbyList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.nearby {
    &__title {
        margin: .16rem 0 .02rem 0;
        font-size: .18rem;
        font-weight: normal;
        color: $content-fontcolor;
    }
    a {
        text-decoration: none;
    }
    &__item {
        display: flex;
        padding-top: .12rem;
        &__img {
            width: .56rem;
            height: .56rem;
            margin-right: .16rem;
        }
    }
    &__content {
        flex: 1;
        padding-bottom: .12rem;
        border-bottom: .01rem solid $content-bgColor;
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

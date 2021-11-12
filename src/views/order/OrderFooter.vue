<template>
    <div class="order">
        <div class="order__price">实付金额 &yen; <b>{{calculations.price}}</b></div>
        <div class="order__btn" @click="() => handleSubmit(true)">提交订单</div>
    </div>

    <div class="mask" v-if="showConfirm" @click="() => handleSubmit(false)">
        <div class="mask__content" @click.stop>
            <h3 class="mask__content__title">确认要离开收银台?</h3>
            <p class="mask__content__desc">请尽快完成支付,否则将被取消</p>
            <div class="mask__content__btns">
                <div class="mask__content__btn mask__content__btn--first" @click="() => handleConfirm(true)">取消订单</div>
                <div class="mask__content__btn mask__content__btn--last" @click="() => handleConfirm(false)">确认支付</div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { post } from '../../utils/request.js'
import { useCommonCartEffect } from '../../effects/cartEffects'

//下单相关
const useMakeOrderEffect = (shopId, shopName, productList) => {

    const store = useStore();
    const router = useRouter();

    const handleConfirm = async (isCanceled) => {
        //console.log(productList)
        const products = []
        for(let i in productList.value) {
            const product = productList.value[i]
            if(product.count > 0) {
                products.push({
                    id: parseInt(product.id, 10),
                    num: product.count
                })
            } 
        }
        //console.log(products)
        // const products = productList.value.map(item => ({
        //     id: item.id,
        //     num: item.count
        // }))
        try {
            const result = await post('/api/order', {
                addressId: 2,
                shopId,
                shopName: shopName.value,
                isCanceled,
                products,
            })
            //console.log(result)
            if(result.errno == 0 ) {
                //之后要清空购物车
                store.commit('clearCartData', shopId)
                router.push({name: 'OrderList'});//跳转到首页//console.log('登录成功')
            }
            
        } catch(e) {
            //showFilter('提示下单失败 失败~')
        }
    }
    return { handleConfirm }
}

//蒙层相关
const useShowMaskEffect = () => {
    const showConfirm = ref(false)

    const handleSubmit = (status) => {
        showConfirm.value = status
    }
    return { showConfirm, handleSubmit }
}

export default {
    name: 'OrderFooter',
    setup () {
        
        const route = useRoute();

        const shopId = parseInt(route.params.id, 10)
        const { calculations, shopName, productList } = useCommonCartEffect(shopId);

        const { handleConfirm } = useMakeOrderEffect(shopId, shopName, productList);
        const { showConfirm, handleSubmit } = useShowMaskEffect();

        return { calculations, handleConfirm, showConfirm, handleSubmit }
    }
}
</script>

<style lang="scss" scoped>
.order {
    position: absolute;
    display: flex;
    height: .49rem;
    line-height: .49rem;
    background: #fff;
    left: 0;
    right: 0;
    bottom: 0;
    &__price {
        flex: 1;
        text-indent: .24rem;
        font-size: .14rem;
        color: #333;
    }
    &__btn {
        width: .98rem;
        background: #0091FF;
        color: #fff;
        text-align: center;
        font-size: .14rem;
    }
}
.mask {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.50);
    &__content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 3rem;
        height: 1.5rem;
        background: #fff;
        border-radius: .04rem;
        text-align: center;
        &__title {
            margin: .2rem 0 0 0;
            line-height: .26rem;
            font-size: .16rem;
            color: #333;
        }
        &__desc {
            font-size: .14rem;
            color: #666666;
        }
        &__btns {
            display: flex;
            margin: .24rem .58rem 0 .58rem;
        }
        &__btn {
            flex: 1;
            width: .8rem;
            line-height: .32rem;
            font-size: .12rem;
            border-radius: .16rem;
            &--first {
                margin-right: .12rem;
                color: #0091FF;;
                border: .01rem solid #0091FF;
            }
            &--last {
                margin-left: .12rem;
                background: #0091FF;
                color: #fff;
            }
        }
    }
}
</style>
<template>
    <div class="wrapper">
        <div class="title">我的订单</div>
        <div class="orders">
            <div class="order" v-for="(item, index) in list" :key="index">
                <div class="order__title">
                    {{item.shopName}}
                    <span class="order__status">{{ item.isCancel ? '已取消' : '已下单'}}</span>
                </div>
                <div class="order__content">
                    <div class="order__content__imgs">
                        <template v-for="(innerItem, innerIndex) in item.products" :key="innerIndex">
                            <img class="order__content__img" :src="innerItem.product.img" v-if="innerIndex <= 3"/>
                        </template>
                    </div>
                    <div class="order__content__info">
                        <div class="order__content__price">{{item.total}}</div>
                        <div class="order__content__count">共{{item.count}}件</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Docker :currentIndex="2"/>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'
import Docker from '../../components/Docker.vue'

//处理订单列表逻辑
const useOrderListEffect = () => {
    const data = reactive({ list: []})
    const getOrderList = async () => {
        const result = await get('/api/order')
        //console.log(result)
        if(result?.errno === 0 && result?.data?.length) {
            //console.log(result?.data)
            const orderList = result.data
            orderList.forEach(order => {
                const products = order.products || []
                let total = 0
                let count = 0
                products.forEach((productItem)=> {
                    total += (productItem?.product.price * productItem?.orderSales) || 0
                    count += productItem?.orderSales || 0
                })
                order.total = total
                order.count = count
            });
            //console.log(orderList)
            data.list = orderList // result.data
        }
    }
    getOrderList()
    const { list } = toRefs(data)
    return { list }
}

export default {
    name: 'OrderList',
    components: { Docker },
    setup() {
        const { list } = useOrderListEffect()
        //console.log(list)
        return { list }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    overflow-y: auto;
    position: absolute;
    left: 0;
    top: 0;
    bottom: .5rem;
    right: 0;
    background-color: rgb(248, 248, 248);
}
.title {
    line-height: .44rem;
    font-size: .16rem;
    color: #333;
    background-color: #fff;
    text-align: center;
}
.orders {

}
.order {
    margin: .16rem .18rem;
    padding: .16rem;
    background-color: #fff;
    &__title {
        margin-bottom: .16rem;
        line-height: .22rem;
        font-size: .16rem;
        color: #333;
    }
    &__status {
        float: right;
        font-size: .14rem;
        color: #999;
    }
    &__content {
        display: flex;
        &__imgs {
            flex: 1;
        }
        &__img {
            width: .35rem;
            height: .35rem;
            margin-right: .12rem;
        }
        &__info {
            width: .7rem;
        }
        &__price {
            margin-bottom: .04rem;
            line-height: .2rem;
            font-size: .14rem;
            color: #e93b3b;
            text-align: right;
        }
        &__count {
            color: #333;
            line-height: .14rem;
            font-size: .12rem;
            text-align: right;
        }
    }
}
</style>
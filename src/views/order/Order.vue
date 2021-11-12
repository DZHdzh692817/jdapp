<template>
    <div class="wrapper">
        <TopArea />

        <ProductList />

        <OrderFooter />
    </div>
</template>

<script>
import TopArea from './TopArea'
import ProductList from './ProductList'
import OrderFooter from './OrderFooter'

export default {
    name: 'Order',
    components: {
        TopArea,
        ProductList,
        OrderFooter
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #eee;
    overflow-y: scroll;
}
</style>
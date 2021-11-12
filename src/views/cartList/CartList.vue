<template>
    <div class="wrapper">
        CartList购物车列表 留给自己开发吧
    </div>
    <Docker :currentIndex="1"/>
</template>

<script>
import Docker from '../../components/Docker.vue'
export default {
    name: 'CartList',
    components: { Docker }
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
    padding: 0 .18rem .2rem .18rem;
}
</style>
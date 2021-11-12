<template>
    <div class="wrapper">
        <StaticPart />
        <Nearby />
    </div>
    <Docker :currentIndex="0"/>
</template>

<script>
import StaticPart from './StaticPart'
import Nearby from './Nearby.vue'
import Docker from '../../components/Docker.vue'
export default {
  name: 'Home',
  components: { StaticPart, Nearby, Docker }
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
// .docker__item {
//     flex: 1;
//     text-align: center;
//     .iconfont {
//         margin: .07rem 0 .02rem 0;
//         font-size: .18rem;
//     }
// }
// .docker__item--active {
//     color: #1FA4FC;
// }
// .docker__title {
//     // font-size: .1rem;
//     font-size: 20px;
//     transform: scale(.5, .5);
//     transform-origin: center top;
// }
</style>

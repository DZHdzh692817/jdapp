<template>
    <div class="top">
        <div class="top__header">
            <div class="iconfont top__header__back" @click="handleBack()">&#xe685;</div>
            确认订单
        </div>
        <div class="top__receiver">
            <div class="top__receiver__title">收货地址</div>
            <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
            <div class="top__receiver__info">
                <span class="top__receiver__info__name">女生</span>
                <span class="top__receiver__info__name">1804454545</span>
                <span class="top__receiver__info__icon iconfont">&#xe666;</span>
            </div>
        </div>
    </div>  
</template>

<script>
import { useRouter } from 'vue-router'
export default {
    name: 'TopArea',
    setup () {
        const router = useRouter();
        // 返回上一页
        const handleBack = () => {
            router.back()
        }

        return { handleBack  }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.top {
    position: relative;
    height: 1.96rem;
    background-size: 100% 1.59rem;
    background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
    background-repeat: no-repeat;
    
    &__header {
        position: relative;
        padding-top: .2rem;
        // line-height: .24rem;
        color: #fff;
        font-size: .16rem;
        text-align: center;
        &__back{
            position: absolute;
            margin-left: .18rem;
        }
    }
    &__receiver {
        position:absolute;
        left: .18rem;
        right: .18rem;
        bottom: 0;
        height: 1.11rem;
        background: #fff;
        border-radius: .04rem;
        &__title {
            line-height: .22rem;
            padding: .16rem 0 .14rem .16rem;
            font-size: .16rem;
            color: #333;
        }
        &__address {
            padding: 0 .4rem 0 .16rem;
            font-size: .14rem;
            color: #333;
            line-height: .2rem;
        }
        &__info {
            padding: .06rem 0 0 .16rem;
            &__name {
                margin-right: .16rem;
                line-height: .18rem;
                font-size: .12rem;
                color: #333;
            }
            &__icon {
                position: absolute;
                right: .16rem;
                top: .5rem;
                color: #666;
                font-size: .2rem;
            }
        }
    }
}
</style>
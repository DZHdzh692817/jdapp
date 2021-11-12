<template>
    <div class="position">
        <span class="iconfont position__icon">&#xe606;</span>
        北京理工大学国防科技园2号楼10层
        <span class="iconfont position__notice">&#xe613;</span>
    </div>
    <div class="search">
        <span class="iconfont">&#xe602;</span>
        <span class="search__text">山姆会员商店优惠商品</span>
    </div>
    <div class="banner">
        <img class="banner__img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg"/>
    </div>
    <div class="icons">
        <div class="icons__item" v-for="(item, index) in iconsList" :key="index">
            <img class="icons__item__img" :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"/>
            <p class="icons__item__desc">{{item.desc}}</p>
        </div>
    </div>
    <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconsList = [
      { imgName: '超市', desc: '超市便利' },
      { imgName: '菜市场', desc: '菜市场' },
      { imgName: '水果店', desc: '水果店' },
      { imgName: '鲜花', desc: '鲜花绿植' },
      { imgName: '医药健康', desc: '医药健康' },
      { imgName: '家居', desc: '家居' },
      { imgName: '蛋糕', desc: '蛋糕' },
      { imgName: '签到', desc: '签到' },
      { imgName: '大牌免运', desc: '大牌免运' },
      { imgName: '红包', desc: '红包套餐' }
    ]
    return {
      iconsList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.position {
    color: $content-fontcolor;
    position: relative;
    padding: .16rem .24rem .16rem 0;
    line-height: .22rem;
    font-size: .16rem;
    @include ellipsis;
    //优先级高点
    .position__icon {
        position: relative;
        top:.01rem;
        font-size: .2rem;
    }
    .position__notice {
        position:absolute;
        right: 0;
        top:.17rem;
        font-size: .2rem;
    }
}
.search {
    margin-bottom: .12rem;
    line-height: .32rem;
    background: #f5f5f5;
    color: #B7B7B7;
    border-radius: .16rem;
    .iconfont {
        margin-left: .16rem;
        margin-right: .12rem;
        font-size: .16rem;
    }
    &__text {
        font-size: .14rem;
    }
}
.banner {
    // 防止加载前抖动
    height: 0;
    overflow: hidden;
    padding-bottom: 25.4%;
    &__img {
        width: 100%;
    }
}
.icons {
    display: flex;
    flex-wrap: wrap;
    margin-top: .16rem;
    &__item {
        width: 20%;
        &__img {
            display: block;
            width: .4rem;
            height: .4rem;
            margin: 0 auto;
        }
        &__desc {
            margin: .06rem 0 .16rem 0;
            text-align: center;
            color: $content-fontcolor;
        }
    }
}
.gap {
    margin: 0 -.18rem;
    height: .1rem;
    background:$content-bgColor;
}
</style>

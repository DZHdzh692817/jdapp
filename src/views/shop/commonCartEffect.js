//购物车相关逻辑
import { computed } from 'vue'
import { toRefs } from 'vue'
import { useStore } from 'vuex'
export const useCommonCartEffect = (shopId) => {
    const store = useStore()
    //const { cartList } = toRefs(store.state)
    const cartList = store.state.cartList;
    const changeCartItemInfo = (shopId, productId, productInfo, num) => {
        //点击加入购物车
        store.commit('changeCartItemInfo', {
            shopId,
            productId,
            productInfo,
            num
        }) 
        //console.log(shopId, productId, productInfo)
    }

    const productList = computed(()=> {
        const productList = cartList[shopId]?.productList || []
        return productList
    })

    return { cartList, changeCartItemInfo, productList }
}
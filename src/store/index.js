import { createStore } from 'vuex'

//通过LocalStorage实现购物车信息持久存储
const setLocalCartList = (state) => {
    const { cartList } = state;
    const cartListString = JSON.stringify(cartList) 
    localStorage.cartList = cartListString
}

const getLocalCartList = () => {
    // return JSON.parse(localStorage.cartList) || {}
    try {
        return JSON.parse(localStorage.cartList);//处理jsan.parse最好用try catch
    } catch(e) {
        return {}
    }
    
}

export default createStore({
  state: {
    //购物车
    //第一层是商铺的id shopId
    //第二层是商品id productId
    //第三层是商品内容和购物数量
    cartList: getLocalCartList()
    // shopId: {
    //     shopName: '沃尔玛',
    //     productList:{
    //          productId: {
    //              id: 1,
    //              name: '',
    //              imgurl: ''
    //          }
    //   }
    // }
  },
  mutations: {
    changeCartItemInfo(state, payload) {
        const { shopId, productId, productInfo, num } = payload;
        let shopInfo = state.cartList[shopId] || {
            shopName: '',
            productList: {}
        };
        //第一次传递过来shi
        // if(!shopInfo) {
        //     shopName = '';
        //     productList = {};
        // }
        let product = shopInfo.productList[productId];
        if(!product) {
            product = productInfo;
            product.count = 0;
        }
        product.count = product.count + num;//加 减购物车数量
        if(num > 0) {
            product.check = true
        }
        if(product.count < 0) {
            product.count = 0
        }
        shopInfo.productList[productId] = product;
        //重新传给state
        state.cartList[shopId] = shopInfo;
        //console.log(state.cartList)
        //console.log(shopId, productId, productInfo)

        setLocalCartList(state)

    },
    //选中和取消选中单个
    changeCartItemChecked(state, payload) {
        const { shopId, productId } = payload;
        const product = state.cartList[shopId].productList[productId];
        product.check = !product.check;

        setLocalCartList(state)
    },

    //清空购物车
    clearCartProducts(state, payload) {
        const { shopId } = payload;
        state.cartList[shopId].productList = {};//变成空对象

        setLocalCartList(state)
    },
    //点击全选
    setCartItemsChecked(state, payload) {
        const { shopId } = payload;
        const products = state.cartList[shopId].productList;
        if(products) {
            for(let key in products) {
                const product = products[key]
                product.check = true
            }
        }
        
        setLocalCartList(state)
    },

    //店铺名称
    changeShopName(state, payload) {
        const { shopId, shopName } = payload;
        //存在就好 不存在就默认为空
        const shopInfo = state.cartList[shopId] || {
            shopName: '',
            productList: {}
        };
        shopInfo.shopName = shopName
        state.cartList[shopId] = shopInfo

        setLocalCartList(state)
    },
    //清空购物车
    clearCartData(state, shopId) {
        state.cartList[shopId].productList = {}
    }
  },
  actions: {
  },
  modules: {
  }
})

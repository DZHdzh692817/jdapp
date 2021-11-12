import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */'../views/home/Home')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */'../views/register/Register'),
    //beforeEnter是进入这个login路由前
    beforeEnter: (to, from, next) => {
        const { isLogin } = localStorage;
        isLogin ? next({name: 'Home'}) : next();
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */'../views/login/Login'),
    //beforeEnter是进入这个login路由前
    beforeEnter: (to, from, next) => {
        const { isLogin } = localStorage;
        isLogin ? next({name: 'Home'}) : next();
    }
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */'../views/shop/Shop')
  },
  {
    path: '/order/:id',
    name: 'Order',
    component: () => import(/* webpackChunkName: "order" */'../views/order/Order')
  },
  {
    path: '/orderList/',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "orderList" */'../views/orderList/OrderList')
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "cartList" */'../views/cartList/CartList')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//路由守卫实现基础登录校验功能
//登录了才能允许访问首页
//to指你要跳到哪个页面 from指你从哪里来的
//beforeEach是不管什么路由访问前都要走beforeEach
router.beforeEach((to, from, next) => {
    //console.log(to, from);
    //next是中间件的意思 表示正常往下执行下一个
    const { isLogin } = localStorage;
    const { name } = to;
    const isLoginOrRegister = ( name === 'Login' || name === 'Register')
    if(isLogin || isLoginOrRegister) {
        next();
    } else {
        next({name: 'Login'});
    }
})

export default router

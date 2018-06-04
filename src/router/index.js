import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList' //商品列表
import Cart from '@/views/Cart' //商品列表
import Address from '@/views/Address' //配送地址
import OrderConfirm from '@/views/OrderConfirm' //next
import OrderSuccess from '@/views/OrderSuccess' //订单成功页

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [{
            path: '*',
            redirect: '/list'
        },
        { //商品列表页
            path: '/list',
            name: 'GoodsList',
            component: GoodsList
        },
        { //购物车
            path: '/cart',
            name: 'Cart',
            component: Cart
        },
        { //配送地址页
            path: '/address',
            name: 'Address',
            component: Address
        },
        { //next
            path: '/orderConfirm',
            name: 'OrderConfirm',
            component: OrderConfirm
        },
        { //订单成功页
            path: '/orderSuccess',
            name: 'OrderSuccess',
            component: OrderSuccess
        }
    ]
})
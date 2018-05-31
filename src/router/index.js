import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList' //商品列表
import Cart from '@/views/Cart' //商品列表

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [{
            path: '*',
            redirect: '/list'
        },
        { 
            path: '/list',
            name: 'GoodsList',
            component: GoodsList
        },
        { 
            path: '/cart',
            name: 'Cart',
            component: Cart
        }
    ]
})
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import vueLazyLoad from 'vue-lazyload' //图片加载钱loading   
import infiniteScroll from "vue-infinite-scroll" // 下拉加载更多
import {currency} from "@/util/util.js"; //金额格式化模块导入

import "@/assets/css/base.css";
import "@/assets/css/product.css";
import "@/assets/css/checkout.css";
import "@/assets/css/login.css";

// 图片懒加载插件的使用
Vue.use(vueLazyLoad, {
    "loading": "../static/loading-svg/loading-bars.svg"
})

//下拉加载更多调用
Vue.use(infiniteScroll);

//全局过滤器
Vue.filter("currency",currency);

//Vuex的使用
Vue.use(Vuex);
const store = new Vuex.Store({
    state:{
        "nickName":"",
        "cartCount":0,
    },
    mutations:{
        updateUserInfo(state,nickName){
            state.nickName = nickName;
        },
        updateCartCount(state,cartCount){
            state.cartCount += cartCount;
        },
        initCartCount(state,cartCount){
           state.cartCount = cartCount
        }

    }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
<template>
    <div class="order_success">
        <!-- 头部信息 -->
        <v-header></v-header>
        <!-- bread 面包屑导航 -->
        <v-bread>
        <span slot="bread">order success</span>
        </v-bread>
        <div class="container">
            <div class="page-title-normal">
            <h2 class="page-title-h2"><span>check out</span></h2>
            </div>
            <!-- 进度条 -->
            <div class="check-step">
            <ul>
                <li class="cur"><span>Confirm</span> address</li>
                <li class="cur"><span>View your</span> order</li>
                <li class="cur"><span>Make</span> payment</li>
                <li class="cur"><span>Order</span> confirmation</li>
            </ul>
            </div>

            <div class="order-create">
            <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
            <div class="order-create-main">
                <h3>Congratulations! <br>Your order is under processing!</h3>
                <p>
                <span>Order ID：{{orderId}}</span>
                <span>Order total：{{orderTotal|currency('¥')}}</span>
                </p>
                <div class="order-create-btn-wrap">
                <div class="btn-l-wrap">
                    <router-link class="btn btn--m" to="/cart">Cart List</router-link>
                </div>
                <div class="btn-r-wrap">
                    <router-link class="btn btn--m" to="/">Goods List</router-link>
                </div>
                </div>
            </div>
            </div>
        </div>
        <!-- //footer信息 -->
        <v-footer></v-footer>
    </div>
</template>
<script>
import Header from "@/components/Header";  //头部信息组件导入
import Footer from "@/components/Footer";  //footer信息组件导入
import Bread from "@/components/Bread";  //bread 面包屑信息组件导入
import Modal from "@/components/Modal";  //模态框组件导入
import axios from "axios";  //bread 面包屑信息组件导入
export default {
    data(){
        return{
            orderId:"",//订单号
            orderTotal:0,//订单总金额
        }
    },
    mounted () {
        this.orderId = this.$route.query.orderId;
        this.orderTotal = this.$route.query.total;
    },
    components:{
        "v-header":Header,
        'v-footer':Footer,
        'v-bread':Bread,
        'v-modal':Modal
    }
}
</script>
<style scoped>

</style>



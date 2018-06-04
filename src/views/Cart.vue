<template>
  <div class="cart-container">
      <!-- 头部信息 -->
        <v-header></v-header>
        <!-- bread 面包屑导航 -->
        <v-bread>
        <span slot="bread">My Cart</span>
        </v-bread>
      <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1"
         xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="icon-add" viewBox="0 0 32 32">
          <title>add2</title>
          <path class="path1"
                d="M15 17h-13.664c-0.554 0-1.002-0.446-1.002-1 0-0.552 0.452-1 1.002-1h13.664v-13.664c0-0.554 0.446-1.002 1-1.002 0.552 0 1 0.452 1 1.002v13.664h13.664c0.554 0 1.002 0.446 1.002 1 0 0.552-0.452 1-1.002 1h-13.664v13.664c0 0.554-0.446 1.002-1 1.002-0.552 0-1-0.452-1-1.002v-13.664z"></path>
        </symbol>
        <symbol id="icon-ok" viewBox="0 0 32 32">
          <title>ok</title>
          <path class="path1"
                d="M31.020 0.438c-0.512-0.363-1.135-0.507-1.757-0.406s-1.166 0.435-1.529 0.937l-17.965 24.679-5.753-5.67c-0.445-0.438-1.035-0.679-1.664-0.679s-1.219 0.241-1.664 0.679c-0.917 0.904-0.917 2.375 0 3.279l7.712 7.6c0.438 0.432 1.045 0.681 1.665 0.681l0.195-0.008c0.688-0.057 1.314-0.406 1.717-0.959l19.582-26.9c0.754-1.038 0.512-2.488-0.538-3.233z"></path>
        </symbol>
        <symbol id="icon-edit" viewBox="0 0 32 32">
          <title>edit</title>
          <path class="path1"
                d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z"></path>
        </symbol>
        <symbol id="icon-del" viewBox="0 0 32 32">
          <title>delete</title>
          <path class="path1"
                d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"></path>
          <path class="path2"
                d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
          <path class="path3"
                d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
          <path class="path4"
                d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
        </symbol>
        <symbol id="icon-clock" viewBox="0 0 32 32">
          <title>clock</title>
          <path class="path1" fill="#605f5f"
                d="M16 29c-7.168 0-13-5.831-13-13s5.832-13 13-13c7.168 0 13 5.832 13 13s-5.832 13-13 13zM16 0c-8.822 0-16 7.178-16 16s7.178 16 16 16c8.822 0 16-7.178 16-16s-7.178-16-16-16z"></path>
          <path class="path2" fill="#605f5f"
                d="M23.958 21.837l-6.958-6.489v-6.282c0-0.827-0.673-1.5-1.5-1.5s-1.5 0.673-1.5 1.5v6.934c0 0.414 0.174 0.814 0.477 1.098l7.435 6.934c0.279 0.259 0.642 0.402 1.023 0.402 0.415 0 0.814-0.174 1.096-0.477 0.564-0.605 0.532-1.555-0.073-2.12z"></path>
        </symbol>
      </defs>
    </svg>
    <div class="container">
      <div class="cart">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>My Cart</span></h2>
        </div>
        <div class="item-list-wrap">
          <div class="cart-item">
            <div class="cart-item-head">
              <ul>
                <li>Items</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Subtotal</li>
                <li>Edit</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="(item,index) in cartList">
                <div class="cart-tab-1">
                  <div class="cart-item-check">
                    <a href="javascipt:;" class="checkbox-btn item-check-btn" :class="{'check':item.checked}" @click="checked('one',item)">
                      <svg class="icon icon-ok">
                        <use xlink:href="#icon-ok"></use>
                      </svg>
                    </a>
                  </div>
                  <div class="cart-item-pic">
                    <img :src="'/static/' + item.productImg" :alt="item.productName">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.productName}}</div>
                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">{{item.productPrice}}</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self select-self-open">
                      <div class="select-self-area">
                        <a class="input-sub" @click="edit('subtract',item)">-</a>
                        <span class="select-ipt">{{item.productNum}}</span>
                        <a class="input-add" @click="edit('add',item)">+</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{item.productNum * item.productPrice | currency("¥")}}</div>
                </div>
                <div class="cart-tab-5">
                  <div class="cart-item-opration">
                    <a href="javascript:;" class="item-edit-btn" @click="fnDelete(item)">
                      <svg class="icon icon-del">
                        <use xlink:href="#icon-del"></use>
                      </svg>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="cart-foot-wrap">
          <div class="cart-foot-inner">
            <div class="cart-foot-l">
              <div class="item-all-check">
                <a href="javascipt:;" @click="checked('all')">
                  <span class="checkbox-btn item-check-btn" :class="{'check':checkedAll}">
                      <svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>
                  </span>
                  <span>Select all</span>
                </a>
              </div>
            </div>
            <div class="cart-foot-r">
              <div class="item-total">
                Item total: <span class="total-price">{{totalMoney == null ? 0 : totalMoney | currency("¥")}}</span>
              </div>
              <div class="btn-wrap">
                <a class="btn btn--red" :class="{'btn--dis':count == 0}" @click="checkout">Checkout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- //footer信息 -->
    <v-footer></v-footer>
    <!-- //modal信息 -->
    <v-modal v-show="mdshow" :mdshow="mdshow"  @modalHide="modalHide">
        <div slot="message">
          <p>{{err_info}}</p>
        </div>
        <div slot="btnGroup">
          <a href="javascript:;" class="btn btn--m" @click="mdshow = false">关闭</a>
        </div>
    </v-modal>
    <v-modal v-show="del_pop" :mdshow="del_pop"  @modalHide="modalHide">
        <div slot="message">
          <p>你确定要删除这条数据吗?</p>
        </div>
        <div slot="btnGroup">
          <a href="javascript:;" class="btn btn--m" @click="sure_del()">确定</a>
          <a href="javascript:;" class="btn btn--m" @click="del_pop = false">关闭</a>
        </div>
    </v-modal>
  </div>
</template>

<script>
import Header from "@/components/Header";  //头部信息组件导入
import Footer from "@/components/Footer";  //footer信息组件导入
import Bread from "@/components/Bread";  //bread 面包屑信息组件导入
import Modal from "@/components/Modal";  //模态框组件导入
import axios from "axios";  //bread 面包屑信息组件导入
export default {
  data () {
    return {
        cartList:[],//购物车列表
        mdshow:false,//modal显示隐藏
        del_pop:false,//删除modal显示
        err_info:'',//错误信息
        productItem:"",//产品对象
        totalMoney:null,//总金额
        checkedAll:false,//选中所有
        count:0,
    }
  },
  mounted(){
      this.getCartList()
  },
  methods:{
    getCartList(flag){
        this.count = 0;
        axios.post("/users/cartList",{}).then(res =>{
            if(res.data.status == "0"){
                this.cartList = res.data.result;
                this.totalMoney = null
                for(var i = 0; i < this.cartList.length; i++){
                  if(this.cartList[i].checked){               
                    this.totalMoney += this.cartList[i].productNum * this.cartList[i].productPrice
                    this.count ++;
                  }
                };
                if(this.count == this.cartList.length){
                  this.checkedAll = true;
                }else{
                  this.checkedAll = false;
                }
                
            }else{
                this.err_info = res.data.Msg;
            }
        })
    },
    //关闭modal框
    modalHide(){
        this.mdshow = false;
        this.del_pop = false;
        this.productItem.productId = "";
    },
    //删除一个商品
    fnDelete(item){
      this.del_pop = true;
      this.productItem = item;
    },
    //删除
    sure_del(){
      axios.post("/users/cartDel",{
        "productId":this.productItem.productId
      }).then(res =>{
        if(res.data.status == "0"){
          this.del_pop = false;
          this.getCartList();
          this.$store.commit("updateCartCount",-this.productItem.productNum)
        }else{
          this.del_pop = true;
        }
      })
    },
    //商品数量减
   edit(flag, item){
      if(flag == "add"){
        item.productNum++;
      }else{
        if(item.productNum == 1){
          return;
        };
         item.productNum--;
      }
      axios.post("/users/cartEdit",{
        "productId":item.productId,
        "productNum":item.productNum
      }).then(res =>{
        if(res.data.status == "0"){
          this.getCartList();
          if(flag == "add"){
            this.$store.commit("updateCartCount",1)
          }else{
            this.$store.commit("updateCartCount",-1)
          }
          
        }else{
        }
      })
    },
    //选中商品
    checked(flag,item){
      let productId = ""
      let checked = false;
      this.count = 0;
      if(flag == "one"){
        productId = item.productId;
        checked = !item.checked
      }else{
        for(var i = 0; i < this.cartList.length; i++){
          if(this.cartList[i].checked){
            this.count ++;
          }
        };
        if(this.count == this.cartList.length){
          checked = false
        }else{
          checked = true;
        }
      }
      axios.post("/users/checked",{
        "productId":productId,
        "checked":checked
      }).then(res =>{
        if(res.data.status == "0"){
          this.getCartList();
        }else{
        }
      })
    },
    //配送地址
    checkout(){
      if(this.count != 0){
        this.$router.push({
          path:"/address"
        })
      }
    }
  },
  //局部过滤器
  //filters:{
    //货币格式化
   // currency:currency
  //},
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

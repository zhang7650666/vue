<template>
  <div>
    <!-- 头部信息 -->
    <v-header></v-header>
    <!-- bread 面包屑导航 -->
    <v-bread>
      <span slot="bread">Goods</span>
    </v-bread>
     
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result"> 
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" :class="{'cur': priceChecked == 'all'}" @click="priceChecked = 'all'">All</a></dd>
                <dd v-for="(price, index) in priceFilter">
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" :class="{'cur': priceChecked == index}">{{price.startPrice}} - {{price.endPrice}}</a>
                </dd>
              </dl>
            </div>
            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <!-- 下拉加载更多div -->
                  <ul class="clearfix">
                    <li v-for="(item, index) in goodsList">
                      <div class="pic">
                        <a href="#"><img v-lazy="'/static/' + item.productImg"  alt=""></a>
                      </div>
                      <div class="main">
                        <div class="name">{{item.productName}}</div>
                        <div class="price">{{item.productPrice}}</div>
                        <div class="btn-area" @click="addCart(item.productId)">
                          <a href="javascript:;" class="btn btn--m">加入购物车</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="15" ref="more">
                    <img src="../assets/loading-spinning-bubbles.svg" alt="" v-show="loading">
                  </div>
                <!-- /下拉加载更多div -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 浮层 -->
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
      <!-- //footer信息 -->
      <v-footer></v-footer>
    </div>
</template>

<script>
import Header from "@/components/Header";  //头部信息组件导入
import Footer from "@/components/Footer";  //footer信息组件导入
import Bread from "@/components/Bread";  //bread 面包屑信息组件导入
import axios from "axios";  //bread 面包屑信息组件导入
export default {
  name: 'GoodList',
  data () {
    return {
      goodsList:[],//商品列表数组
      priceFilter:[//价格筛选列表
        {
          startPrice:0.00,
          endPrice:500.00
        },
        {
          startPrice:500.00,
          endPrice:1000.00
        },
        {
          startPrice:1000.00,
          endPrice:2000.00
        },
        {
          startPrice:2000.00,
          endPrice:4000.00
        }
      ],
      priceChecked:"all",//当前选中价格
      filterBy:false,//小屏下显示标识
      overLayFlag:false, //遮罩层是否显示
      sortFlag:true, //商品价格排序   默认从高到低
      page:1,//分页 页码  默认第一页
      pageSize:6,//默认6条一页
      busy:true, //busy  为false  可以下拉  为true 时不能下拉
      loading:false,//loading 显示隐藏
    }
  },
  mounted(){
    this.getGoodsList()
  },
  methods:{
    //商品列表数据请求
    getGoodsList(flag){
      this.loading = true;
      var params = {
        page:this.page,
        pageSize:this.pageSize,
        sort:this.sortFlag ? 1 : -1,
        priceLeave:this.priceChecked,
      }
      axios.get('/goods/list',{
        params:params
      }).then(res => {
        this.loading = false;
        if(res.data.status == "0"){
          
          //如果flag为true的时候，表示下拉加载更多
          if(flag){
             this.goodsList =this.goodsList.concat(res.data.result.Data);
            //如果没有数据了就让busy为ture  这样就不能滚动了;
            if(res.data.result.count < this.pageSize){
               this.busy = true;
               this.$refs.more.innerText = "已经是全部数据"
             }else{
               this.busy = false;
             }
          }else{
            this.goodsList = res.data.result.Data;
            this.busy = false;
            if(res.data.result.count < this.pageSize){
               this.$refs.more.innerText = "已经是全部数据"
             }
          }
        }else{
          this.goodsList = [];
        }
      }).catch(err => {
        console.log(err);
      })
    },
    //商品排序
    sortGoods(){
      this.sortFlag = !this.sortFlag;
      this.page = 1;
      this.getGoodsList()
    },
    //小屏下点击价格显示
    showFilterPop(){
      this.filterBy = true;
      this.overLayFlag = true;
    },
    //关闭价格弹框及浮层
    closePop(){
      this.filterBy = false;
      this.overLayFlag = false;
    },
    //点击价格函数
    setPriceFilter(index){
      this.priceChecked = index;
      this.closePop();
      this.page = 1;
      this.getGoodsList()
    },
    //下拉加载更多
    loadMore(){
      this.busy = true;
      let This = this
      console.log(22)
      setTimeout(() => {
        This.page ++;
        This.getGoodsList(true)
      }, 500);
    },
    //加入购物车
    addCart(productId){
      console.log(1)
      let params = {
        "productId":productId
      };
       axios.post('/goods/addCart',{
        params:params
      }).then(res => {
        if(res.data.status == "0"){
          alert("添加成功")
        }else{
          alert("添加失败")
        }
      })
    },
  },
  components:{
    "v-header":Header,
    'v-footer':Footer,
    'v-bread':Bread
  }

}
</script>
<style scoped>
  .load-more{
    height:100px;
    line-height:100px;
    text-align:center;
  }

</style>

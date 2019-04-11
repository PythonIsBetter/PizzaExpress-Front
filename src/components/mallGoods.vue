<template>
  <div class="good-item">
    <div style="">
      <div class="good-img" style="float: left">
        <a @click="openProduct(msg.id)">
          <img v-lazy="msg.imgPath" :alt="msg.name" :key="msg.imgPath">
        </a>
      </div>
      <div style="position:relative;text-align: center">
        <h6 class="good-title" v-html="msg.name" style="float: right;margin: 20px">{{msg.name}}</h6>
      </div>
       <div style="margin-left:5%;width: 90%">
         <h3 class="sub-title ellipsis" style="float: right;margin-top: 20px">{{msg.introduce}}</h3>
       </div>
      <div class="good-price pr">
        <div class="ds pa" style="position:absolute;text-align: center;margin-top: 25%;margin-left: 50%">
          <a @click="openProduct(msg.id)">
            <y-button text="查看详情"></y-button>
          </a>
          <y-button text="加入购物车"
                    style="margin-left: 10px"
                    @btnClick="addCart(msg.id,msg.prize,msg.name,msg.imgPath)"
                    classStyle="main-btn"
          ></y-button>
        </div>
        <div style="position:absolute;text-align: center;margin-top: 15%;margin-left: 75%">
          <p><span style="font-size:14px">￥</span>{{Number(msg.prize).toFixed(2)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import YButton from '/components/YButton'
  // import { addCart } from '/api/goods.js'
  import {mapMutations, mapState} from 'vuex'
  import {getStore} from '/utils/storage'

  export default {
    props: {
      msg: {
        salePrice: 0
      }
    },
    data () {
      return {}
    },
    methods: {
      ...mapMutations(['ADD_CART', 'ADD_ANIMATION', 'SHOW_CART']),
      goodsDetails (id) {
        this.$router.push({path: '/goodsDetails', query: {productId: id}})
      },
      openProduct (id) {
        this.$router.push({path: '/goodsDetails', query: {productId: id}})
      },
      addCart (id, price, name, img) {
        if (!this.showMoveImg) {     // 动画是否在运动
          let userId = getStore('userId')
          console.log('userID:' + userId)
          if (!userId) { // 登录了 直接存在用户名下
            this.$router.push({path: '/login'})
          } else { // 未登录 vuex
            this.ADD_CART({productId: id, salePrice: price, productName: name, productImg: img})
          }
          // 加入购物车动画
          var dom = event.target
          // 获取点击的坐标
          let elLeft = dom.getBoundingClientRect().left + (dom.offsetWidth / 2)
          let elTop = dom.getBoundingClientRect().top + (dom.offsetHeight / 2)
          // 需要触发
          this.ADD_ANIMATION({moveShow: true, elLeft: elLeft, elTop: elTop, img: img})
          if (!this.showCart) {
            this.SHOW_CART({showCart: true})
          }
        }
      }
    },
    computed: {
      ...mapState(['login', 'showMoveImg', 'showCart'])
    },
    mounted () {
    },
    components: {
      YButton
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../assets/style/mixin";
  @import "../assets/style/theme";

  .good-item {
    background: #fff;
    width: 100%;
    transition: all .5s;
    clear: both;
    height: 70%;
    padding: 0 0 25px;
    margin: 10px auto;
    .good-img {
      img {
        margin: 12px;
        @include wh(100px);
        display: block;
      }
    }
    .good-price {
      margin: 5px;
      height: 15px;
      text-align: center;
      line-height: 15px;
      color: #d44d44;
      font-family: Arial;
      font-size: 18px;
      font-weight: 700;
    }
    .good-title {
      font-size: 16px;
      color: #424242;
    }
    h3 {
      font-size: 12px;
      color: #d0d0d0;
      white-space: normal;
      word-wrap: break-word;
      word-break: break-all;
    }
    .item-right {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: hidden;
      position: relative;
      padding-left: 60px;
    }
  }
</style>

<template>
  <div>
    <y-shelf v-bind:title="orderTitle">
      <div slot="content">
        <!--暂时去除-->
        <!--<div v-loading="loading" element-loading-text="加载中..." style="min-height: 10vw;" v-if="orderList.length">-->
          <div class="orderStatus" v-if="orderStatus !== -1 && orderStatus !== 6">
            <el-steps :space="200" :active="orderStatus">
              <el-step title="下单" v-bind:description="createTime"></el-step>
              <el-step title="付款" v-bind:description="payTime"></el-step>
              <el-step title="制作" description=""></el-step>
              <el-step title="配送" description=""></el-step>
              <el-step title="交易成功" v-bind:description="finishTime"></el-step>
            </el-steps>
          </div>
          <div class="orderStatus-close" v-if="orderStatus === -1 || orderStatus === 6">
            <el-steps :space="780" :active="2">
              <el-step title="下单" v-bind:description="createTime"></el-step>
              <el-step title="交易关闭" v-bind:description="closeTime"></el-step>
            </el-steps>
          </div>
          <div class="status-now" v-if="orderStatus === 1">
            <ul>
              <li class="status-title"><h3>订单状态：待付款</h3></li>
              <li class="button">
                <el-button @click="orderPayment(orderId)" type="primary" size="small">现在付款</el-button>
                <el-button @click="_cancelOrder()" size="small">取消订单</el-button>
              </li>
            </ul>
            <p class="realtime">
              <span>您的付款时间还有 </span>
              <span class="red"><countDown v-bind:endTime="countTime" endText="已结束"></countDown></span>
              <span>，超时后订单将自动取消。</span>
            </p>
          </div>

          <!--进行中的订单-->
          <div class="status-now" v-if="orderStatus === 2">
            <ul>
              <li class="status-title"><h3>订单状态：进行中，请耐心等待送达</h3></li>
              <li class="button">
                <!--<el-button @click="orderPayment(orderId)" type="primary" size="small">修改订单</el-button>-->
                <el-button @click="_cancelOrder()" size="small">取消订单</el-button>
              </li>
            </ul>
            <!--<p class="realtime">-->
              <!--<span>请耐心等待骑手将订单送到您手中。</span>-->
            <!--</p>-->
          </div>

          <!--已取消的订单-->
          <div class="status-now" v-if="orderStatus === -1 || orderStatus === 6">
            <ul>
              <li class="status-title"><h3>订单状态：已取消</h3></li>
            </ul>
            <p class="realtime">
              <span>您的订单已取消。</span>
            </p>
          </div>

          <!--已完成的订单-->
          <div class="status-now" v-if="orderStatus === 5">
            <ul>
              <li class="status-title"><h3>订单状态：已完成</h3></li>
            </ul>
            <p class="realtime">
              <span>您的订单已交易成功，感谢您的惠顾！</span>
            </p>
          </div>

          <!--订单详情-->
          <div class="gray-sub-title cart-title">
            <div class="first">
              <div>
                <span class="order-id">商品名称</span>
              </div>
              <div class="f-bc">
                <span class="price">单价</span>
                <span class="num">数量</span>
                <span class="operation">小计</span>
              </div>
            </div>
          </div>

          <!--商品-->
          <div class="goods-table">
            <div class="cart-items" v-for="(item,i) in orderList" :key="i">
              <a @click="goodsDetails(item.menuItem.id)" class="img-box"><img :src="item.menuItem.imgPath" alt=""></a>
              <div class="name-cell ellipsis">
                <a @click="goodsDetails(item.menuItem.id)" title="" target="_blank">{{item.menuItem.name}}</a>
              </div>
              <div class="n-b">
                <div class="price">¥ {{Number(item.orderItem.actualUnitPrize).toFixed(2)}}</div>
                <div class="goods-num">{{item.orderItem.num}}</div>
                <div class="subtotal"> ¥ {{Number(item.orderItem.actualUnitPrize * item.orderItem.num).toFixed(2)}}</div>
              </div>
            </div>
          </div>
          <!--合计-->
          <div class="order-discount-line">
            <p style="font-size: 14px;font-weight: bolder;"><span style="padding-right:47px">商品总计：</span>
              <span style="font-size: 16px;font-weight: 500;line-height: 32px;">¥ {{orderTotal}}</span>
            </p>
            <p><span style="padding-right:30px">运费：</span><span style="font-weight: 700;">+ ¥ 0.00</span></p>
            <p class="price-total"><span>应付金额：</span><span class="price-red">¥ {{orderTotal}}</span></p>
          </div>

          <div class="gray-sub-title cart-title">
            <div class="first">
              <div>
                <span class="order-id">收货信息</span>
              </div>
            </div>
          </div>
          <div style="height: 155px;padding: 20px 30px;">
            <p class="address">姓名：{{ userName }}</p>
            <p class="address">联系电话：{{ tel }}</p>
            <p class="address">详细地址：{{ streetName }}</p>
            <!--<y-button text='确认收货'-->
                      <!--class="btn"-->
                      <!--@btnClick="_updateOrder"-->
                      <!--style="align-content: center; margin-bottom: 10px">-->
            <!--</y-button>-->
          </div>
          <!--<div class="gray-sub-title cart-title" v-if="orderStatus === 2">-->
            <!--<div class="first">-->
              <!--<div>-->
                <!--<span class="order-id">骑手信息</span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div v-if="orderStatus ===2">-->
        <div v-if="orderStatus === 3">
            <!--地图-->
            <b-map-component :start="factoryName" :end="streetName" style="margin-top: 20px" >
            </b-map-component>
            <y-button text='确认收货'
                      class="btn"
                      @btnClick="_updateOrder"
                      style="align-content: center; margin-bottom: 10px;margin: 10px;height: 50px;">
            </y-button>
          </div>
        </div>
    </y-shelf>
  </div>
</template>
<script>
  import {getOrderDet} from '/api/goods'
  import {orderComplete, orderCancel} from '/api/index.js'
  import YShelf from '/components/shelf'
  import {getStore} from '/utils/storage'
  import countDown from '/components/countDown'
  import BMapComponent from '/components/BMapComponent.vue'
  import YButton from '/components/YButton.vue'
  // 引入地图组件
  export default {
    data () {
      return {
        orderList: [0],
        userId: '',
        orderStatus: 0,
        orderId: '',
        userName: '',
        tel: '',
        streetName: '',
        factoryName: '',
        orderTitle: '',
        createTime: '',
        payTime: '',
        closeTime: '',
        finishTime: '',
        orderTotal: '',
        loading: true,
        countTime: 0
      }
    },
    props: {
    },
    methods: {
      message (m) {
        this.$message.error({
          message: m
        })
      },
      orderPayment (orderId) {
        window.open(window.location.origin + '#/order/payment?orderId=' + orderId)
      },
      goodsDetails (id) {
        window.open(window.location.origin + '#/goodsDetails?productId=' + id)
      },
      _getOrderDet () {
        let params = {
          // params: {
          orderId: this.orderId
          // }
        }
        getOrderDet(params).then(res => {
          console.log(res)
          if (res.orderStatus === '0') {
            this.orderStatus = 1
          } else if (res.orderStatus === '1') {
            this.orderStatus = 2
          } else if (res.orderStatus === '2') {
            this.orderStatus = 2
          } else if (res.orderStatus === '3') {
            this.orderStatus = 3
          } else if (res.orderStatus === '4') {
            this.orderStatus = 4
          } else if (res.orderStatus === '5') {
            this.orderStatus = -1
          } else if (res.orderStatus === '6') {
            this.orderStatus = 6
          }
          this.orderList = res.goodsList
          this.orderTotal = res.orderTotal
          this.userName = res.receiverAddress.receiverName
          this.tel = res.receiverAddress.receiverPhoneNum
          this.streetName = res.receiverAddress.address
          this.createTime = res.createDate
          this.closeTime = res.closeDate
          this.payTime = res.payDate
          this.factoryName = res.factoryLocation
          if (this.orderStatus === 5) {
            this.finishTime = res.finishDate
          } else {
            this.countTime = res.finishDate
          }
          this.loading = false
        })
      },
      _cancelOrder () {
        orderCancel({orderId: this.orderId}).then(res => {
          if (res.success === 'true') {
            this._getOrderDet()
          } else {
            this.message('对不起，超过十分钟无法取消订单')
          }
        })
      },
      _updateOrder () {
        orderComplete({orderId: this.orderId}).then(res => {
          console.log(res)
          if (res.success === 'true') {
            this.orderStatus = 5
            this.closeTime = res.closeTime
          } else {
            this.message('提交失败')
          }
        })
      }
    },
    created () {
      this.userId = getStore('userId')
      this.orderId = this.$route.query.orderId
      this.orderTitle = '订单号：' + this.orderId
      this._getOrderDet()
      console.log(this.userId)
      console.log(this.orderId)
    },
    components: {
      YShelf,
      countDown,
      BMapComponent,
      YButton
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/style/mixin";

  .orderStatus {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin: 50px -150px 20px 60px;
  }

  .orderStatus-close {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin: 50px -800px 20px 60px;
  }

  .status-now {
    background: #F6F6F6;
    border: 1px solid #dadada;
    border-radius: 5px;
    padding: 22px 30px 20px;
    margin: 0 30px 30px 30px;
    line-height: 38px;
  }

  .status-title {
    font-size: 18px;
    color: #666;
  }

  .button {
    float: right;
    margin: -37px 0 20px 0;
  }

  .realtime {
    border-top: 1px solid #dcdcdc;
    margin-top: 20px;
    padding-top: 26px;
  }

  .red {
    color: #d44d44;
  }

  .address {
    line-height: 38px;
    word-wrap: break-word;
    word-spacing: normal;
    word-break: break-all;
    color: #626262;
  }

  .img-box {
    border: 1px solid #EBEBEB;
    margin-left: -80px;
  }

  img {
    display: block;
    @include wh(80px);
  }

  .goods-table {
    .n-b {
      display: flex;
      align-items: center;
      justify-content: center;
      > div {
        color: #626262;
        font-weight: 700;
        width: 165px;
        text-align: center;
      }
    }
    .cart-items {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 110px;
      padding: 15px 0 15px 111px;
      border-bottom: 1px solid #EFEFEF;
      a {
        color: #333;
      }
    }
    .price {
      padding-left: 107px;
    }
    .goods-num {
      padding-left: 60px;
    }
  }

  .order-discount-line {
    padding: 22px 30px 20px;
    line-height: 24px;
    text-align: right;
    font-size: 12px;
    &:first-child {
      line-height: 32px;
      text-align: right;
      font-size: 14px;
      font-weight: bolder;
    }
  }

  .gray-sub-title {
    height: 38px;
    padding: 0 24px;
    background: #EEE;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 12px;
    color: #666;
    display: flex;
    span {
      display: inline-block;
      height: 100%;
    }
    .first {
      display: flex;
      justify-content: space-between;
      flex: 1;
      .f-bc {
        > span {
          width: 130px;
          text-align: center;
        }
      }
    }
    .last {
      width: 230px;
      text-align: center;
      display: flex;
      border-left: 1px solid #ccc;
      span {
        flex: 1;
      }
    }
  }

  .bt {
    border-top: 1px solid #EFEFEF;
  }

  .date {
    padding-left: 0px;
  }

  .order-id {
    margin-left: 10px;
  }

  .cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    &:hover {
      .del-order {
        display: block;
      }
    }
    .del-order {
      display: none;
    }
    .cart-l {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 15px 0;
      justify-content: space-between;
      position: relative;
      &:before {
        position: absolute;
        content: ' ';
        right: -1px;
        top: 0;
        width: 1px;
        background-color: #EFEFEF;
        height: 100%;
      }
      .ellipsis {
        margin-left: 20px;
        width: 220px;
      }
      .img-box {
        border: 1px solid #EBEBEB;
      }
      img {
        display: block;
        @include wh(80px);
      }
      .cart-l-r {
        display: flex;
        > div {
          text-align: center;
          width: 112px;
        }
      }
      .car-l-l {
        display: flex;
        align-items: center;
      }
    }
    .cart-r {
      width: 230px;
      display: flex;
      span {
        text-align: center;
        flex: 1;
      }
    }
  }

  .prod-operation {
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 254px;
    div {
      width: 100%;
      text-align: center;
    }
    div:last-child {
      padding-right: 24px;
    }
  }

  .price-total {
    height: 54px;
    line-height: 54px;
    font-size: 18px;
  }
  .map {
    width: 100%;
    height: 400px;
  }
  .price-red {
    font-weight: 700;
    color: #d44d44;
  }
</style>

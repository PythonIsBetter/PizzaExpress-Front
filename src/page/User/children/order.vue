<template>
  <div>
    <div class="container">
      <div class="row clearfix">
        <div class="col-md-2 column">
        </div>
        <div class="col-md-10 column">
          <y-shelf title="我的订单">
            <div slot="content">
              <div v-if="orderList.length" style="min-height: 10vw;">
                <div v-for="(item,i) in orderList" :key="i">
                  <div class="gray-sub-title cart-title">
                    <div class="first">
                      <div>
                        <span class="date" v-text="item.orderTime"></span>
                        <span class="order-id"> 订单号： <a @click="orderDetail(item.orderId)">{{item.orderId}}</a> </span>
                      </div>
                      <div class="f-bc">
                        <span class="price">单价</span>
                        <span class="num">数量</span>
                        <!--<span class="operation">商品操作</span>-->
                      </div>
                    </div>
                    <div class="last">
                      <span class="sub-total">实付金额</span>
                      <span class="order-detail"> <a @click="orderDetail(item.orderId)">查看详情 ><em class="icon-font"></em></a> </span>
                    </div>
                  </div>
                  <div class="pr">
                    <div class="cart" v-for="(good,j) in item.goodsList" :key="j">
                      <div class="cart-l" :class="{bt:j>0}">
                        <div class="car-l-l">
                          <div class="img-box"><a @click="goodsDetails(good.goodsList.id)"><img :src="good.menuItem.imgPath" alt=""></a></div>
                          <div class="ellipsis"><a style="color: #626262;" @click="goodsDetails(good.menuItem.id)">{{good.menuItem.name}}</a></div>
                        </div>
                        <div class="cart-l-r">
                          <!--<div>¥ {{Number(good.actualUnitPrice).toFixed(2)}}</div>-->
                          <div class="num">¥{{(good.orderItem.actualUnitPrize)}}</div>
                          <div class="num">{{good.orderItem.num}}</div>
                          <div class="type">
                            <el-button style="margin-left:20px" @click="_delOrder(item.orderId,i)" type="danger" size="mini" v-if="j<1" class="del-order">删除此订单</el-button>
                            <!-- <a @click="_delOrder(item.orderId,i)" href="javascript:;" v-if="j<1" class="del-order">删除此订单</a> -->
                          </div>
                        </div>
                      </div>
                      <div class="cart-r">
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                    <div class="prod-operation pa" style="right: 0;top: 0;">
                      <div class="total">¥ {{item.orderTotal}}</div>
                      <div v-if="item.orderStatus === '0'">
                        <el-button @click="orderPayment(item.orderId)" type="primary" size="small">现在付款</el-button>
                      </div>
                      <div class="status" v-if="item.orderStatus !== '0'"> {{getOrderStatus(item.orderStatus)}}  </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="no-info" v-else>
                <div style="padding: 100px 0;text-align: center">
                  你还未创建过订单
                </div>
              </div>
            </div>
          </y-shelf>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { orderList, delOrder } from '/api/goods'
  import YShelf from '/components/shelf'
  import { getStore } from '/utils/storage'
  export default {
    data () {
      return {
        orderList: [0],
        userId: '',
        orderStatus: '',
        loading: true,
        currentPage: 1,
        pageSize: 5,
        total: 0
      }
    },
    methods: {
      message (m) {
        this.$message.error({
          message: m
        })
      },
      handleSizeChange (val) {
        this.pageSize = val
        this._orderList()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this._orderList()
      },
      orderPayment (orderId) {
        window.open(window.location.origin + '#/order/payment?orderId=' + orderId)
      },
      goodsDetails (id) {
        window.open(window.location.origin + '#/goodsDetails?productId=' + id)
      },
      orderDetail (orderId) {
        this.$router.push({
          path: 'orderDetail',
          query: {
            orderId: orderId
          }
        })
      },
      getOrderStatus (status) {
        // if (status === '1') {
        //   return '支付审核中'
        // } else if (status === '2') {
        //   return '待发货'
        // } else if (status === '3') {
        //   return '待收货'
        // } else if (status === '4') {
        //   return '交易成功'
        // } else if (status === '5') {
        //   return '交易关闭'
        // } else if (status === '6') {
        //   return '支付失败'
        // }

        if (status === '1') {
          return '订单进行中'
        } else if (status === '2') {
          return '待发货'
        } else if (status === '3') {
          return '待收货'
        } else if (status === '4') {
          return '已完成'
        } else if (status === '5') {
          return '已取消'
        } else if (status === '6') {
          return '支付失败'
        }
      },
      _orderList () {
        let params = {
          // params: {
          userId: this.userId
            // size: this.pageSize,
            // page: this.currentPage
          // }
        }
        orderList(params).then(res => {
          console.log(res)
          this.orderList = res
          this.total = res.orderTotal
          this.loading = false
        })
      },
      _delOrder (orderId, i) {
        let params = {
          params: {
            orderId: orderId
          }
        }
        delOrder(params).then(res => {
          if (res.success === true) {
            this.orderList.splice(i, 1)
          } else {
            this.message('删除失败')
          }
        })
      }
    },
    created () {
      this.userId = getStore('userId')
      this._orderList()
    },
    components: {
      YShelf
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/style/mixin";

  .gray-sub-title {
    height: 38px;
    padding: 0 5px;
    background: #EEE;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 8px;
    text-align: center;
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
          width: 25px;
          text-align: center;
        }
      }
    }
    .last {
      width: 120px;
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
  }

  .cart {
    display: flex;
    width: 80%;
    font-size: 75%;
    justify-content: space-between;
    align-items: center;
    &:hover {
      .del-order {
        display: block;
        width: 60%;
      }
    }
    .del-order {
      display: none;
    }
    .cart-l {
      display: flex;
      align-items: center;
      flex: 1;
      /*padding: 5px 0;*/
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
        margin-left: 3px;
        width: 40px;
      }
      .img-box {
        border: 1px solid #EBEBEB;
      }
      img {
        display: block;
        @include wh(40px);
      }
      .cart-l-r {
        display: flex;
        > div {
          text-align: center;
          width: 52px;
        }
      }
      .car-l-l {
        display: flex;
        align-items: center;
      }
    }
    .cart-r {
      width: 100px;
      display: flex;
      span {
        text-align: center;
        flex: 1;
      }
    }
  }

  .prod-operation {
    /*height: 110px;*/
    display: flex;
    font-size: 80%;
    align-items: center;
    justify-content: center;
    width: 64px;
    div {
      width: 90%;
      text-align: center;
    }
    div:last-child {
      padding-right: 5px;
    }
  }
</style>

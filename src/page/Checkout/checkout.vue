<template>
  <div class="checkout">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <div class="w" style="padding-top: 40px;">
      <!-- 收货地址 -->
      <y-shelf title="收货信息">
        <div slot="content">
          <ul class="address-item-list clearfix">
            <li v-for="(item,i) in addList"
                :key="i"
                class="address pr"
                :class="{checked:addressId === item.id}"
                @click="chooseAddress(item.id, item.receiverName, item.receiverPhoneNum, item.address)">
           <span v-if="addressId === item.id" class="pa">
             <svg viewBox="0 0 1473 1024" width="17.34375" height="12">
             <path
               d="M1388.020 57.589c-15.543-15.787-37.146-25.569-61.033-25.569s-45.491 9.782-61.023 25.558l-716.054 723.618-370.578-374.571c-15.551-15.769-37.151-25.537-61.033-25.537s-45.482 9.768-61.024 25.527c-15.661 15.865-25.327 37.661-25.327 61.715 0 24.053 9.667 45.849 25.327 61.715l431.659 436.343c15.523 15.814 37.124 25.615 61.014 25.615s45.491-9.802 61.001-25.602l777.069-785.403c15.624-15.868 25.271-37.66 25.271-61.705s-9.647-45.837-25.282-61.717M1388.020 57.589z"
               fill="#6A8FE5" p-id="1025">
               </path>
             </svg>
             </span>
              <p>收货人: {{item.receiverName}}</p>
              <p class="street-name ellipsis">收货地址: {{item.address}}</p>
              <p>手机号码: {{item.receiverPhoneNum}}</p>
              <div class="operation-section">
                <span class="update-btn" style="font-size:12px" @click="update(item)">修改</span>
                <span class="delete-btn" style="font-size:12px" :data-id="item.id" @click="del(item.id)">删除</span>
              </div>
            </li>

            <li class="add-address-item" @click="update()">
              <img src="../../../static/svg/jia.svg" alt="">
              <p>使用新地址</p>
            </li>
          </ul>
        </div>
      </y-shelf>
      <!-- 购物清单 -->
      <div class="store-content page-cart">
        <div class="gray-box">
          <!--内容-->
          <div v-if="cartList.length">
            <div class="ui-cart">
              <div>
                <!--标题-->
                <div class="cart-table-title">
                  <span class="name">商品信息</span>
                  <span class="operation">操作</span>
                  <span class="subtotal">小计</span>
                  <span class="num">数量</span>
                  <span class="price1">单价</span>
                </div>
                <!--列表-->
                <div class="cart-table" v-for="(item,i) in cartList" :key="i">
                  <div class="cart-group divide pr" :data-productid="item.productId">
                    <div class="cart-top-items">
                      <div class="cart-items clearfix">
                        <!--勾选-->
                        <div class="items-choose">
                      <span class="blue-checkbox-new " :class="{'checkbox-on':item.checked === '1'}"
                            @click="editCart('check',item)"></span>
                        </div>
                        <!--图片-->
                        <div class="items-thumb fl">
                          <img :alt="item.productName"
                               :src="item.productImg">
                          <a @click="goodsDetails(item.productId)" :title="item.productName" target="_blank"></a>
                        </div>
                        <!--信息-->
                        <div class="name hide-row fl">
                          <div class="name-table">
                            <a @click="goodsDetails(item.productId)" :title="item.productName" target="_blank"
                               v-text="item.productName"></a>
                          </div>
                        </div>
                        <!--删除按钮-->
                        <div class="operation">
                          <a class="items-delete-btn" @click="cartdel(item.productId)"></a>
                        </div>
                        <!--商品数量-->
                        <div>
                          <!--总价格-->
                          <div class="subtotal" style="font-size: 14px">¥ {{item.salePrice * item.productNum}}</div>
                          <!--数量-->
                          <div class="item-cols-num"
                               style="
                                 position: relative;
                                 width: 12%;
                                 margin-top: -20%;
                                 margin-right: 40%;
                                "
                          >
                            {{item.productNum}}
                          </div>
                          <!--价格-->
                          <div class="price1"
                               style="
                                 position: relative;
                                 width: 12%;
                                 margin-top: -20%;
                                 margin-right: 58%;
                                "
                          >¥ {{item.salePrice}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cart-bottom-bg fix-bottom">
              <div class="fix-bottom-inner">
                <div class="cart-bar-operation">
                  <div>
                    <div class="choose-all">
                      <span :class="{'checkbox-on':checkAllFlag}" class="blue-checkbox-new"
                            @click="editCheckAll"></span>
                      <span @click="editCheckAll">全选</span>
                    </div>
                    <div class="delete-choose-goods" @click="delChecked">删除选中的商品</div>
                  </div>
                </div>
                <div class="shipping">
                  <div class="shipping-box">
                    <div class="shipping-total shipping-num">
                      <h4 class="highlight">已选择 <i v-text="checkNum"></i> 件商品</h4>
                      <h5>共计 <i v-text="totalNum"></i> 件商品</h5></div>
                    <div class="shipping-total shipping-price">
                      <h4 class="highlight">应付总额：<span>￥</span><i v-text="checkPrice"></i>
                      </h4>
                      <h5 class="shipping-tips ng-scope">应付总额不含运费</h5>
                    </div>
                  </div>
                  <y-button class="big-main-btn"
                            :classStyle="submit?'disabled-btn':'main-btn'"
                            style="margin: 0;width: 130px;height: 50px;line-height: 50px;font-size: 16px"
                            :text="submitOrder"
                            @btnClick="_submitOrder">
                  </y-button>
                </div>
              </div>
            </div>
          </div>
          <div v-else style="padding:50px">
            <div class="cart-e">
            </div>
            <p style="text-align: center;padding: 20px;color: #8d8d8d">你的购物车空空如也</p>
            <div style="text-align: center">
              <router-link to="/goods">
                <y-button text="现在选购" style="width: 150px;height: 40px;line-height: 38px;color: #8d8d8d"></y-button>
              </router-link>
            </div>

          </div>
        </div>
      </div>

      <y-popup :open="popupOpen" @close='popupOpen=false' :title="popupTitle">
        <div slot="content" class="md" :data-id="msg.addressId">
          <div>
            <input type="text" placeholder="收货人姓名" v-model="msg.userName">
          </div>
          <div>
            <input type="number" placeholder="手机号码" v-model="msg.tel">
          </div>
          <div>
            <input type="text" placeholder="收货地址" v-model="msg.streetName">
          </div>
          <y-button text='保存'
                    class="btn"
                    :classStyle="btnHighlight?'main-btn':'disabled-btn'"
                    @btnClick="save({id:userId,addressId:msg.addressId,userName:msg.userName,tel:msg.tel,streetName:msg.streetName})">
          </y-button>
        </div>
      </y-popup>
    </div>
  </div>
</template>
<script>
  import {
    addressList,
    addressUpdate,
    addressAdd,
    addressDel,
    submitOrder
  } from '/api/goods'
  import {mapMutations, mapState} from 'vuex'
  import YShelf from '/components/shelf'
  import YButton from '/components/YButton'
  import YPopup from '/components/popup'
  import YHeader from '/common/header'
  import {getStore} from '/utils/storage'

  export default {
    data () {
      return {
        addList: [],
        addressId: '0',
        popupOpen: false,
        popupTitle: '管理收货地址',
        num: '', // 立刻购买
        productId: '',
        msg: {
          addressId: '',
          userName: '',
          tel: '',
          streetName: '',
          isDefault: false
        },
        userName: '',
        tel: '',
        streetName: '',
        userId: '',
        orderTotal: 0,
        submit: false,
        submitOrder: '提交订单',
        orderId: 0
      }
    },
    computed: {
      ...mapState(
        ['cartList']
      ),
      btnHighlight () {
        let msg = this.msg
        return msg.userName && msg.tel && msg.streetName
      },
      // 是否全选
      checkAllFlag () {
        return this.checkedCount === this.cartList.length
      },
      // 勾选的数量
      checkedCount () {
        var i = 0
        this.cartList && this.cartList.forEach((item) => {
          if (item.checked === '1') i++
        })
        return Number(i)
      },
      // 计算总数量
      totalNum () {
        var totalNum = 0
        this.cartList && this.cartList.forEach(item => {
          totalNum += (item.productNum)
        })
        return Number(totalNum)
      },
      // 选中的总价格
      checkPrice () {
        var totalPrice = 0
        this.cartList && this.cartList.forEach(item => {
          console.log('数量：' + item.productNum + '单价：' + item.salePrice)
          if (item.checked === '1') {
            totalPrice += (item.productNum * item.salePrice)
          }
        })
        this.orderTotal = totalPrice
        return totalPrice
      },
      // 选中的商品数量
      checkNum () {
        var checkNum = 0
        this.cartList && this.cartList.forEach(item => {
          if (item.checked === '1') {
            checkNum += (item.productNum)
          }
        })
        return checkNum
      }
    },
    methods: {
      ...mapMutations([
        'EDIT_CART'
      ]),
      message (m) {
        this.$message.error({
          message: m
        })
      },
      goodsDetails (id) {
        this.$router.push({path: '/goodsDetails', query: {productId: id}})
      },
      _addressList () {
        addressList({phoneNum: this.userId}).then(res => {
          let data = res
          if (data.length) {
            this.addList = data
            this.addressId = data[0].id || '1'
            this.userName = data[0].receiverName
            this.tel = data[0].receiverPhoneNum
            this.streetName = data[0].address
          } else {
            this.addList = []
          }
        })
      },
      _addressUpdate (params) {
        addressUpdate(params).then(res => {
          if (res.success === 'true') {
            this._addressList()
          }
        })
      },
      _addressAdd (params) {
        addressAdd(params).then(res => {
          if (res.success === 'true') {
            this._addressList()
          } else {
            this.message(res.message)
          }
        })
      },
      _addressDel (params) {
        addressDel(params).then(res => {
          if (res.success === 'true') {
            this._addressList()
          }
        })
      },
      // 提交订单后跳转付款页面
      _submitOrder () {
        this.submitOrder = '提交订单中...'
        this.submit = true
        var array = []
        if (this.addressId === '0') {
          this.message('请选择收货地址')
          this.submitOrder = '提交订单'
          this.submit = false
          return
        }
        if (this.cartList.length === 0) {
          this.message('非法操作')
          this.submitOrder = '提交订单'
          this.submit = false
          return
        }
        for (var i = 0; i < this.cartList.length; i++) {
          if (this.cartList[i].checked === '1') {
            console.log(this.cartList[i])
            array.push(this.cartList[i])
          }
        }
        let params = {
          addressId: this.addressId,
          goodsList: array
        }
        submitOrder(params).then(res => {
          console.log(res.success)
          if (res.success === 'false') {
            this.message(res.message)
            this.submitOrder = '提交订单'
            this.submit = false
            this.payment()
          } else {
            this.orderId = res.success
            this.payment()
          }
        })
      },
      // 付款
      payment () {
        this.cartList.forEach(item => {
          let productId = item.productId
          this.EDIT_CART({productId})
        })
        this.$router.push({
          path: '/order/payment',
          query: {
            'orderId': this.orderId,
            'orderTotal': this.orderTotal
          }
        })
      },
      // 选择地址
      chooseAddress (addressId, userName, tel, streetName) {
        this.addressId = addressId
        this.userName = userName
        this.tel = tel
        this.streetName = streetName
      },
      // 修改
      update (item) {
        this.popupOpen = true
        if (item) {
          this.popupTitle = '管理收货地址'
          this.msg.addressId = item.id
          this.msg.userName = item.receiverName
          this.msg.tel = item.receiverPhoneNum
          this.msg.streetName = item.address
        } else {
          this.popupTitle = '新增收货地址'
          this.msg.userName = ''
          this.msg.tel = ''
          this.msg.streetName = ''
          this.msg.isDefault = false
          this.msg.addressId = ''
        }
      },
      // 保存
      save (p) {
        this.popupOpen = false
        if (p.addressId) {
          this._addressUpdate(p)
        } else {
          delete p.addressId
          this._addressAdd(p)
        }
      },
      // 删除
      del (addressId) {
        this._addressDel({addressId})
      },
      // 全选
      editCheckAll () {
        let checkAll = !this.checkAllFlag
        this.EDIT_CART({checked: checkAll})
      },
      // 修改购物车
      _cartEdit (userId, productId, productNum, checked) {
        this.EDIT_CART(
          {
            productId,
            checked,
            productNum
          }
        )
      },
      // 修改购物车
      editCart (type, item) {
        if (type && item) {
          let checked = item.checked
          let productId = item.productId
          let productNum = item.productNum
          // 勾选
          if (type === 'check') {
            let newChecked = checked === '1' ? '0' : '1'
            this._cartEdit(this.userId, productId, productNum, newChecked)
          }
        } else {
          console.log('缺少所需参数')
        }
      },
      EditNum (productNum, productId, checked) { // 数量
        this._cartEdit(this.userId, productId, productNum, checked)
      },
      // 删除整条购物车
      cartdel (productId) {
        this.EDIT_CART({productId})
      },
      delChecked () {
        this.cartList.forEach(item => {
          let productId = item.productId
          this.EDIT_CART({productId})
        })
      }
    },
    created () {
      this.userId = getStore('userId')
      console.log(this.userId)
      this._addressList()
    },
    components: {
      YShelf,
      YButton,
      YPopup,
      YHeader
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  // 收货地址
  .address-item-list {
    padding: 30px 13px 0;
    .address {
      padding: 19px 14px 0 19px;
      p {
        line-height: 26px;
      }
    }
    li.checked {
      border-color: #6A8FE5;
      position: relative;
      background: #fff;
      .pa {
        right: 15px;
        top: 18px;
      }
      &:hover {
        background: #fff;
      }
    }
    li {
      position: relative;
      overflow: hidden;
      float: left;
      width: 276px;
      height: 158px;
      margin: 0 0 30px 16px;
      border: 1px solid #E5E5E5;
      border-radius: 3px;
      background: #FAFAFA;
      line-height: 14px;
      text-align: left;
      word-wrap: break-word;
      word-break: normal;
      color: #626262;
      cursor: pointer;
      -moz-user-select: -moz-none;
      -webkit-user-select: none;
      -o-user-select: none;
      user-select: none;
      &:hover {
        background: #F2F2F2;
        .operation-section {
          visibility: visible;
          transform: translate(0, 0);
        }
      }
      &.add-address-item {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        p {
          margin-top: 5px;
        }
      }
      .operation-section {
        visibility: hidden;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 28px;
        background: #E1E1E1;
        border-top: 1px solid #E1E1E1;
        transition: all .2s ease;
        transform: translate(0, 29px);
        border-top: 1px solid #E1E1E1;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 11;
        span {
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          height: 100%;
          &:hover {
            background: #F2F2F2;
          }
        }

        span + span {
          border-left: 1px solid #E1E1E1;
        }

      }
    }
  }

  .ui-cart {
    .cart-table-title {
      position: relative;
      z-index: 1;
      line-height: 38px;
      height: 38px;
      padding: 0 0 0 10px;
      font-size: 12px;
      background: #eee;
      border-bottom: 1px solid #dbdbdb;
      border-bottom-color: rgba(0, 0, 0, .08);
      .name {
        float: left;
      }
      span {
        width: 55px;
        float: right;
        text-align: center;
        color: #838383;
      }
    }
    .cart-group.divide {
      .cart-items {
        border-top: 1px dashed #eee;
      }
    }
    .cart-items {
      position: relative;
      height: 140px;
      margin-left: 74px;
      /*删除*/
      .operation {
        padding: 0;
        font-size: 12px;
        line-height: 12px;
        margin-right: -40px;
        margin-top: -60px;
        .items-delete-btn {
          background-image: url(../../../static/images/delete-btn-icon_a35bf2437e@2x.jpg);
          &:hover {
            background-position: 0 -36px;
          }
        }
        .items-delete-btn {
          display: block;
          width: 18px;
          height: 18px;
          margin: 0 auto;
          color: #C2C2C2;
          background: url(../../../static/images/delete-btn-icon_a35bf2437e@2x.jpg);
          -webkit-background-size: 100% auto;
          background-size: 100% auto;
          -moz-transition: none;
          -webkit-transition: none;
          -o-transition: none;
          transition: none;
        }
      }
      .subtotal {
        margin-right: 10px;
        margin-top: -60px;
        font-weight: 700;
      }
      .item-cols-num,
      .operation,
      .price1,
      .subtotal {
        overflow: hidden;
        float: right;
        width: 137px;
        text-align: center;
        color: #666;
      }
    }
    .cart-group.divide .cart-top-items:first-child .cart-items {
      border-top: none;
    }
    .items-choose {
      position: absolute;
      left: -74px;
      top: 0;
      width: 37px;
      height: 10px;
      padding: 50px 0 0 5px;
      font-size: 12px;
      color: #999;
    }
    .items-thumb {
      position: relative;
      margin-top: 30px;
      margin-left: -40px;
      margin-bottom: 10px;
      overflow: hidden;
      width: 60px;
      height: 60px;
    }
    img {
      width: 60px;
      height: 60px;
    }
    .cart-items .items-thumb > a, .ui-cart .cart-items .items-thumb > i {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border: 1px solid #fff;
      border-radius: 3px;
      border: 0 solid rgba(255, 255, 255, .1);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .06);
    }
    .name {
      width: 380px;
      margin-left: 20px;
      color: #323232;
      display: table;
      a {
        color: #333;
        font-size: 14px;
        margin-left: -60px;
      }
    }
    .name-table {
      display: table-cell;
      vertical-align: middle;

    }
    .attribute, .name p {
      color: #999;
      font-size: 12px;
      padding-top: 4px;
      line-height: 17px;
    }
  }

  .page-cart {
    padding-top: 40px;
    .fix-bottom {
      height: 150px;
      width: 100%;
      position: relative;
      background-position: center;
      background: #fdfdfd;
      background: -webkit-linear-gradient(#fdfdfd, #f9f9f9);
      background: linear-gradient(#fdfdfd, #f9f9f9);
      border-top: 1px solid #e9e9e9;
      box-shadow: 0 -3px 8px rgba(0, 0, 0, .04);
      .cart-bottom-bg {
        height: 140px;
        border-top: 1px solid #D9D9D9;
        border-radius: 0 0 8px 8px;
      }
    }
    .cart-bar-operation {
      float: left;
      padding: 35px 26px;
      font-size: 12px;
    }
    .blue-checkbox-new {
      float: left;
      margin-right: 9px;
      margin-top: -10px;
    }
    .choose-all, .delete-choose-goods, .selected-count {
      float: left;
      height: 20px;
      line-height: 5px;
      cursor: pointer;
      position: relative;
      margin-left: -10px;
    }
    .blue-checkbox-new, .blue-checkbox-new.checkbox-disable, .blue-checkbox-new.checkbox-on {
      display: inline-block;
      position: relative;
      width: 20px;
      height: 20px;
      background: url(../../../static/images/checkbox-new_631a56a4f6.png) no-repeat 0 -20px;
      cursor: pointer;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      vertical-align: middle;
    }

    .blue-checkbox-new.checkbox-on, .choose-checkbox-on .blue-checkbox-new {
      background: url(../../../static/images/checkbox-new_631a56a4f6.png) no-repeat 0 0;
    }
    .delete-choose-goods {
      position: relative;
      margin-left: 21px;
      color: #bbb;
    }
    .shipping {
      float: left;
      position: relative;
      margin-top: -10%;
    }
    .shipping-box {
      padding-top: 1px;
      margin-right: 0px;
    }
    .shipping-total {
      display: inline-block;
      border-left: 1px solid #e1e1e1;
      padding: 0 20px;
      .shipping-price {
        width: 155px;
        padding-right: 0;
      }
      &.shipping-num i {
        width: 28px;
        display: inline-block;
        text-align: center;
      }
      h4 {
        color: #323232;
        > i {
          font-size: 18px;
          font-weight: 700;
        }
        i, span {
          color: #d44d44;
        }

      }
      h5 {
        color: #959595;
        > i {
          font-size: 16px;
          font-weight: 700;
        }
      }
    }

    .shipping-total.shipping-num {
      text-align: right;
    }
    .shipping-total:first-child {
      border: none;
    }
    .big-main-btn {
      float: right;
      height: 48px;
    }
  }

</style>

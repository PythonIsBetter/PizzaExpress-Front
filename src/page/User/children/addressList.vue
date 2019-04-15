<template>
  <div>
    <y-shelf title="收货地址" style="font-size: 60%" >
      <span slot="right"><y-button text="添加收货地址" style="margin: 0;font-size: 16px;width: 100%" @btnClick="update()"></y-button></span>
      <div slot="content">
        <div class="table-title">
          <span class="name">姓名</span> <span class="address">详细地址</span> <span class="tel">电话</span>
        </div>
        <div v-if="addList.length">
          <div class="address-item" v-for="(item,i) in addList" :key="i">
            <div class="name">{{item.receiverName}}</div>
            <div class="address-msg">{{item.address}}</div>
            <div class="telephone">{{item.receiverPhoneNum}}</div>
            <div class="defalut">
              <a @click="changeDef(item)"
                 href="javascript:;"
                 v-text="item.isDefault?'(     )':'    '"
                 :class="{'defalut-address':item.isDefault}"></a>
            </div>
            <div class="operation">
              <el-button type="primary" icon="edit" size="mini"  @click="update(item)"></el-button>
              <el-button type="danger" icon="delete" size="mini" :data-id="item.addressId" @click="del(item.id,i)"></el-button>
            </div>
          </div>
        </div>
        <div v-else>
          <div style="padding: 80px 0;text-align: center">
            <div style="font-size: 12px">你还未添加收货地址</div>
            <div style="margin: 20px ">
              <y-button text="添加地址" @btnClick="update()"></y-button>
            </div>
          </div>
        </div>
      </div>
    </y-shelf>
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
        <!--<div>-->
          <!--<el-checkbox class="auto-login" v-model="msg.isDefault">设为默认</el-checkbox>-->
        <!--</div>-->
        <y-button text='保存'
                  class="btn"
                  :classStyle="btnHighlight?'main-btn':'disabled-btn'"
                  @btnClick="save({id:phoneNum,addressId:msg.addressId,userName:msg.userName,tel:msg.tel,streetName:msg.streetName,isDefault:msg.isDefault})">
        </y-button>
      </div>
    </y-popup>
  </div>
</template>
<script>
  import { addressList, addressUpdate, addressAdd, addressDel } from '/api/goods'
  import YButton from '/components/YButton'
  import YPopup from '/components/popup'
  import YShelf from '/components/shelf'
  import { getStore } from '/utils/storage'
  export default {
    data () {
      return {
        addList: [],
        popupOpen: false,
        popupTitle: '管理收货地址',
        msg: {
          addressId: '',
          userName: '',
          tel: '',
          streetName: '',
          isDefault: false
        },
        phoneNum: ''
      }
    },
    computed: {
      btnHighlight () {
        let msg = this.msg
        return msg.userName && msg.tel && msg.streetName
      }
    },
    methods: {
      message (m) {
        this.$message({
          message: m
        })
      },
      _addressList () {
        addressList({phoneNum: this.phoneNum}).then(res => {
          console.log(res)
          let data = res
          if (data.length) {
            this.addList = res
            this.addressId = res[0].addressId || '1'
          } else {
            this.addList = []
          }
        })
      },
      _addressUpdate (params) {
        addressUpdate(params).then(res => {
          this._addressList()
        })
      },
      _addressAdd (params) {
        addressAdd(params).then(res => {
          if (res.success === true) {
            this._addressList()
          } else {
            this.message('成功添加！')
          }
        })
      },
      changeDef (item) {
        if (!item.isDefault) {
          item.isDefault = true
          this._addressUpdate(item)
        }
        return false
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
      del (addressId, i) {
        addressDel({addressId: addressId}).then(res => {
          if (res.success === 'true') {
            this.addList.splice(i, 1)
          } else {
            this.message('删除失败')
          }
        })
      },
      // 修改
      update (item) {
        this.popupOpen = true
        if (item) {
          this.popupTitle = '管理收货地址'
          this.msg.userName = item.userName
          this.msg.tel = item.tel
          this.msg.streetName = item.streetName
          this.msg.isDefault = item.isDefault
          this.msg.addressId = item.addressId
        } else {
          this.popupTitle = '新增收货地址'
          this.msg.userName = ''
          this.msg.tel = ''
          this.msg.streetName = ''
          this.msg.isDefault = false
          this.msg.addressId = ''
        }
      }
    },
    created () {
      this.phoneNum = getStore('userId')
      console.log(this.phoneNum)
      this._addressList()
    },
    components: {
      YButton,
      YPopup,
      YShelf
    }
  }
</script>
<style scoped lang="scss">
  .table-title {
    position: relative;
    z-index: 1;
    line-height: 38px;
    height: 38px;
    padding: 0 0 0 38px;
    font-size: 8px;
    background: #eee;
    border-bottom: 1px solid #dbdbdb;
    border-bottom-color: rgba(0, 0, 0, .08);
    .name {
      float: left;
      text-align: left;
    }
    span {
      width: 50px;
      float: left;
      text-align: center;
      color: #838383;
    }
    .address {
      margin-left: 20px;
      /*font-size: 70%;*/
    }
    .tel {
      margin-left: 25px;
      /*font-size: 70%;*/
    }
  }

  .address-item {
    display: flex;
    align-items: center;
    height: 65px;
    text-align: center;
    font-size: 100%;
    .name {
      width: 30px;
      margin-left: 35px;

    }
    .address-msg {
      /*flex: 1;*/
      margin-left: 10px;
      width: 100px;
    }
    .telephone {
      width: 50px;
      margin-left: 5px;
    }
    .defalut {
      width: 40px;
      > a {
        text-align: center;
        /*display: none;*/
      }
    }
    .operation {
      width: 60px;
      a {
        padding: 5px 5px;
      }
    }
    &:hover {
      .defalut > a {
        display: block;
      }
    }
  }

  .address-item + .address-item {
    border-top: 1px solid #CFCFCF;
  }

  .defalut-address {
    color: #626262;
    display: block;
    pointer-events: none;
    cursor: default;
  }

  .md {
    > div {
      text-align: left;
      margin-bottom: 15px;
      > input {
        width: 100%;
        height: 50px;
        font-size: 18px;
        padding: 10px 20px;
        border: 1px solid #ccc;
        border-radius: 6px;
        box-shadow: 0 3px 5px -4px rgba(0, 0, 0, .4) inset, -1px 0 3px -2px rgba(0, 0, 0, .1) inset;
        line-height: 46px;
      }
    }
  }

  .btn {
    margin: 0;
    width: 50%;
    height: 50px;
    font-size: 14px;
    line-height: 48px
  }
</style>

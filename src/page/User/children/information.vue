<template>
  <div>
    <y-shelf title="账户资料">
      <span slot="right"><y-button text="修改密码" style="margin: 0" @btnClick="updateCode()"></y-button><y-button text="修改账户资料" style="margin: 0" @btnClick="update()"></y-button></span>
      <div slot="content">
          <div v-if="_getUserInfo ()">
            <div style="padding: 20px 0;text-align: left">
              <p style="margin-left: 40px; font-size: 20px">姓名 {{nickname}}</p>
              <!--<div class="operation">-->
              <!--<el-button type="primary" icon="edit" size="small"  @click="update(item)"></el-button>-->
              <!--<el-button type="danger" icon="delete" size="small" :data-id="item.addressId" @click="del(item.addressId,i)"></el-button>-->
            <!--</div>-->
              <!--<p style="margin-left: 40px; font-size: 20px">性别   {{gender}}</p>-->
              <p style="margin-left: 40px; font-size: 20px">生日    {{birthday}}</p>
              <p style="margin-left: 40px; font-size: 20px">所在城市 {{city}}</p>
          </div>
        </div>
          <div v-else>
          <div style="padding: 80px 0;text-align: center">
            <div style="font-size: 20px">你还未添加个人信息</div>
            <div style="margin: 20px ">
              <y-button text="添加个人信息" @btnClick="update()"></y-button>
            <!--</div>-->
          </div>
        </div>
    </div>
      </div>
    </y-shelf>
    <y-popup :open="popupOpen" @close='popupOpen=false' :title="popupTitle">
      <div slot="content" class="md" :data-id="msg.addressId">
        <div>
          <input type="text" placeholder="用户姓名" v-model="msg.nickname">
        </div>
        <!--<div>-->
          <!--<input type="number" placeholder="性别" v-model="msg.gender">-->
        <!--</div>-->
        <div>
          <input type="text" placeholder="生日" v-model="msg.birthday">
        </div>
        <div>
          <input type="text" placeholder="所在城市" v-model="msg.city">
        </div>
        <y-button text='保存'
                  class="btn"
                  :classStyle="btnHighlight1?'main-btn':'disabled-btn'"
                  @btnClick="save({userId:userId,nickname:msg.nickname,birthday:msg.birthday,city:msg.city})">
        </y-button>
      </div>
    </y-popup>
    <y-popup :open="popupOpen2" @close='popupOpen2=false' :title="popupTitle">
      <div slot="content" class="md" :data-id="msg.addressId">
        <div>
          <input type="text" placeholder="旧密码(可为空)" v-model="registered.oldPwd">
        </div>
        <div>
          <input type="number" placeholder="新密码" v-model="registered.userPwd">
        </div>
        <div>
          <input type="text" placeholder="再次输入新密码" v-model="registered.userPwd2">
        </div>
          <y-button text='保存'
                    class="btn"
                    :classStyle="btnHighlight2?'main-btn':'disabled-btn'"
                    @btnClick="save({userId:userId,oldPwd:registered.oldPwd,userPwd:registered.userPwd,userPwd2:registered.userPwd2})">
          </y-button>
      </div>
    </y-popup>
  </div>
</template>
<script>
  import YButton from '/components/YButton'
  // import { upload } from '/api/index'
  import YPopup from '/components/popup'
  import YShelf from '/components/shelf'
  import vueCropper from 'vue-cropper'
  import { mapState } from 'vuex'
  import { getStore } from '/utils/storage'
  import { getUserInfo, changePassword, setUserInfo } from '/api/index'
  export default {
    data () {
      return {
        msg: {
          nickname: '',
          // gender: '',
          city: '',
          birthday: ''
        },
        registered: {
          userName: '',
          oldPwd: '',
          userPwd: '',
          userPwd2: '',
          errMsg: ''
        },
        popupTitle: '修改用户信息',
        popupOpen: false,
        popupOpen2: false,
        // name: '',
        // gender: '',
        city: '',
        birthday: '',
        userId: '',
        token: ''
      }
    },
    computed: {
      ...mapState(['userInfo']),
      btnHighlight1 () {
        let msg = this.msg
        return msg.nickname && msg.birthday && msg.city
      },
      btnHighlight2 () {
        let registered = this.registered
        return registered.userPwd && registered.userPwd2
      }
    },
    methods: {
      message (m) {
        this.$message.error({
          message: m
        })
      },
      regist () {
        this.registxt = '注册中...'
        let userPwd = this.registered.userPwd
        let userPwd2 = this.registered.userPwd2
        if (!userPwd || !userPwd2) {
          this.message('账号密码不能为空!')
          this.registxt = '注册'
          return false
        }
        if (userPwd2 !== userPwd) {
          this.message('两次输入的密码不相同!')
          this.registxt = '注册'
          return false
        }
        changePassword({
          userPwd: userPwd,
          phoneNum: this.phoneNum
        }).then(res => {
          console.log(res[0])
          if (res.status === 'success') {
            // this.$router.push({
            this.open('密码修改成功')
            //   path: '/'
            // })
          } else {
            this.open('密码修改失败')
          }
          // if (res.success === true) {
          //   this.messageSuccess()
          //   this.toLogin()
          // } else {
          //   this.message(res.message)
          //   this.regist = '注册'
          //   return false
          // }
        })
      },
      _getUserInfo () {
        getUserInfo({phoneNum: this.phoneNum}).then(res => {
          console.log(res)
          this.nickname = res.nickname
          // this.gender = res.gender
          this.birthday = res.birthday
          this.city = res.city
        })
      },
      _setUserInfo (item) {
        setUserInfo({
          phoneNum: this.phoneNum,
          nickname: item.nickname,
          // gender: item.gender,
          birthday: item.birthday,
          city: item.city}).then(res => {
            if (res.status === 'success') {
            // this.$router.push({
              this.open('密码修改成功')
            //   path: '/'
            // })
            } else {
              this.open('密码修改失败')
            }
          })
      },
      // // 保存
      save (p) {
        this.popupOpen = false
        this.popupOpen2 = false
        if (p.nickname) {
          this._setUserInfo(p)
        } else {
          // delete p.addressId
          this.regist(p)
        }
      },
      // 修改
      update (item) {
        this.popupOpen = true
      },
      updateCode (item) {
        this.popupOpen2 = true
      }
    },
    created () {
      this.phoneNum = getStore('userId')
      console.log(this.phoneNum)
      this._getUserInfo()
      this.userId = getStore('userId')
      this.token = getStore('token')
    },
    components: {
      YPopup,
      YButton,
      YShelf,
      vueCropper
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/style/mixin";

  .avatar-box {
    height: 124px;
    display: flex;
    margin: 0 30px 30px;
    border-bottom: #dadada solid 1px;
    line-height: 30px;
    display: flex;
    align-items: center;
    .img-box {
      @include wh(80px);
      border-radius: 5px;
      overflow: hidden;
    }
    img {
      display: block;
      @include wh(100%)
    }
    .r-box {
      margin-left: 20px;
      h3 {
        font-size: 18px;
        font-weight: 400;
        color: #333;
      }
    }
  }

  // 修改头像
  .edit-avatar {
    z-index: 9999;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    @include wh(100%);
    background-color: rgba(0, 0, 0, .5);
    @extend %block-center;
    .content {
      display: flex;
      padding: 45px 100px 0;
    }
    > div {
      box-sizing: content-box;
      @include wh(700px, 500px);
      margin: 0;
    }
    .btn {
      width: 80px;
      height: 30px;
      margin-left: 10px;
      position: relative;
      text-align: center;
      line-height: 30px;
      text-shadow: rgba(255, 255, 255, .496094) 0 1px 0;
      border: 1px solid #E6E6E6;
      border-radius: 10px;
      &:hover {
      }
      a {
        color: #666;
        display: block;
        @include wh(100%);
      }
    }
    input[type=file] {
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      opacity: 0;
      width: 80px;
      height: 30px;
      cursor: pointer;
      box-sizing: border-box;
      border: 15px solid #000;
      overflow: hidden;
    }
    .edit-l {
      width: 100px;
      text-align: center;
    }
    .edit-r {
      margin-left: 20px;
      flex: 1;
      > div {
        border: 1px solid #ccc;
        width: 320px;
        height: 320px;
      }
    }
  }

  .image-container {
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
  }

  .close {
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    padding: 0 10px;
    @extend %block-center;
    &:hover {
      svg {
        transition: all 1s;
        transform: rotate(360deg);
        transform-origin: 50% 50%;
      }
      path {
        fill: #8a8a8a;
      }
    }
  }

  .big {
    display: block;
    width: 320px;
    height: 320px;
  }

  .bootom-btn {
    padding: 0 15px;
    border-top: 1px solid #E6E6E6;
    bottom: 0;
    height: 60px;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
</style>

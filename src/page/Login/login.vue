<template>
  <div class="login v2">
    <div class="wrapper">
      <div class="dialog dialog-shadow" style="display: block; margin-top: -362px;">
        <div class="title">
          <h4>赵老师推荐披萨</h4>
        </div>
        <div v-if="loginPage" class="content">

          <ul class="common-form">
            <li>
              <div class="tab-tit" v-model="tabView">
                <a href="javascript:;" @click="logintype2" class="register">手机验证码登录</a>
                <a href="javascript:;" @click="logintype1" class="register">手机密码登录</a>
              </div>
            </li>
            <div v-show="loginPart1Show">
              <li class="username border-1p">
                <div class="input">
                  <input type="text" v-model="ruleForm.userName" placeholder="手机号">
                </div>


              </li>
              <li>
                <div class="input">
                  <input type="password" v-model="ruleForm.userPwd" @keyup.enter="login" placeholder="密码">
                  <div id="container"></div>
                </div>

              </li>
            </div>


            <div v-show="loginPart2Show">
            <li class="username border-1p">
              <div class="input">
                <input type="text" v-model="ruleForm.userName" placeholder="手机号">
              </div>
            </li>
            <li>
              <div class="passwordInput">
                <input type="text" v-model="ruleForm.YanZhengCode" @keyup.enter="login" placeholder="请输入验证码">
                <y-button :text="btnText"
                          :classStyle="btnText === '获取验证码'?'main-btn':'disabled-btn'"
                          style="margin-left: 10px;" @btnClick="sendMessage"></y-button>
              </div>
            </li>
            </div>
            <li style="text-align: right" class="pr">
              <a href="javascript:;"  @click="toRegister">注册你的账号</a>
            </li>
          </ul>
          <div style="margin-top: 25px">
            <y-button :text="logintxt"
                      :classStyle="(ruleForm.YanZhengCode&& ruleForm.userName&& logintxt === '登录') ||
                                   (ruleForm.userName&& ruleForm.userPwd && logintxt === '登录') ?'main-btn':'disabled-btn'"
                      @btnClick="login"
                      style="margin: 0;width: 100%;height: 48px;font-size: 18px;line-height: 48px"></y-button>
          </div>
          <!--返回-->
          <div>
            <y-button text="返回" @btnClick="back"
              style="marginTop: 10px;marginBottom: 15px;width: 100%;height: 48px;font-size: 18px;line-height: 48px">
            </y-button>
          </div>
          <!--<div class="border"></div>-->
          <!--<div class="footer">-->
            <!--<div class="other">其它账号登录：</div>-->
            <!--<span id="qqLoginBtn"></span>-->
          <!--</div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script src="../../../static/geetest/gt.js"></script>

<script type="text/javascript"  charset="utf-8"
        src="http://connect.qq.com/qc_jssdk.js"
        data-appid="APPID"
        data-redirecturi="REDIRECTURI"
></script>


<script>
import YFooter from '/common/footer'
import YButton from '/components/YButton'
import { userLogin } from '/api/index.js'
// import { addCart } from '/api/goods.js'
import { setStore, getStore, removeStore } from '/utils/storage.js'

require('../../../static/geetest/gt.js')
// var captcha
export default {
  data () {
    return {
      cart: [],
      loginPage: true,
      tabView: 'loginPart1',
      loginPart1Show: true,
      loginPart2Show: false,
      vercode: '',
      btnDisabled: false,
      btnText: '获取验证码',
      ruleForm: {
        userName: '',
        userPwd: '',
        errMsg: '',
        userCode: '',
        YanZhengCode: ''
      },
      registered: {
        userName: '',
        userPwd: '',
        userPwd2: '',
        errMsg: ''
      },
      autoLogin: false,
      logintxt: '登录',
      statusKey: ''
    }
  },
  computed: {
    count () {
      return this.$store.state.login
    }
  },
  methods: {
    test () {
      this.open(this.ruleForm.userName)
    },
    open (t, m) {
      this.$notify.info({
        title: t,
        message: m
      })
    },
    messageSuccess () {
      this.$message({
        message: '恭喜您，注册成功！赶紧登录体验吧',
        type: 'success'
      })
    },
    message (m) {
      this.$message.error({
        message: m
      })
    },
    getRemembered () {
      var judge = getStore('remember')
      if (judge === 'true') {
        this.autoLogin = true
        this.ruleForm.userName = getStore('rusername')
        this.ruleForm.userPwd = getStore('rpassword')
      }
    },
    rememberPass () {
      if (this.autoLogin === true) {
        setStore('remember', 'true')
        setStore('rusername', this.ruleForm.userName)
        setStore('rpassword', this.ruleForm.userPwd)
      } else {
        setStore('remember', 'false')
        removeStore('rusername')
        removeStore('rpassword')
      }
    },
    toRegister () {
      this.$router.push({
        path: '/register'
      })
    },
    back () {
      this.$router.push({
        path: '/'
      })
    },
    // 登录返回按钮
    login_back () {
      this.$router.go(-1)
    },
    // 登陆时将本地的添加到用户购物车
    login_addCart () {
      let cartArr = []
      let locaCart = JSON.parse(getStore('buyCart'))
      if (locaCart && locaCart.length) {
        locaCart.forEach(item => {
          cartArr.push({
            userId: getStore('userId'),
            productId: item.productId,
            productNum: item.productNum
          })
        })
      }
      this.cart = cartArr
    },
    logintype1 () {
      // const Component = Vue.component('loginType1')
      // const instance = new Component()
      // instance.$mount('#container')
      this.loginPart1Show = true
      this.loginPart2Show = false
      this.ruleForm.userName = ''
      this.ruleForm.YanZhengCode = ''
      this.statusKey = 2
    },
    logintype2 () {
      // const LoginType2 = Vue.extend(loginPart2)
      // const logintype2 = new LoginType2()
      // logintype2.$mount('#container')
      this.loginPart1Show = false
      this.loginPart2Show = true
      this.ruleForm.userName = ''
      this.ruleForm.userPwd = ''
      this.statusKey = 1
    },
    sendMessage () {
      this.open('ok')
      if (this.btnDisabled) {
        return
      }
      this.getSecond(60)
    },
    getSecond (wait) {
      let _this = this
      let _wait = wait
      if (wait === 0) {
        this.btnDisabled = false
        this.btnText = '获取验证码'
        wait = _wait
      } else {
        this.btnDisabled = true
        this.btnText = '验证码(' + wait + 's)'
        wait--
        setTimeout(function () {
          _this.getSecond(wait)
        },
          1000)
      }
    },
    login2 () {
      if (!this.ruleForm.userName || !this.ruleForm.userPwd) {
        // this.ruleForm.errMsg = '账号或者密码不能为空!'
        this.message('账号或者密码不能为空!')
        return false
      } else if (this.ruleForm.userName === 'test' && this.ruleForm.userPwd === 'test') {
        this.logintxt = '登陆中。。'
        this.$router.push({
          path: '/'
        })
      } else {
        this.open('密码不正确')
      }
    },
    login () {
      this.logintxt = '登录中...'
      this.rememberPass()
      if (!this.ruleForm.userName || !this.ruleForm.userPwd) {
        // this.ruleForm.errMsg = '账号或者密码不能为空!'
        this.message('账号或者密码不能为空!')
        return false
      }
      // var result = captcha.getValidate()
      // if (!result) {
      //   this.message('请完成验证')
      //   this.logintxt = '登录'
      //   return false
      // }
      userLogin({
        userName: this.ruleForm.userName,
        userPwd: this.ruleForm.userPwd,
        yanZhengCode: this.ruleForm.YanZhengCode,
        statusKey: '2'
      }).then(res => {
        console.log(res[0])
        if (res.status === 'success') {
          setStore('userId', this.ruleForm.userName)
          this.$router.push({
            path: '/'
          })
        } else {
          this.open('账号密码输入错误')
          this.logintxt = '登录'
        }
        // if (res.result.state === 1) {
        //   setStore('token', res.result.token)
        //   setStore('userId', res.result.id)
        //   // 登录后添加当前缓存中的购物车
        //   if (this.cart.length) {
        //     for (var i = 0; i < this.cart.length; i++) {
        //       addCart(this.cart[i]).then(res => {
        //         if (res.success === true) {
        //         }
        //       })
        //     }
        //     removeStore('buyCart')
        //     this.$router.push({
        //       path: '/'
        //     })
        //   } else {
        //     this.$router.push({
        //       path: '/'
        //     })
        //   }
        // } else {
        //   this.logintxt = '登录'
        //   this.message(res.result.message)
        //   captcha.reset()
        //   return false
        // }
      })
    }
    // init_geetest () {
    //   geetest().then(res => {
    //     this.statusKey = res.statusKey
    //     window.initGeetest({
    //       gt: res.gt,
    //       challenge: res.challenge,
    //       new_captcha: res.new_captcha,
    //       offline: !res.success,
    //       product: 'popup',
    //       width: '100%'
    //     }, function (captchaObj) {
    //       captcha = captchaObj
    //       captchaObj.appendTo('#captcha')
    //       captchaObj.onReady(function () {
    //         document.getElementById('wait').style.display = 'none'
    //       })
    //     })
    //   })
    // }
  },
  mounted () {
    this.getRemembered()
    this.login_addCart()
    this.init_geetest()
    this.open('登录提示', '没有什么登陆提示')
  },
  components: {
    YFooter,
    YButton
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
* {
  box-sizing: content-box;
  margin: 0;
  padding: 0;
}
#box{
  width: 600px;
  margin: 0 auto;
}
.tab-tit{
  font-size: 0;
  width: 600px;
}
.tab-tit a{
  display: inline-block;
  height: 50px;
  line-height: 50px;
  width: 25%;
  font-size: 18px;
  text-align: center;
  background: #ccc;
  color: #333;
  text-decoration:none;
}
.tab-tit .cur{
  background: #09f;
  color: #fff;
}
.tab-con div{
  border: 1px solid #ccc;
  height: 400px;
  width: 598px;
  margin: 0 auto;
  padding-top: 20px;
}

.login {
  overflow-x: hidden;
  overflow-y: hidden;
  .input {
    height: 50px;
    display: flex;
    align-items: center;
    input {
      font-size: 16px;
      width: 100%;
      height: 100%;
      padding: 10px 15px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
  }

  .wrapper {
    background: url(/static/images/bg_9b9dcb65ff.png) repeat;
    background-size: 100px;
    min-height: 800px;
    min-width: 630px;
  }
}

.v2 .dialog {
  width: 450px;
  border: 1px solid #dadada;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  margin-left: -225px;
  position: absolute;
  .title {
    background: linear-gradient(#fff, #f5f5f5);
    height: auto;
    overflow: visible;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    position: relative;
    background-image: url(/static/images/icon.png);
    background-size: 120px;
    background-position: top center;
    background-repeat: no-repeat;
    height: 92px;
    margin: 23px 0 50px;
    padding: 75px 0 0;
    box-shadow: none;
    h4 {
      padding: 0;
      text-align: center;
      color: #666;
      border-bottom: 1px solid #dcdcdc;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      font-weight: 700;
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      margin: 0;
      padding: 0;
      border-bottom: 0;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      line-height: 1em;
      height: auto;
      color: #333;
      font-weight: 400;
    }
  }
  .buttonItem{
    margin:15px 10px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    border:1px solid #ddd;
    input{
      height: 45px;
      font-size: 1rem;
      padding-left:10px;
      border:0;
      outline: none;
    }
    .sendCode{
      border: 0;
      outline: none;
      background-color: #fff;
      cursor: pointer;
    }
  }
  .passwordInput {
    height: 50px;
    display: flex;
    align-items: center;
    input {
      font-size: 16px;
      width: 70%;
      height: 100%;
      padding: 10px 15px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
    a {
      text-align: right;
    }
  }
  .disabled{
    background-color: #ddd;
    border-color: #ddd;
    color:#57a3f3;
    cursor: not-allowed; // 鼠标变化
  }
  .content {
    padding: 0 40px 22px;
    height: auto;
    .common-form {
      li {
        clear: both;
        margin-bottom: 15px;
        position: relative;
      }
    }
  }
}

.dialog-shadow,
.v2 .bbs .dialog-shadow,
.v2 .dialog-shadow {
  -webkit-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  -moz-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
}

@media screen and (min-width: 737px),
  screen and (-webkit-max-device-pixel-ratio: 1.9) and (max-width: 736px) and (min-device-width: 737px) {
  .wrapper {
    background: url(/static/images/con-bg_04f25dbf8e.jpg) repeat-x;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .dialog {
    background: url(/static/images/dialog-gray-bg.png) #fff bottom repeat-x;
    border-radius: 12px;
    display: none;
    margin: -163px 0 0 -218px;
    width: 436px;
    position: fixed;
    left: 50%;
    top: 50%;
  }
  .dialog .title h4 {
    border-bottom: #d1d1d1 solid 1px;
    box-shadow: 0 2px 6px #d1d1d1;
    color: #666;
    font-size: 20px;
    height: 61px;
    line-height: 61px;
    padding: 10px 0 0 35px;
  }
  .common-form li {
    clear: both;
    margin-bottom: 15px;
    position: relative;
  }
  .auto-login {
    position: absolute;
    top: 0px;
    left: 2px;
    color: #999;
  }
  .login-type {
    position: absolute;
    top: 2px;
    right: 2px;
    color: #999;
  }
  .register {
    padding: 0px 15px 0;
    border-right: 1px solid #ccc;
  }
  .border {
    margin-top: 10px;
    border-bottom: 1px solid #ccc;
  }
  .other {
    margin: 20px 5px 0 0;
    width: auto;
    color: #bbb;
    font-size: 12px;
    cursor: default;
    color: #999;
  }
  .footer {
    display: flex;
    flex-direction: row;
  }
  .agree {
    margin-bottom: 30px;
    color: #999;
  }
}

.registered {
  h4 {
    padding: 0;
    text-align: center;
    color: #666;
    border-bottom: 1px solid #dcdcdc;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    font-weight: 700;
    font-size: 20px;
    height: 60px;
    line-height: 60px;
  }
}

#wait {
  text-align: left;
  color: #999;
  margin: 0;
}
</style>

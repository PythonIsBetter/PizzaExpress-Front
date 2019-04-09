<template>
  <div>
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <sidebar-menu :menu="menu" />
    <div class="w">
      <div class="content">
        <div class="account-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <!--<y-footer></y-footer>-->
  </div>
</template>
<script>
  import YHeader from '/common/header'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        menu: [
          {
            header: false,
            title: 'PizzaEXP',
            collapsed: true,
            // component: componentName
            visibleOnCollapse: true,
            widthCollapsed: '50px',
            width: '150px'
          },
          //
          // { // item
          //   href: '/home',
          //   title: '首页',
          //   icon: '<v-icon name="beer"/>'
          // },
          // { // item
          //   href: '/goods',
          //   title: '菜单',
          //   icon: 'fa fa-user'
          //
          // },
          // { // item
          //   href: '/cart',
          //   title: '购物车',
          //   icon: 'fa fa-user'
          // },
          { // item with child
            href: '/user',
            title: '个人中心',
            icon: 'fa fa-chart-area',
            collapsed: true,
            child: [
              {
                href: '/user/orderList',
                title: '我的订单'
              },
              {
                href: '/user/information',
                title: '账户资料'
              },
              {
                href: '/user/addressList',
                title: '收货地址'
              },
              {
                href: '/user/logout',
                title: '退出登录'
              }
            ]
          }
        ]
      }
      // return {
      //   title: '我的订单',
      //   nav: [
      //     {name: '我的订单', path: 'orderList'},
      //     {name: '账户资料', path: 'information'},
      //     {name: '收货地址', path: 'addressList'},
      //     {name: '退出登录', path: 'Logout'}
      //   ],
      //   editAvatar: true
      // }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      tab (e) {
        this.$router.push({path: '/user/' + e.path})
      }
    },
    created () {
      let userId = getStore('userId')
      console.log('userID:' + userId)
      if (!userId) { // 登录了 直接存在用户名下
        this.$router.push({path: '/login'})
      } else { // 未登录 vuex
        let path = this.$route.path.split('/')[2]
        this.nav.forEach(item => {
          if (item.path === path) {
            this.title = item.name
          }
        })
      }
    },
    components: {
      YHeader
    },
    watch: {
      $route (to) {
        let path = to.path.split('/')[2]
        this.nav.forEach(item => {
          if (item.path === path) {
            this.title = item.name
          }
        })
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/mixin";

  .w {
    width: 100%;
    height: 100%;
    padding-top: 20px;
  }

  .content {
    display: flex;
    margin-left: 5%;
    height: 60%;
    width: 80%;
  }

  .account-sidebar {
    width: 210px;
    border-radius: 6px;
    .avatar {
      padding-top: 20px;
      border-radius: 10px;
      text-align: center;
      img {
        width: 168px;
        height: 168px;
      }
      h5 {
        font-size: 18px;
        line-height: 48px;
        font-weight: 700;
      }
    }
    .account-nav {
      padding-top: 15px;
      li {
        position: relative;
        height: 48px;
        border-top: 1px solid #EBEBEB;
        line-height: 48px;
        &:hover {
          a {
            position: relative;
            z-index: 1;
            height: 50px;
            background-color: #98AFEE;
            line-height: 50px;
            color: #FFF;
          }

        }
        a {
          display: block;
        }
        &.current {
          a {
            position: relative;
            z-index: 1;
            height: 50px;
            background-color: #98AFEE;
            line-height: 50px;
            color: #FFF;
          }
        }

      }
    }
  }

  .account-content {
    margin-left: 20px;
    flex: 1;
  }


</style>

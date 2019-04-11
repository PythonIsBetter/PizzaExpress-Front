<template>
  <div>
    <y-shelf title="退出登录">
      <div slot="content">
        <div class="avatar-box">
          <div class="r-box">
            <y-button text="退出登录" classStyle="main-btn" style="margin: 0;" @btnClick="editAvatar()"></y-button>
          </div>
        </div>
      </div>
    </y-shelf>
  </div>
</template>
<script>
  import YButton from '/components/YButton'
  import YShelf from '/components/shelf'
  import { mapState, mapMutations } from 'vuex'
  import { getStore, removeStore } from '/utils/storage'
  export default {
    data () {
      return {
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapMutations([
        'RECORD_USERINFO'
      ]),
      editAvatar () {
        removeStore('userId')
        this.$router.push({
          path: '/'
        })
      }
    },
    created () {
      this.userId = getStore('userId')
      this.token = getStore('token')
    },
    components: {
      YButton,
      YShelf
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
</style>

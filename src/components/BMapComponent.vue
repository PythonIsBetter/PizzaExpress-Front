<!--参考资料-->
<!--https://dafrok.github.io/vue-baidu-map/#/zh/bmaplib/lushu-->
<!--数据接口-->
<!--起点：start-->
<!--终点：end-->
<template>
  <baidu-map class="map" :center="{lng: 121.29, lat: 31.10}" :zoom="11">
    <bm-driving start="华东师范大学" end="上海虹桥机场" @searchcomplete="handleSearchComplete" :panel="false" :autoViewport="true"></bm-driving>
    <bml-lushu
      @stop="reset"
      :path="path"
      :icon="icon"
      :play="play"
      :rotation="true"
      :autoView="true"
      :speed="500">
    </bml-lushu>
  </baidu-map>
</template>

<script>
  import {BmlLushu} from 'vue-baidu-map'
  export default {
    components: {
      BmlLushu
    },
    data () {
      return {
        play: true,
        path: [],
        icon: {
          url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
          size: {width: 52, height: 26},
          opts: {anchor: {width: 27, height: 13}}
        }
      }
    },
    methods: {
      reset () {
        this.play = false
      },
      handleSearchComplete (res) {
        this.path = res.getPlan(0).getRoute(0).getPath()
      }
    }
  }
</script>

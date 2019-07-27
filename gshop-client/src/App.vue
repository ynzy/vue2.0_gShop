<template>
  <div id="app">
    <router-view/>
    <!-- TODO: 底部菜单组件是否要显示 -->
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FooterGuide from './components/FooterGuide/FooterGuide.vue'

import { reqFoodCategorys } from "./api";
import { reqAddress } from "./api";
export default {
  name: 'App',
  components: {
    FooterGuide
  },
  methods: {
    //TODO: 方法2.以数组形式映射模块中的方法
    ...mapActions(['getAddress','getUserInfo'])
  },
  // async mounted () {  //TODO:ES7语法，async await es7 promise
  //  const geohash = '40.10038,116.36867'
  //  const result = await reqAddress('40.10038,116.36867')
  //  console.log(result)
  // }
  // mounted () {
  //   const geohash = '40.10038,116.36867'
  //  const result =  reqFoodCategorys()
  // //  console.log(result)
  // result.then(function(res) {
  //   console.log(res)
  // })
  // }
  mounted () {
    //TODO: 方法1.含有异步操作，例如向后台提交数据
    // this.$store.dispatch('getAddress')
    this.getAddress();
    this.getUserInfo();
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>

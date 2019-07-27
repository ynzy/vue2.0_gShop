<!--  -->
<template>
  <div>
    <van-tabbar v-model="active" active-color="#07c160">
      <van-tabbar-item to="/msite" icon="shop">外卖</van-tabbar-item>
      <van-tabbar-item to="/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item to="/order" icon="column">订单</van-tabbar-item>
      <van-tabbar-item to="/profile" icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  components: {},

  computed: {},

  methods: {},
  mounted() {
    //TODO: 监听路由路径，修改相对应的底部的菜单项
    let path = this.$route.path;
    if (path == "/msite") {
        this.active = 0;
      } else if (path == "/search") {
        this.active = 1;
      } else if (path == "/order") {
        this.active = 2;
      } else if (path == "/profile") {
        this.active = 3;
      }
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../../common/stylus/mixins.styl';

</style>
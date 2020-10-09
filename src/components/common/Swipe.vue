<template>
  <!-- 轮播图 -->
  <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white">
    <van-swipe-item v-for="(img, index) in bannerList" :key="index">

      <!-- 设置懒加载 -->
      <!-- <img  v-if="show" v-lazy="doglazy" /> -->
      <!-- <img :src="show ? doglazy : img" alt="" /> -->
      <img v-lazy="img"  alt="">
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  props: ["bannerList"],
  data() {
    return {

      // show: true,
    };
  },
 
  // watch: {
  //   async bannerList() {
  //     // setTimeout( async () => {
  //     await this.$nextTick();
  //     console.log(this.$store.state.bannerList);
  //     this.show = false;
  //     // },1000)
  //   },
  // },
};
</script>

<style lang="stylus" scoped>
.my-swipe .van-swipe-item {
  height: 200px;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
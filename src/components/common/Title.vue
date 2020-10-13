<template>
  <div>
    <van-nav-bar
      :title="name"
      :left-arrow="arrow"
      :fixed=fixed
      :placeholder=true
      @click-left="onClickLeft"
      :border=border
    />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "商品",
    },
    arrow: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    // 返回上一级的时事件
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="stylus" scoped></style>
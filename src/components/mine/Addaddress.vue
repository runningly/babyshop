<template>
  <div class="wrap">
    <Title :name="showName" :arrow="arrow" class="top" />

    <van-address-edit
      :area-list="areaList"
      value="110101"
      show-set-default
      show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>

<script>
import Title from "../common/Title";
import areaList from "../common/areaList";
export default {
  components: {
    Title,
  },
  data() {
    return {
      // name: "编辑收货地址",
      arrow: true,
      areaList,
      addressInfo: {},
      token: sessionStorage.getItem("token") || "",
      who: this.$route.params.mode,
    };
  },
  computed: {
    showName() {
      // 根据不同的mode，来设置对应的头部
      return this.$route.params.mode === "add"
        ? "新增收货地址"
        : "编辑收货地址";
    },
    editAddress() {
      return this.$store.state.editAddress
    }
  },
  mounted() {
    // if (this.who === 'who') {

    // }
  },
  methods: {
    onSave(content) {
      // content为表单内容
      if (this.who === "add") {
        // 如果是add，就发起新增的请求
        this.$store.dispatch("addAddressList", {
          // 发起新增的请求
          token: this.token,
          getName: content.name,
          getPhone: content.tel,
          address:
            content.province +
            content.city +
            content.county +
            content.addressDetail,
          status: content.isDefault ? "1" : "2",
        });
      } else {
        // 反之就发起编辑的请求
        this.$store.dispatch('updateAddressList', {

        })
      }

      console.log(content);
    },
  },
};
</script>

<style lang="stylus" scoped>
.wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: rgb(246, 245, 245);

  .top {
    border-bottom: 1px solid #f1f1f1;
  }
}
</style>
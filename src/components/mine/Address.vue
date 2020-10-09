<template>
  <div class="wrap">
    <Title :name="name" :arrow="arrow" class="top" />

    <van-address-list
      v-model="chosenAddressId"
      :list="ressList"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import Title from "../common/Title";
export default {
  components: {
    Title,
  },
  data() {
    return {
      token: sessionStorage.getItem("token") || "",
      name: "我的收货地址",
      arrow: true,
      chosenAddressId: "",
      ressList: [],
    };
  },
  methods: {
    onAdd() { // 添加新的收货地址
      this.$router.push("/addaddress/add");
    },
    onEdit(item) {// 编辑新的收货地址
    this.$store.state.editAddress = item // 将当前的item保存到vuex中

      this.$router.push('/addaddress/edit')
    },
  },
  mounted() {
    if (this.token) {
      this.$store.dispatch("getAddressList", {
        token: this.token,
      });
    }
  },
  computed: {
    AddressList() {
      return this.$store.state.AddressList;
    },
  },
  watch: {
    AddressList() {
      // vant规定了固定的数据结构, 所以需要自行设置好
      let arr = this.AddressList.resArr.map((val) => {
        let obj = { // 设置对应的数据
          id: val.addressId,
          name: val.getName,
          tel: val.getPhone,
          address: val.address,
          isDefault: val.status=='1'? true:false
        }
        return obj // 返回到arr中
      });
      console.log(arr);
      this.ressList = arr // 保存到本地
      this.chosenAddressId = arr[0].id // 设置默认选中的id
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
    border-bottom: 1px solid #ccc;
  }
}
</style>
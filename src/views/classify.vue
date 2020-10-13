<template>
  <div>
    <!-- 头部区域 -->
    <Title :name="name" />

    <van-search v-model="value" placeholder="新春大促销" shape="round" />

    <!-- 左侧侧边导航 -->
    <div class="content">
      <van-sidebar v-model="activeKey" @change="change">
        <van-sidebar-item title="分类推荐" />
        <van-sidebar-item title="奶粉" />
        <van-sidebar-item title="尿不湿" />
      </van-sidebar>

      <!-- 右边内容区域 -->
      <ul class="main-content">
        <li
          v-for="(item, index) in classifyList"
          :key="index"
          @click="toDetail(item.productId)"
        >
          <img v-lazy="item.imgUrl" alt="" />
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Title from "../components/common/Title";

export default {
  components: {
    Title,
  },
  data() {
    return {
      name: "分类",
      value: "",
      // 利用短路逻辑，当sessionStorage中有对应数据，就使用它
      activeKey: sessionStorage.getItem("activeKey") || 0, // 当前所在页
      type: sessionStorage.getItem("type") || "1", // 需要发起请求的页
    };
  },

  computed: {
    classifyList() {
      return this.$store.state.classify.classifyList; // 获取vuex 里的数据
    },
  },

  mounted() {
    // 调用 vuex中的异步任务
    this.$store.dispatch("classify/getClassifyList", {
      type: this.type,
    });
  },

  methods: {
    change(index) {
      this.type = index + 1 + ""; // 转换成字符串
      // 在sessionStorage里存放当前页的 key，解决重新进入分类是总是显示第一页
      sessionStorage.setItem("activeKey", this.activeKey);
      sessionStorage.setItem("type", this.type);

      this.$store.dispatch("classify/getClassifyList", { // 根据当前 type发起请求 
        type: this.type,
      });
    },

    // 导航到详情页
    toDetail(id) {
      this.$router.push("/detail/" + id);
    },
  },
};
</script>

<style lang="stylus" scoped>
.content {
  display: flex;

  .main-content {
    flex: 1;
    display: flex;
    flex-wrap: wrap;

    li {
      width: 33.33%;
      height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        width: 60px;
        height: 60px;
      }

      span {
        font-size: 14px;
        margin-top: 10px;
      }
    }
  }
}
</style>
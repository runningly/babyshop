<template>
  <div>
    <!-- 顶部标题 -->
    <Title :name="name" />

    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 轮播图区域 -->
      <swipe :bannerList="bannerList" />

      <!-- 4宫格区域 -->
      <van-grid :border="false">
        <van-grid-item v-for="(item, index) in list" :key="index">
          <van-icon size="24" :color="item.color" :name="item.icon" />
          <!-- <van-image :src="item.imgUrl" /> -->
          <span class="grid-span">{{ item.title }}</span>
        </van-grid-item>
      </van-grid>

      <!-- 4个商品区域 -->
      <div class="i-four">
        <div
          v-for="(item, index) in fontImgList"
          :key="index"
          :class="item.className"
        >
          <h4>{{ item.name }}</h4>
          <img src="../assets/img/1.jpg" alt="" />
        </div>
      </div>

      <van-sidebar v-model="activeKey" class="i-sidebar">
        <van-sidebar-item title="推荐商品" />
      </van-sidebar>
      
      <!-- 下拉加载更多 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset="30"
      >
        <!-- 商品列表区域 -->
        <van-card
          v-for="(item, index) in reCommendList"
          :key="index"
          :price="item.currentPrice | retain"
          desc=""
          :title="item.productName"
          :thumb="item.imgUrl"
          origin-price="10.00"
          class="i-title"
          @click="toDetail(item.productId)"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Title from "../components/common/Title";
import Swipe from "../components/common/Swipe";

import { mapState, mapActions } from "vuex";
import { Toast } from "vant";

export default {
  components: {
    Swipe,
    Title,
  },
  data() {
    return {
      name: "首页",
      count1: 0, // 刷行的次数
      active: 0,
      isLoading: true, // 上拉刷新
      finished: false, // 是否加载完成
      loading: false, // 是否处于加载状态
      count: 3, // 一次请求几条数据
      list: [
        {
          color: "rgb(252,220,196)",
          icon: "notes-o",
          imgUrl: "https://img.yzcdn.cn/vant/apple-1.jpg",
          title: "每日福利",
        },
        {
          color: "rgb(246,111,112)",
          icon: "flower-o",
          imgUrl: "https://img.yzcdn.cn/vant/apple-1.jpg",
          title: "热销榜",
        },
        {
          color: "rgb(255,191,52)",
          icon: "orders-o",
          imgUrl: "https://img.yzcdn.cn/vant/apple-1.jpg",
          title: "会员中心",
        },
        {
          color: "rgb(170,123,244)",
          icon: "balance-o",
          imgUrl: "https://img.yzcdn.cn/vant/apple-1.jpg",
          title: "皮鲁甄选",
        },
      ],
      fontImgList: [
        {
          name: "全球奶粉",
          className: "one",
        },
        {
          name: "尿不湿",
          className: "two",
        },
        {
          name: "营养辅食",
          className: "three",
        },
        {
          name: "宝宝洗护",
          className: "four",
        },
      ],
       activeKey: 0,
    };
  },
  filters: {
    retain(value) {
      return value.toFixed(2); // 保留两位小数
    },
  },
  watch: {
    bannerList() {
      // console.log(this.bannerList);
    },
    // 侦听下拉数据的变化
    // 当新数据(数组) 减去 之前的数组，的差等于请求的数量，loading结束加载状态，设置为false
    reCommendList(newVal, oldVal) {
      if (newVal.length - oldVal.length === this.count) {
        this.loading = false;
      } else {
        // 当以上条件不成立了，表明数据已经加载完成，结束加载。
        this.finished = true;
      }
    },
  },
  mounted() {
    this.getBannerList();
  },
  computed: {
    ...mapState({
      bannerList: "bannerList",
      reCommendList: "reCommendList",
      page: "page",
    }),
  },

  methods: {
    ...mapActions(["getBannerList", "getRecommendList"]), // 将vuex里的异步方法映射到methods

    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        this.count1++;
      }, 500);
    },

    // 滚动条与底部距离小于 offset 时触发
    // 默认第一次会加载
    // 根据 第几页， 请求数据的数量，来发起请求
    onLoad() {
      this.loading = true; //是否处于加载状态，加载过程中不触发load事件
      this.getRecommendList({
        page: this.page,
        count: 3,
      });
      // console.log('加载一次');
    },

    // 导航到详情页面，通过动态路由传递id
    toDetail(id) {
      this.$router.push("/detail/" + id);
    },
  },
};
</script>

<style lang="stylus" scoped>
.grid-span {
  font-size: 14px;
  margin-top: 10px;
}

.i-four {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;

  div {
    width: 170px;
    height: 120px;
    // background red
    margin-right: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-evenly;

    img {
      width: 80px;
      height: 80px;
      align-self: flex-end;
      border-radius: 10px;
    }

    h4 {
      font-weight: normal;
      font-size 16px
    }
  }

  .one {
    background-color: rgb(255, 247, 227);
  }

  .two {
    background-color: rgb(252, 255, 239);
  }

  .three {
    background-color: rgb(255, 243, 245);
  }

  .four {
    background-color: rgb(246, 248, 253);
  }

  .two, .four {
    margin-right: 0px;
  }
}

.van-card__title {
  font-size: 14px;
  font-weight: 500;
}

.van-card__price {
  color: rgb(206, 80, 89);
}
.i-sidebar 
  margin-left 10px

.van-sidebar-item {
  padding-top 10px
  padding-bottom 10px
}
</style>
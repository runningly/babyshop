<template>
  <div>
    <!-- 顶部标题 -->
    <Title :name="name" :arrow="arrow" class="t-border" />

    <!-- 轮播图 -->
    <van-swipe
      class="my-swipe"
      :autoplay="5000"
      indicator-color="white"
      v-if="datailInfo.imgArr"
      @change="onChange"
    >
      <van-swipe-item v-for="(item, index) in datailInfo.imgArr" :key="index">
        <img v-lazy="item" alt="" />
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/{{ datailInfo.imgArr.length }}
        </div>
      </template>
    </van-swipe>

    <!-- 内容区域 -->
    <van-cell-group v-if="datailInfo">
      <van-cell :border="false">
        <!-- 自定义左边标题 -->
        <template #title>
          <div class="currentPrice">
            <span class="rmb">￥</span>
            <span class="now">
              {{ datailInfo.currentPrice | twoRMB }}
            </span>
            <span class="vip">会员专享</span>
          </div>
        </template>
        <!-- 自定义标题下方 label 的内容 -->
        <template #label>
          <div class="descriptor">
            普通价格 {{ datailInfo.originalPrice | twoRMB }}
          </div>
        </template>
      </van-cell>

      <van-cell class="two-cell" :border="false">
        <template #title>
          <div class="productName">
            {{ datailInfo.productName }}
          </div>
        </template>

        <template #label>
          <div class="describe">
            {{ datailInfo.describe }}
          </div>
        </template>
      </van-cell>

      <!-- 规格区域 -->
      <van-cell is-link class="common-cell" size="large" @click="change">
        <template #title>
          <div class="specification">
            <span>选择</span>
            <span class="two">可选规格</span>
          </div>
        </template>
      </van-cell>

      <!-- 商品评论区域 -->
      <van-cell is-link class="common-cell" size="large">
        <template #title>
          <div class="specification">
            <span>商品评论</span>
            <span class="two">(0)</span>
          </div>
        </template>
        <template>
          <div class="good">好评</div>
        </template>
      </van-cell>

      <!-- 推荐商品区域 -->
      <van-cell title="推荐商品" />
    </van-cell-group>

    <!-- 下方按钮区域 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" class="border-text" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button
        color="rgb(255,155,63)"
        type="warning"
        text="加入购物车"
        class="common-border"
      />
      <van-goods-action-button
        color="rgb(247,111,23)"
        type="danger"
        text="立即购买"
        class="common-border"
      />
    </van-goods-action>

    <van-sku
      v-model="show"
      :sku="sku"
      :goods="datailInfo.standards"
      :goods-id="datailInfo._id"
 
    />
     <!-- @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked" -->

    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>11</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>20</li>
      <li>21</li>
      <li>22</li>
      <li>23</li>
      <li>24</li>
      <li>25</li>
      <li>26</li>
      <li>27</li>
      <li>28</li>
      <li>29</li>
      <li>30</li>
      <li>31</li>
      <li>32</li>
      <li>33</li>
      <li>34</li>
      <li>35</li>
      <li>36</li>
      <li>37</li>
      <li>38</li>
      <li>39</li>
      <li>40</li>
      <li>41</li>
      <li>42</li>
      <li>43</li>
      <li>44</li>
      <li>45</li>
      <li>46</li>
      <li>47</li>
      <li>48</li>
      <li>49</li>
      <li>50</li>
      <li>51</li>
      <li>52</li>
      <li>53</li>
      <li>54</li>
      <li>55</li>
      <li>56</li>
      <li>57</li>
      <li>58</li>
      <li>59</li>
      <li>60</li>
      <li>61</li>
      <li>62</li>
      <li>63</li>
      <li>64</li>
      <li>65</li>
      <li>66</li>
      <li>67</li>
      <li>68</li>
      <li>69</li>
      <li>70</li>
      <li>71</li>
      <li>72</li>
      <li>73</li>
      <li>74</li>
      <li>75</li>
      <li>76</li>
      <li>77</li>
      <li>78</li>
      <li>79</li>
      <li>80</li>
      <li>81</li>
      <li>82</li>
      <li>83</li>
      <li>84</li>
      <li>85</li>
      <li>86</li>
      <li>87</li>
      <li>88</li>
      <li>89</li>
      <li>90</li>
      <li>91</li>
      <li>92</li>
      <li>93</li>
      <li>94</li>
      <li>95</li>
      <li>96</li>
      <li>97</li>
      <li>98</li>
      <li>99</li>
      <li>100</li>
    </ul>
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
      name: "商品详情",
      arrow: true, // 显示返回键
      productId: "", // 用于发起请求的id
      current: 0,
      show: true, // 规格的显示
      sku: { // 商品的sku数据

      },
      goods: { // 商品信息

      },
    };
  },
  created() {
    this.productId = this.$route.params.id; // 将当前路由id，存储到data中
  },
  mounted() {
    this.$store.dispatch("getDetailList", {
      productId: this.productId, // 发起请求
    });
  },
  computed: {
    datailInfo() {
      return this.$store.state.datailInfo;
    },
  },
  // 动态参数id改变时触发，可用来实现’今日热卖‘的功能
  beforRouteUpdate(to) {
    console.log(to);
  },
  methods: {
    onChange(index) {
      this.current = index;
      console.log();
    },
    change() {
      this.show = true
      console.log(1);
    }
  },

  filters: {
    // 过滤成保留两位小数
    twoRMB(value) {
      // 加判断避免报错
      if (typeof value === "number") {
        return value.toFixed(2);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.t-border {
  border-bottom: 1px solid rgb(232, 231, 235);
}

.my-swipe .van-swipe-item {
  height: 250px;

  img {
    width: 100%;
    height: 100%;
  }
}

.custom-indicator {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 5px 10px;
  font-size: 15px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
}

.currentPrice {
  color: rgb(225, 96, 41);
  font-size: 12px;
  display: flex;
  align-items: flex-end;

  .now {
    font-size: 22px;
  }

  .vip {
    display: inline-block;
    border-radius: 15px;
    background: rgb(246, 236, 211);
    padding: 0px 7px;
    margin-left: 4px;
    transform: scale(0.8);
  }

  .rmb {
    height: 22px;
    margin-right: 3px;
  }
}

.descriptor {
  font-size: 13px;
}

.two-cell {
  padding-top: 0px;
  border-bottom: 15px solid rgb(247, 247, 247);

  .productName {
    font-size: 16px;
    font-weight: 600;
  }

  .describe {
    width: 343px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.specification {
  font-size: 15px;
  font-weight: 500;

  .two {
    margin-left: 13px;
  }
}

.common-cell {
  border-bottom: 15px solid rgb(247, 247, 247);
}

.good {
  color: rgb(235, 107, 25);
}

.van-goods-action {
  z-index: 100;
}

.common-border {
  border-radius: 0;
}

.border-text {
  border-right: 1px solid #f1f1f1;
}
</style>
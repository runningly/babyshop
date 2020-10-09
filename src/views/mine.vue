<template>
  <div class="wrap">
    <Title :name="name" />

    <div class="top">
      <!-- 登录前 -->
      <div class="my" @click="goLogin" v-if="!login">
        <div class="icon">
          <van-icon
            name="manager"
            color="rgb(255,216,193)"
            size="50"
            class="my-icon"
          />
        </div>
        <div class="my-font">
          <span>立即登录</span>
        </div>
      </div>

      <!-- 登录后 -->
      <div class="my" @click="goUser" v-else>
        <div class="icon">
          <img :src='userList.avatarImg' alt="">
        </div>

        <div class="my-font">
          <span>{{userList.nickName}}</span>
          <span class="vip">普通会员</span>
        </div>
      </div>
    </div>

    <div class="order">
      <van-cell title="我的订单" is-link :border="false" />

      <van-grid :border="false">
        <van-grid-item
          v-for="(item, index) in gridList"
          :key="index"
          :icon="item.icon"
          :text="item.name"
        />
      </van-grid>
    </div>

    <div class="order">
      <van-grid :border="false">
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="close" text="退出登录" v-if="login" @click="quit"/>
      </van-grid>
    </div>
    <div class="base">liyou提供技术支持</div>
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
      name: "会员中心",
      gridList: [
        {
          name: "待付款",
          icon: "balance-pay",
        },
        {
          name: "待发货",
          icon: "peer-pay",
        },
        {
          name: "待收货",
          icon: "logistics",
        },
        {
          name: "已收货",
          icon: "completed",
        },
      ],
      login: false, // 当前登录的状态
      token: sessionStorage.getItem("token") || '' // 保存token
    };
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    quit() { // 退出登录
      sessionStorage.removeItem('token')
      this.token = ''
      this.login = false
    },
    goUser() { // 查看个人信息事件
      this.$router.push('/userinfo')
    }
  },
  mounted() {
    if (this.token) {
      this.login = true;
      this.$store.dispatch('getUserInfo', { // 发起请求
        token: this.token
      })
    }else {
      this.login = false
    }
  },
  computed: {
    userList() { // 获取用户数据
      return this.$store.state.userList;
    },
  },

};
</script>

<style lang="stylus" scoped>
.wrap {
  background-color: rgb(245, 245, 244);

  // padding-bottom: 50px;

  // height 100vh
  .top {
    width: 100%;
    height: 130px;
    background: rgb(254, 142, 90);
    display: flex;
    align-items: center;
  }

  .my {
    display: flex;
    margin-left: 20px;
    align-items: center;

    .icon {
      width: 55px;
      height: 55px;
      border: 3px solid rgb(254, 187, 138);
      box-shadow: 0px 0px 2px 1px #f1f1f1;
      border-radius: 50%;
      text-align: center;
      overflow: hidden;
      background-color: rgb(253, 239, 233);
      img {
        width 100%
        height 100%
      }
      .my-icon {
        margin-top: 15px;
      }
    }

    .my-font {
      font-size: 16px;
      margin-left: 15px;
      color: #fff;
      display flex
      flex-direction column
      .vip {
        display flex
        margin-top 10px
        border-radius 10px
        background-color rgb(254,230,203)
        font-size 12px
        color rgb(198,162,148)
        justify-content center
        align-items center
        width 60px
      }
    }
  }

  .order {
    width: 93%;
    background-color: #fff;
    margin: 10px auto;
    border-radius: 13px;
    overflow: hidden;

    .van-cell__title {
      font-weight: 600;
    }

    .van-cell--clickable {
      border-bottom: 1px solid #f1f1f1;
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }

  .base {
    font-size: 14px;
    text-align: center;
    color: #ccc;
    padding-bottom: 13px;
  }
}
</style>
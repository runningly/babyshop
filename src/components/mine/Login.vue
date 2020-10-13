<template>
  <div class="wrap">
    <Title :name="name" :border="border" />

    <van-form class="lo-from">
      <van-field
        v-model="phone"
        center
        clearable
        label="手机号"
        placeholder="请输入手机号"
      >
        <template #button>
          <van-button
            size="small"
            class="lo-btn"
            type="primary"
            @click="authCode"
            v-model="time"
            :disabled="use"
            >{{ time }}</van-button
          >
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="验证码"
        label="短信验证码"
        placeholder="请输入手机验证码"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />

      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          name="sub"
          @click="loginClick"
        >
          登录
        </van-button>
      </div>
    </van-form>
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
      name: "登录",
      border: true,
      code: "",
      time: "发送验证码",
      phone: "", // 双向绑定输入的值
      timer: null,
      use: false,
    };
  },
  watch: {
    // 15秒倒计时
    time() {
      if (typeof this.time == "number") {
        clearInterval(this.timer); // 清除定时器，防止多次启动
        this.timer = setInterval(() => {
          this.time--;
        }, 1000);
      }

      if (this.time == 0) {
        this.time = "发送验证码";
        clearInterval(this.timer);
        this.use = false;
      }
    },
    loginList() { // 侦听数据的改变
      if (sessionStorage.getItem("token")) {
        // 如果有token
        this.$router.push("/mine");
      }
    },
  },
  methods: {
    authCode() {
      // 发送验证码
      if (typeof this.time == "string") {
        this.time = 15;
        this.use = true;
      }
      // 调用vuex里的异步任务
      this.$store.dispatch("goLogin/getCodeInfo", this.phone);
    },
    // 登录的点击事件
    loginClick() {
      this.$store.dispatch("goLogin/login", {
        phone: this.phone,
        code: this.code,
      });
    },
  },
  computed: {
    loginList() {
      return this.$store.state.goLogin.loginList;
    },
  },
  mounted() {
    if (sessionStorage.getItem("token")) {
      // 如果有token
      this.$router.push("/mine");
    }
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
  background-color: #ffffff;
  z-index: 9;

  .lo-from {
    margin-top: 20px;
    flex-direction: column;
    justify-content: center;
  }
}

.lo-btn {
  width: 78px;
}
</style>
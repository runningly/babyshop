<template>
  <div class="wrap">
    <Title :name="name" :arrow="arrow" />
    <!-- 头像区域 -->
    <van-cell title="头像" is-link size="large" class="top-img">
      <template #default>
        <div class="de-img">
          <img v-lazy="userList.avatarImg" alt="" />
        </div>
      </template>
    </van-cell>
    <!-- 账号区域 -->
    <van-cell title="账号" is-link size="large" @click="userClick"  class="top-img">
      <template #default>
        <div>
          <div v-if="!nameShow">{{ nameValue }}</div>
          <van-cell-group v-else>
            <van-field
              v-model="nameValue"
              placeholder="请输入用户名"
               :rules="[{ required: true, message: '请填写用户名' }]"
               @blur="blurList"
            />
          </van-cell-group>
        </div>
      </template>
    </van-cell>
    <!-- 性别区域 -->
    <van-cell
      title="性别"
      is-link
      :value="sex | sexFilter"
      size="large"
      @click="showSex"
    />
    <!-- 地址管理区域 -->
    <van-cell title="地址管理" is-link size="large" class="site" @click="goAddress"/>
    <!-- 按钮区域 -->
    <div class="button">
      <van-button type="info" @click="saveUserInfo">保存资料</van-button>
      <van-button color="#fff" class="btn-font">退出当前账号</van-button>
    </div>
    <!-- 弹出区域 -->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      description="选择性别"
      close-on-click-action
      @select="onSelect"
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
      name: "会员资料",
      border: true,
      arrow: true,
      token: sessionStorage.getItem("token") || "",
      show: false,
      actions: [
        // 弹起窗里面的内容数据
        { name: "男" },
        { name: "女" },
      ],
      sex: '?',
      nameShow: false, // 输入框的展示
      nameValue:'' // 输入框内容
    };
  },
  filters: {
    sexFilter(value) {
      return value == 1 ? "男" : "女";
    },
  },
  mounted() {
    if (this.token) {
      this.$store.dispatch("getUserInfo", {
        // 发起请求
        token: this.token,
      });
    }
  },
  watch: {
    userList() {
      this.nameValue = this.userList.nickName
      this.sex = this.userList.sex
    }
  },
  computed: {
    userList() {
      // 获取用户数据
      return this.$store.state.userList;
    },
  },
  methods: {
    showSex() {
      this.show = true;
    },
    onSelect(item) {
      // 点击选项时触发
      item.name == "男" ? (this.sex = 1) : (this.sex = 2);
      console.log(this.sex);
    },
    userClick() {
      this.nameShow = true
    },
    blurList() { // 失去焦点事件
      this.nameShow = false
    },
    saveUserInfo() { // 点击保存资料
      this.$store.dispatch('updateUser', {
        token: this.token,
        nickName: this.nameValue,
        sex: this.sex
      })
    },
    goAddress() { // 前往收货地址管理页面
      this.$router.push('/address')
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
  z-index: 2;
  background-color: rgb(246, 245, 245);
}

.top-img {
  display: flex;
  align-items: center;
}

.de-img {
  width: 100%;
  height: 100%;
  vertical-align: center;

  img {
    width: 38px;
    height: 38px;
  }
}

.site {
  margin-top: 13px;
}

.button {
  display: flex;
  flex-direction: column;
  height: 140px;
  justify-content: space-evenly;

  .btn-font {
    .van-button__content {
      color: #000;
    }
  }
}
</style>
<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- /导航栏 -->

    <!-- 表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="UserFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="UserFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            class="sent-sms-btn"
            v-if="isCountDownShow"
            :time="1000 * 10"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            native-type="button"
            class="sent-sms-btn"
            size="small"
            type="default"
            @click="onSendSms"
          >
            发送验证码
          </van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /表单 -->
  </div>
</template>

<script>
import { login, sendSms } from "@/api/User";
export default {
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
      UserFormRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            required: true,
            pattern:
              /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
            message: "手机号格式不正确",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            required: true,
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      isCountDownShow: false, // 是否展示倒计时
    };
  },
  methods: {
    async onSubmit() {
      // 1、获取表单数据
      const user = this.user;
      // 2、表单验证

      // 在组件中必须通过 this.$toast 来调用Toast 组件
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true, // 禁用背景点击
        duration: 0, // 持续事件，默认是 2000 ， 如果为 0 则持续展示
      });
      // 3、提交表单请求登录
      try {
        const { data } = await login(user);
        console.log("登录成功", data);
        this.$store.commit("setUser", data.data);
        this.$toast.success("登录成功");
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("手机号或验证码错误");
        } else {
          this.$toast.fail("登录失败,请稍后再试", err);
        }
      }
    },
    async onSendSms() {
      console.log("onSendSms");
      // 1.校验手机号
      try {
        await this.$refs.loginForm.validate("mobile");
        console.log("验证通过");
      } catch (err) {
        return console.log("验证失败");
      }
      // 2.验证通过，显示倒计时
      this.isCountDownShow = true;
      // 3.请求发送验证码
      try {
        const res = await sendSms(this.user.mobile);
        console.log("发送成功", res);
        this.$toast("发送成功");
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false;
        if (err.response.status === 429) {
          this.$toast("发送太频繁了，请重试");
        } else {
          this.$toast("发送失败");
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
    margin-right: 25px;
  }
  .sent-sms-btn {
    background-color: #ededed;
    color: #666666;
    text-align: center;
    width: 152px;
    height: 46px;
    border-radius: 23px;
    font-size: 22px;
    word-break: keep-all;
    white-space: nowrap;
  }
  .login-btn-wrap {
    padding: 53px 28px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      border-radius: 10px;
    }
  }
}
</style>

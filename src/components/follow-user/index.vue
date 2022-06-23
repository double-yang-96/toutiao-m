<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    :loading="loading"
    @click="onFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from "@/api/User";
export default {
  name: "FollowUser",
  props: {
    isFollowed: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      is_followed: this.isFollowed,
    };
  },
  methods: {
    async onFollow() {
      this.loading = true; // 关注按钮的 loading 状态
      console.log(this.is_followed);
      console.log(this.userId);
      try {
        if (this.is_followed) {
          // 已关注，取消关注
          const { data } = await deleteFollow(this.userId);
          console.log(data);
          this.is_followed = false;
        } else {
          // 没有关注，添加关注
          const { data } = await addFollow(this.userId);
          console.log(data);
          this.is_followed = true;
        }
        this.$emit("update-is_followed", !this.is_followed);
      } catch (err) {
        console.log(err);
        let message = "操作失败，请重试！";
        if (err.response && err.response.status === 400) {
          message = "你不能关注你自己";
        }
        this.$toast(message);
      }
      this.loading = false;
    },
  },
};
</script>

<style></style>

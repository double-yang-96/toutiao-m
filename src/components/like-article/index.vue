<template>
  <van-icon
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    :color="value === 1 ? '#e5645f' : '#777'"
    class="collect-article"
    @click="onLike"
  />
</template>

<script>
import { addLikeArticle, deleteLikeArticle } from "@/api/User";
export default {
  name: "LikeArticle",
  props: {
    value: {
      type: Number,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async onLike() {
      this.loading = true;
      try {
        let status = -1;
        if (this.value !== 1) {
          // 没有点赞，添加点赞
          await addLikeArticle(this.articleId);
          status = 1;
          // 更新视图
          this.$emit("input", status);
          this.$toast.success("点赞成功");
        } else {
          // 点赞了，取消点赞
          await deleteLikeArticle(this.articleId);
          this.$emit("input", status);
          this.$toast.success("取消点赞");
        }
      } catch (err) {
        this.$toast.fail("点赞失败，请稍后再试！");
      }
      this.loading = false;
    },
  },
};
</script>

<style></style>

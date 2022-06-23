<template>
  <van-icon
    :name="value ? 'star' : 'star-o'"
    :color="value ? '#ffa500' : '#777'"
    class="collect-article"
    @click="onCollect"
  />
</template>

<script>
import { addCollection, deleteCollection } from "@/api/User";
export default {
  name: "CollectArticle",
  props: {
    value: {
      type: Boolean,
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
    async onCollect() {
      console.log(1);
      this.loading = true;
      try {
        if (this.value) {
          // 已收藏，取消收藏
          const { data } = await deleteCollection(this.articleId);
        } else {
          // 未收藏，添加收藏
          const { data } = await addCollection(this.articleId);
        }
        // 更新视图
        this.$emit("input", !this.value);
        // 自定义事件修改数据不是立即的
        this.$toast.success(!this.value ? "收藏成功" : "取消收藏");
      } catch (err) {
        this.$toast.fail("收藏失败，请稍后再试！");
      }
      this.loading = false;
    },
  },
};
</script>

<style></style>

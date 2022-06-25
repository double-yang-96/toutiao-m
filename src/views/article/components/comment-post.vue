<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button @click="onPost" :disabled="!message.length" class="post-btn"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from "@/api/comment";
export default {
  name: "CommentPost",
  components: {},
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      try {
        const { data } = await addComment({
          target: this.target, // 评论的目标id
          content: this.message, // 评论内容
          art_id: this.articleId ? this.articleId.toString() : null, // 文章id,对评论内容发表回复是，需要传递此参数
        });
        // console.log(data);
        // 关闭弹出层
        // 将发布内容显示到列表顶部
        this.$emit("post-success", data.data);

        // 清空文本框
        this.message = "";
        this.$toast.success("发布成功");
      } catch (err) {
        this.$toast("请求失败");
        this.$toast("发布失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>

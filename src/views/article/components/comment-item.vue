<template>
  <!-- 评论列表 -->
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      round
      width="30"
      height="30"
      style="margin-right: 10px"
      :src="localComment.aut_photo"
    />
    <span style="color: #466b9d" slot="title">{{ localComment.aut_name }}</span>
    <div slot="label">
      <p style="color: #363636">{{ localComment.content }}</p>
      <p class="reply-bottem">
        <span style="margin-right: 10px">{{
          localComment.pubdate | relativeTime
        }}</span>
        <van-button
          round
          @click="$emit('reply-click', localComment)"
          size="mini"
          type="default"
          >回复{{ localComment.reply_count }}</van-button
        >
      </p>
    </div>
    <van-icon
      slot="right-icon"
      :name="localComment.is_liking ? 'like' : 'like-o'"
      :color="localComment.is_liking ? '#e5645f' : '#777'"
      :loading="commentLoading"
      @click="onCommentLike"
      >{{
        localComment.like_count > 0 ? localComment.like_count : "赞"
      }}</van-icon
    >
  </van-cell>
  <!-- 评论列表 -->
</template>

<script>
import { addCommentLike, deleteCommentLike } from "@/api/comment";
export default {
  name: "comment-item",
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      commentLoading: false,
      localComment: this.comment,
    };
  },

  methods: {
    async onCommentLike() {
      this.commentLoading = true;
      //   console.log(this.localComment);
      try {
        // 点赞了，就取消
        if (this.localComment.is_liking) {
          await deleteCommentLike(this.localComment.com_id);
          this.localComment.like_count--;
        } else {
          // 没点赞，就点赞
          await addCommentLike(this.localComment.com_id);
          this.localComment.like_count++;
        }
        this.localComment.is_liking = !this.localComment.is_liking;
      } catch (err) {
        console.log(err);
        this.$toast.fail("点赞失败，请稍后再试");
      }
      this.commentLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
/deep/.reply-bottem {
  display: flex;
  align-items: center;
}

.van-list {
  margin-bottom: 45px;
}
</style>

<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
    </van-nav-bar>
    <div class="scroll-wrap">
      <!-- 当前评论 -->
      <comment-item :comment="comment" />
      <!-- /当前评论 -->

      <!-- 全部回复 -->
      <van-cell title="全部回复" />
      <comment-list :list="commentList" :source="comment.com_id" type="c" />
      <!-- /全部回复 -->
    </div>
    <!-- 发布评论 -->
    <div class="post-wrap">
      <van-button class="post-btn" size="small" round @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post :target="comment.com_id" @post-success="onPostSuccess" />
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import CommentItem from "./comment-item";
import CommentList from "./comment-list";
import commentPost from "./comment-post";
export default {
  name: "CommentReply",
  components: {
    CommentItem,
    CommentList,
    commentPost,
  },
  inject: ["articleId"],
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isPostShow: false,
      commentLIst: [], // 评论的回复列表
      localComment: this.comment,
    };
  },
  methods: {
    onPostSuccess(data) {
      // 更新回复数量
      this.localComment.reply_count++;
      // 关闭弹层
      this.isPostShow = false;
      // 将最新的回复内容展示到列表顶部
      this.commentList.unshift(data.new_obj);
    },
  },
};
</script>

<style scoped lang="less">
.comment-reply {
  .scroll-wrap {
    position: fixed;
    top: 250px;
    bottom: 88px;
    left: 0;
    right: 0;
    overflow: auto;
  }
  .post-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 88px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .post-btn {
      width: 60%;
      border-top: 1px solid #e8e8e8;
    }
  }
}
</style>

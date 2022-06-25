<template>
  <van-list
    class="comment-list"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <comment-item
      v-for="(item, index) in locallist"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click', $event)"
    />
  </van-list>
</template>

<script>
import { getComments } from "@/api/comment";
import commentItem from "./comment-item";
export default {
  components: { commentItem },
  name: "CommentList",

  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      // 自定义 prop 数据验证
      validator(value) {
        return ["a", "c"].includes(value);
      },
      default: "a",
    },
  },
  data() {
    return {
      locallist: this.list,
      loading: false,
      finished: false,
      offset: null, // 获取下一页时间戳
      limit: 10,
    };
  },
  methods: {
    async onLoad() {
      try {
        // 1.请求数据
        const { data } = await getComments({
          type: this.type,
          source: this.source,
          offset: this.offset,
          limit: this.limit,
        });
        console.log(data);
        // 2.把请求数据结构放到 list 数组中
        const { results } = data.data;
        this.locallist.push(...results);
        // 3.本次数据加载结束之后，把加载状态设置为结束
        //    loading 关闭后才能触发下一次加载更多
        this.loading = false;
        // 4.判断数据是否全部加载完成
        if (results.length) {
          this.offset = data.data.last_id;
        } else {
          this.finished = true;
        }
      } catch (err) {
        console.log("请求失败", err);
        this.$toast("请求失败，请稍后再试！");
      }
    },
  },
};
</script>

<style></style>

<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="loading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/article-item";

export default {
  name: "ArticleList",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null, // 请求获取下一页的时间戳
      error: false, // 控制列表加载失败的提示状态
      isreFreshLoading: false, // 控制下拉刷新的状态
      refreshSuccessText: "", // 下拉刷新成功，展示刷新数据条数
    };
  },
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // 初始化或滚动到底部的时候会触发调用 onLoad
    async onLoad() {
      try {
        // 1.请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          // 简单理解就是请求数据的页码，请求第1页数据：当前最新时间戳
          // 用于请求之后数据的时间戳 会在当前请求结果中返回给你
          timestamp: this.timestamp || Date.now(),
          with_top: 1, // 是否包含置顶文章
        });
        // 2.把请求结果数据放到 list 数组中
        const { results } = data.data;
        // 数组元素的展开操作符，把数组元素一个一个拿出来
        console.log(results);
        this.list.push(...results);
        // 3.本次数据加载结束之后要把加载状态设置为结束
        //      loading 关闭以后才能触发下一次的加载更多
        this.loading = false;
        // 4.判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp;
        } else {
          // 没有数据了，将 finished 设置为 true， 不再 load 加载更多了
          this.finished = true;
        }
      } catch (err) {
        console.log("请求失败", err);
        this.error = true;
        this.loading = false;
      }
    },

    // 当下拉刷新的时候会触发调用该函数
    async onRefresh() {
      // 请求获取数据
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now,
          with_top: 1,
        });
        this.loading = false;

        // 将数据追加到列表的顶部
        const { results } = data.data;
        this.list.unshift(...results);
        this.refreshSuccessText = `刷新成功，更新${results.length}条数据`;
        // 关闭下拉刷新的 loading 状态
        this.isreFreshLoading = false;
      } catch (err) {
        console.log("刷新失败");
        this.isreFreshLoading = false;
        this.refreshSuccessText = "刷新失败";
      }
    },
  },
};
</script>

<style scoped lang="less">
// 让文章产生自己的滚动容器，这样可以记住列表的滚动位置
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>

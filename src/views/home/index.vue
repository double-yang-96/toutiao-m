<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        plain
        round
        size="small"
        icon="search"
        type="info"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 频道列表 -->
    <!-- 通过 v-model 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <!-- 文章列表 -->
        <article-list :channel="channel" />
        <!-- 文章列表 -->
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /频道列表 -->
  </div>
</template>

<script>
import { getUserChannels } from "@/api/User";
import ArticleList from "./components/article-list";
export default {
  name: "HomeIndex",
  components: {
    ArticleList,
  },
  data() {
    return {
      active: 0,
      channels: [], // 频道列表
    };
  },
  // 调用并加载数据
  created() {
    this.loadChannels();
  },
  methods: {
    async loadChannels() {
      try {
        const { data } = await getUserChannels();
        // console.log(data);
        this.channels = data.data.channels;
      } catch (err) {
        console.log("获取频道数据失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding-bottom: 100px;
  padding-top: 174px;
  .page-nav-bar {
    /deep/ .van-nav-bar__title {
      max-width: unset;
    }
    .search-btn {
      width: 555px;
      height: 64px;
      border: none;
      font-size: 28px;
      color: #fff;
      background-color: #5babfb;
      .van-icon {
        font-size: 32px;
      }
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      left: 0;
      right: 0;
      top: 92px;
      z-index: 1;
      height: 82px;
    }
    .van-tabs__nav--line.van-tabs__nav--complete {
      padding-left: 0;
      padding-right: 0;
    }
    .van-tab {
      font-size: 30px;
      min-width: 200px;
      border: 1px solid #edeff3;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      width: 32px;
      height: 6px;
      bottom: 8px;
      background: #3296fa;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      opacity: 0.9;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>

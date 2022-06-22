<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(text, index) in suggestions"
      :key="index"
      icon="search"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";
import { debounce } from "lodash"; // 防抖作用
export default {
  name: "SearchSuggestion",
  data() {
    return {
      suggestions: [], // 联想建议数据列表
    };
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  watch: {
    searchText: {
      // 当searchText发生改变的时候就会调用handler函数
      // debounce 防抖作用
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value);
      }, 200),
      //   handler(value) {
      //     this.loadSearchSuggestions(value);
      //   },
      immediate: true, // 该回调将会在侦听开始之后被立即调用
    },
  },
  methods: {
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSearchSuggestions(q);
        this.suggestions =
          data.data.options[0] === null ? [] : data.data.options;
      } catch (err) {
        this.$toast("数据获取失败，请稍后重试");
      }
    },
    highlight(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`;
      // 如果需要根据数据变量动态创建正则表达式，则手动 new RegExp
      // RegExp 正则表达式构造函数
      //      参数1：匹配模式字符串，它会根据这个字符串创建正则对象
      //      参数2：匹配模式，要写到字符串中
      const reg = new RegExp(this.searchText, "gi");
      return text.replace(reg, highlightStr);
    },
  },
};
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/ span.active {
    color: #3297fa;
  }
}
</style>

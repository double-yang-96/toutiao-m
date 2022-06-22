<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span
          @click="
            $emit('clear-search-histories');
            search_histories = [];
          "
          >全部删除</span
        >
        &nbsp;&nbsp;&nbsp;
        <span @click="isDeleteShow = !isDeleteShow">完成</span>
      </div>
      <van-icon
        v-else
        name="delete"
        @click="isDeleteShow = !isDeleteShow"
      ></van-icon>
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistories"
      :key="index"
      :title="item"
      @click="onSearchItemClick(item, index)"
      ><van-icon name="close" v-show="isDeleteShow"></van-icon
    ></van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  props: {
    // prop数据
    // prop 是手父组件数据影响的
    //  如果是普通数据（数字，字符串，布尔值）绝对不能修改
    //  即便改了也不会传到给父组件
    //
    //  如果是引用类型数据（数组，对象）
    //      可以修改，例如[].push(xxx),对象.xxx = xxx
    //      不能重新赋值，xxx = []
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDeleteShow: false, // 控制删除显示状态
      search_histories: this.searchHistories, // 接受props
    };
  },

  methods: {
    onSearchItemClick(item, index) {
      if (this.isDeleteShow) {
        // 删除状态，删除历史记录
        this.search_histories.splice(index, 1);
      } else {
        // 非删除状态，直接进入搜索
        this.$emit("search", item);
      }
    },
  },
};
</script>

<style scoped lang="less"></style>

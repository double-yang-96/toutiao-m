<template>
  <div class="updat-name">
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onComfirm"
    />
    <div class="field-wrap">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { editUserProfile } from "@/api/User";
export default {
  name: "UpdateName",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localName: this.value,
    };
  },
  created() {},
  methods: {
    async onComfirm() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true, // 禁止背景点击
        duration: 0, // 持续展示
      });
      try {
        const localName = this.localName;
        if (!localName.length) {
          this.$toast("昵称不能为空");
          return;
        }
        await editUserProfile({
          name: localName,
        });
        // 更新视图
        this.$emit("input", localName);
        // 关闭弹层
        this.$emit("close");
        // 提示成功
        this.$toast.success("编辑完成");
      } catch (err) {
        this.$toast("编辑失败，请稍后再试");
      }
    },
  },
};
</script>

<style scoped lang="less">
.field-wrap {
  padding: 20px;
}
</style>

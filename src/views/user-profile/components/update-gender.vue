<template>
  <div class="update-gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onPickerChange"
      :default-index="value"
    />
  </div>
</template>

<script>
import { editUserProfile } from "@/api/User";
export default {
  name: "UpdateGender",

  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
      localgender: 0,
    };
  },
  methods: {
    onPickerChange(picker, value, index) {
      this.localgender = index;
    },
    async onConfirm() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const localGender = this.localgender;
        await editUserProfile({
          gender: localGender,
        });
        // 更新视图
        this.$emit("input", localGender);
        // 关闭弹层
        this.$emit("close");
        // 提示成功
        this.$toast.success("编辑完成");
      } catch (err) {
        this.$toast("修改失败，请稍后再试");
      }
    },
  },
};
</script>

<style scoped lang="less">
/deep/.van-picker__cancel,
/deep/.van-picker__confirm {
  color: #3296fa;
}
</style>

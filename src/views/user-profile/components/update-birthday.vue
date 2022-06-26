<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="localBirthday"
      type="date"
      title="选择生日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { editUserProfile } from "@/api/User";
import dayjs from "dayjs";
export default {
  name: "UpdateBirthday",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      localBirthday: new Date(this.value),
    };
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const localBirthday = dayjs(this.localBirthday).format("YYYY-MM-DD");
        await editUserProfile({
          birthday: localBirthday,
        });
        // 更新视图
        this.$emit("input", localBirthday);
        // 关闭弹窗
        this.$emit("close");
        // 提示成功
        this.$toast.success("编辑成功");
      } catch (err) {
        this.$toast("编辑失败，请稍后再试");
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

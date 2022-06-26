<template>
  <div class="update-photo">
    <img :src="img" alt="" ref="img" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { updateUserPhoto } from "@/api/User";
export default {
  name: "UpdatePhoto",
  props: {
    img: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    return {
      cropper: null,
    };
  },
  mounted() {
    const image = this.$refs.img;
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true,
    });
  },
  methods: {
    onConfirm() {
      // 基于服务端的裁切使用 getData 方法获取裁切参数
      //   console.log(this.cropper.getData());

      // 纯客户端的裁切使用 getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        this.updateUserPhoto(blob);
      });
    },
    async updateUserPhoto(blob) {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const formData = new FormData();

        formData.append("photo", blob);
        // console.log(formData);
        const { data } = await updateUserPhoto(formData);
        // console.log(data);
        this.$toast.success("更新成功");
        // 关闭弹出层
        this.$emit("close");
        // 更新视图
        this.$emit("updata-photo", data.data.photo);
      } catch (err) {
        this.$toast.faile("更新失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.update-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
img {
  display: block;
  max-width: 100%;
}
/deep/.cropper-wrap-box {
  width: 100%;
}
</style>

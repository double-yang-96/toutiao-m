<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        round
        type="danger"
        plain
        size="mini"
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in my_channels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          v-show="isEdit && !fiexdChannels.includes(channel.id)"
          slot="icon"
          name="clear"
        ></van-icon>
        <span class="text" :class="{ active: index === active }" slot="text">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        icon="plus"
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel,
} from "@/api/channel";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";

export default {
  name: "ChannelEdit",
  props: {
    myChannels: {
      type: Array,
      require: true,
    },
    active: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      allChannels: [],
      my_channels: this.myChannels, // 定义一个本地的props
      isEdit: false, // 控制编辑状态的显示
      fiexdChannels: [0], // 固定频道，不允许删除
    };
  },
  created() {
    this.loadAllChannels();
  },
  computed: {
    ...mapState(["user"]),
    recommendChannels() {
      // 数组的 filter 方法：遍历数组，把符合条件的元素存储到新数组
      return this.allChannels.filter((channel) => {
        // 数组的 find 方法：遍历数组，把符合条件的第1个元素返回
        return !this.myChannels.find((myChannel) => {
          return myChannel.id === channel.id;
        });
      });
    },

    // recommendChannels() {
    //   const channels = [];
    //   this.allChannels.forEach((channel) => {
    //     // find 遍历数组，找到满足条件的元素项
    //     const ret = this.myChannels.find((myChannel) => {
    //       return myChannel.id === channel.id;
    //     });
    //     // 如果我的频道中不包括该频道项，则收集到推荐频道中
    //     if (!ret) {
    //       channels.push(channel);
    //     }
    //   });
    //   // console.log(channels);
    //   // 把计算结果返回
    //   return channels;
    // },
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels();
        console.log(data);
        this.allChannels = data.data.channels;
      } catch (err) {
        this.$toast("数据获取失败");
      }
    },
    async onAddChannel(channel) {
      this.my_channels.push(channel);
      // 持久化处理
      if (this.user) {
        try {
          // 已登录，把数据请求接口放到线上
          await addUserChannel({
            id: channel.id, // 频道id
            seq: this.my_channels.length, // 序号
          });
        } catch (err) {
          this.$toast("保存失败，请稍后再试");
        }
      } else {
        // 未登录，把数据存储到本地
        setItem("TOUTIAO_CHANNELS", this.my_channels);
      }
    },
    onMyChannelClick(channel, index) {
      // 编辑状态，则执行删除频道
      if (this.isEdit) {
        // 1. 如果是固定频道，则不删除
        if (this.fiexdChannels.includes(channel.id)) {
          // 如果是固定频道，则不删除
          return;
        }
        // 2. 删除频道项
        this.my_channels.splice(index, 1);
        if (index <= this.active) {
          // 让激活频道的索引 -1
          // 3. 如果删除的激活频道之前的频道，则更新激活的频道
          this.$emit("update-active", this.active - 1, true);
        }

        // 4. 处理持久化
        this.deleteChannel(channel);
      } else {
        // 非编辑状态，执行切换频道
        this.$emit("update-active", index, false);
      }
    },
    async deleteChannel(channel) {
      if (this.user) {
        // 已登录，则将数据更新到线上
        try {
          deleteUserChannel(channel.id);
        } catch (err) {
          this.$toast("操作失败，请稍后重试");
        }
      } else {
        // 未登录，将数据更新到本地
        setItem("TOUTIAO_CHANNELS", this.my_channels);
      }
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;

    .van-grid-item__content {
      background-color: #f4f5f6;

      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
        white-space: nowrap;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        z-index: 2;
        color: #cacaca;
      }
      .text {
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        white-space: nowrap;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>

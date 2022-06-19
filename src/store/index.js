import Vue from "vue";
import Vuex from "vuex";
import { setItem, getItem } from "@/utils/storage";

Vue.use(Vuex);

const TOKEN_KEY = "TOUTIAO_USER";

export default new Vuex.Store({
  state: {
    // 一个对象，存储当前登录用户的信息 （token等数据）
    // user: window.localStorage.getItem(TOKEN_KEY),
    user: getItem(TOKEN_KEY),
  },
  getters: {},
  mutations: {
    setUser(state, data) {
      state.user = data;
      // 为了放置刷新丢失，我们需要把数据备份到本地存储
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user));
      setItem(TOKEN_KEY, state.user);
    },
  },
  actions: {},
  modules: {},
});

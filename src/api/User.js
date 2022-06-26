// 用户相关请求模块
import request from "@/utils/request";
// import store from "@/store";
// 导出一个方法
export const login = (data) => {
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
};

/* 发送验证码，注意：每个手机号每分钟一次 */
export const sendSms = (mobile) => {
  return request({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`,
  });
};

/* 获取用户自己的信息 */
export const getUserInfo = () => {
  return request({
    method: "GET",
    url: `/v1_0/user`,
    // 发送请求头数据
    // headers: {
    //   // 注意：该接口需要授权才能访问
    //   //        token数据格式 ： Bearer toen数据
    //   Authorization: `Bearer ${store.state.user.token}`,
    // },
  });
};

/* 获取用户频道列表 */
export const getUserChannels = () => {
  return request({
    url: "/v1_0/user/channels",
    method: "GET",
  });
};

/* 关注用户 */
export const addFollow = (target) => {
  return request({
    url: "/v1_0/user/followings",
    method: "POST",
    data: {
      target,
    },
  });
};

/* 取消关注 */
export const deleteFollow = (target) => {
  return request({
    method: "DELETE",
    url: `/v1_0/user/followings/${{ target }}`,
  });
};

/* 收藏文章 */
export const addCollection = (target) => {
  return request({
    method: "POST",
    url: "/v1_0/article/collections",
    data: {
      target,
    },
  });
};
/* 取消收藏 */
export const deleteCollection = (target) => {
  return request({
    method: "DELETE",
    url: `/v1_0/article/collections/${{ target }}`,
  });
};

/* 点赞文章 */
export const addLikeArticle = (target) => {
  return request({
    method: "POST",
    url: "/v1_0/article/likings",
    data: {
      target,
    },
  });
};
/* 取消点赞 */
export const deleteLikeArticle = (target) => {
  return request({
    method: "DELETE",
    url: `/v1_0/article/likings/${target}`,
  });
};

/* 获取用户个人资料 */
export const getUserProfile = () => {
  return request({
    method: "GET",
    url: "/v1_0/user/profile",
  });
};

/* 编辑用户个人资料 */
export const editUserProfile = (data) => {
  return request({
    method: "PATCH",
    url: "/v1_0/user/profile",
    data,
  });
};

/* 编辑用户照片资料 */
export const updateUserPhoto = (data) => {
  return request({
    method: "PATCH",
    url: "/v1_0/user/photo",
    data,
  });
};

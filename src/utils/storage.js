/* 封装本地存储操作模块 */
/* 存储数据 */
export const setItem = (key, value) => {
  if (typeof value === "object") {
    // 将数组、对象类型的数据转换为 JSON 形式字符串进行存储
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
};

/* 获取数据 */
export const getItem = (key) => {
  const data = window.localStorage.getItem(key);
  // 判断字符串是否为 JSON 字符串很难处理，所以不用if 而是 try catch
  try {
    // 如果data是有效JSON字符串，则成功运行，若不是JSON字符串，则报错，进入catch
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};

/* 删除数据 */
export const removeItem = (key) => {
  window.localStorage.removeItem(key);
};

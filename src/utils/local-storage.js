// localstroage 封装

// 设置localStorage
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
}

// 获取localStorage
export const getItem = (key) => {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (error) {
    return value; 
  }
}

// 删除localStorage
export const removeItem = (key) => {
  localStorage.removeItem(key);
}

// 清空localStorage
export const clearStorage = () => {
  localStorage.clear();
}
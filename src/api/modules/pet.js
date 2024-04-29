import { get, put } from "..";

export const getAllPetInfoApi = () => get("/info");

// 获取当前用户可以查看的3D模型信息
export const get3DModelInfoApi = () => get("/3d/info");

// 获取用户功能配置信息
export const getUserFunctionConfigApi = () => get("/user/config");

// 获取宠物健康信息
export const getPetHealthInfoApi = (pid) => get(`/info/health/${pid}`);

// 更新宠物健康信息
export const updatePetHealthInfoApi = (pid, data) =>
  put(`/info/health/${pid}`, data);

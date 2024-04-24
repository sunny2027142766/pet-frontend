import { get } from "..";

export const getAllPetInfoApi = () => get("/info");

// 获取当前用户可以查看的3D模型信息
export const get3DModelInfoApi = () => get("/3d/info");
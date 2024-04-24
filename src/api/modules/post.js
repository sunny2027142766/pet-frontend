import { post } from '..';

export const addPost = (postParams) => post(`/post`, postParams);
// 上传图片
export const uploadImg = (file) => post(`/upload`, file);
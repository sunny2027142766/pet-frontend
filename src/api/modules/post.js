import { get, post } from "..";

export const addPost = (postParams) => post(`/post`, postParams);

// 获取帖子列表
export const getPostList = (params) => get(`/post`, params);

// 获取帖子详细信息
export const getPostDetail = (id) => get(`/post/${id}`);

// 获取帖子的评论列表
export const getPostCommentList = (id) => get(`/post/${id}/comment`);

/**
 * @description 点赞帖子
 * @param {*} params { pid: 帖子id , uid: 用户id , status : 点赞状态 }
 * @returns
 */
export const likePost = (params) => get(`/post/like`, params);

/**
 * @description 分享帖子
 * @param {*} params { pid: 帖子id , uid: 用户id }
 * @returns
 */
export const sharePost = (params) => get(`/post/share`, params);

/**
 * 评论帖子
 * @param {*} params { pid: 帖子id , uid: 用户id , content: 评论内容 }
 * @returns
 */
export const commentPost = (params) => post(`/post/comment`, params);

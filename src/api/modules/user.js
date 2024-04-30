import { del, get, put, post } from "..";

export const getUserInfoApi = () => get("/user/info");

export const getAllUserListApi = (userPageQuery) =>
  get(`/user/page`, userPageQuery);

export const addUserApi = (user) => post(`/user`, user);

export const updateUserApi = (userId, user) => put(`/user/${userId}`, user);

/**
 *
 * @param {*} ids  用户ID，多个以英文逗号(,)分割
 * @returns
 */
export const deleteUserApi = (ids) => del(`/user/${ids}`);

export const getUserProfileApi = () => get(`/user/profile`);

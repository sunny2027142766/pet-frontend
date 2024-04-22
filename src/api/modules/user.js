import { get } from "..";

export const getUserInfoApi = () => get("/user/info");

export const getAllUserListApi = (userPageQuery) =>
  get(`/user/page`, userPageQuery);

import { get } from "..";

export const getUserInfoApi = () => get("/user");

export const getAllUserListApi = (userPageQuery) => get(`/user/page`, userPageQuery);

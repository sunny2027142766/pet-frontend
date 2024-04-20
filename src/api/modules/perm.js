import { get } from "..";

export const getAllPermListApi = (permPageQuery) => get(`/permission/page`, permPageQuery);

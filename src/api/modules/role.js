import { get } from "..";

export const getAllRoleListApi = (rolePageQuery) => get(`/role/page`, rolePageQuery);

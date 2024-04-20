import { get } from "..";

export const getAllRoles = () => (get('/role'));

export const getAllRoleListApi = (rolePageQuery) => get(`/role/page`, rolePageQuery);

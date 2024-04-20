import { getItem } from "./local-storage"

export const getToken = () => (getItem('accessToken'))
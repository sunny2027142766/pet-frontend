import { getItem } from "src/utils/local-storage";

export function useAuth() {
  const accessToken = getItem("accessToken");
  return !!accessToken; // 如果有 access token 则返回 true，否则返回 false
}

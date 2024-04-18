import { baseUrl } from "src/config";

const loginApi = (data) => ({
  url: `${baseUrl}/auth/login`,
  method: "post",
  data,
});

const sendCodeApi = (email) => ({
  url: `${baseUrl}/auth/sendCode/${email}`,
  method: "get",
});

const registerApi = (data) => ({
  url: `${baseUrl}/auth/register`,
  method: "post",
  data,
});

export default {
  loginApi,
  sendCodeApi,
  registerApi,
};

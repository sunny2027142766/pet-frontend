import { get, post } from "..";

export const loginApi = (user) => post('/auth/login', user)

export const sendCodeApi = (email) => get(`/auth/sendCode/${email}`)

export const registerApi = (registerData) => post('/auth/register', registerData)
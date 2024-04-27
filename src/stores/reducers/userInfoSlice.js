// reducers/userInfoSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 初始的 userInfo 状态
  userInfo: null,
  navConfig:[]
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      console.log(action.payload);
      state.userInfo = action.payload;
    },
    removeUserInfo: (state) => {
      state.userInfo = null;
    },
    setNavConfig: (state, action) => {
      state.navConfig = action.payload;
    }
  },
});

export const { setUserInfo, removeUserInfo,setNavConfig } = userInfoSlice.actions;

export default userInfoSlice.reducer;

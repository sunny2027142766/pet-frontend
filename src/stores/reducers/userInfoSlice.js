// reducers/userInfoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // 初始的 userInfo 状态
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUserInfo: (state) => {
      state.userInfo = null;
    }
  }
});

export const { setUserInfo, removeUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;

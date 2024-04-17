import { createSlice } from '@reduxjs/toolkit';

export const menuIni = [
  {
    id: 'index',
    name: '首页',
    path: '/',
    icon: 'SettingOutlined',
    cmpPath: 'pages/index',
  }
];

const initialState = {
  // 初始的 menuList 状态
  menuList: menuIni,
};

const menuListSlice = createSlice({
  name: 'menuList',
  initialState,
  reducers: {
    setMenusList:(state, action)=>{
      state.menuList = action.payload;
    }
  }
});

export const { setMenusList } = menuListSlice.actions;

export default menuListSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer from './reducers/userInfoSlice';
import menuListReducer from './reducers/menuListSlice';
import fullScreenLoadingReducer from './reducers/fullScreenLoadingSlice';

const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    menuList: menuListReducer,
    fullScreenLoading: fullScreenLoadingReducer
  }
});

export default store;

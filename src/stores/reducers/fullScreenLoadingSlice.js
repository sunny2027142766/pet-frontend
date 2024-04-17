import { createSlice } from '@reduxjs/toolkit';
import { getItem } from 'src/utils/local-storage';

const refreshToken = getItem('refreshToken');

const initialState = {
  fullScreenLoading: !!refreshToken
};

const fullScreenLoadingSlice = createSlice({
  name: 'fullScreenLoading',
  initialState,
  reducers: {
    systemLoading(state, action) {
      state.fullScreenLoading = action.payload;
    }
  }
});

export const { systemLoading } = fullScreenLoadingSlice.actions;

export default fullScreenLoadingSlice.reducer;

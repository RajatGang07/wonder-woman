import { createSlice } from '@reduxjs/toolkit';

const selectedKeyInitialState = {
    selectedKeys: "",
    selectedDataSource: "",
    selectedFacebookUser: {}
};

const selectedKeySlice = createSlice({
  name: 'selectedKeys',
  initialState: selectedKeyInitialState,
  reducers: {
    setSelectedKeysInfo: (state, action) => {
      state.selectedKeys = action.payload;
    },
    setSelectedDataSource: (state, action) => {
      state.selectedDataSource = action.payload;
    },
    setSelectedFacebookUser: (state, action) => {
      state.selectedFacebookUser = action.payload;
    },
  },
});

export const { setSelectedKeysInfo }: any = selectedKeySlice.actions;
export const { setSelectedDataSource }: any = selectedKeySlice.actions;
export const { setSelectedFacebookUser }: any = selectedKeySlice.actions;


export const selectedKeyInfo = (state: any) => state.selectedKeys;
export const selectedDataSource = (state: any) => state.selectedDataSource;
export const selectedFacebookUser = (state: any) => state.selectedFacebookUser;


export default selectedKeySlice.reducer;

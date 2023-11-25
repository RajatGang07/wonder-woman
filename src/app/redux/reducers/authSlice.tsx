// authSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { registerUser } from '../actions/authActions'

const initialState = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
}

const authSlice: any = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    // register user
    [registerUser.pending]: (state: any)  => {
      state.loading = true
      state.error = null
    },
    [registerUser.fulfilled]: (state: any, { payload }: any) => {
      state.loading = false
      state.success = true // registration successful
    },
    [registerUser.rejected]: (state: any, { payload }: any) => {
      state.loading = false
      state.error = payload
    },
  },
})
export default authSlice.reducer
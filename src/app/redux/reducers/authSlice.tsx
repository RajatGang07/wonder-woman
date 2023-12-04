// slices/authSlice.js
import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};
const backendURL = "https://thunder-bird.azurewebsites.net";

export const loginAsync: any = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response: any = await axios.post(
        `${backendURL}/api/v1/login`,
        credentials,
        config
      );
      if (!response.status) {
        throw new Error("Login failed");
      }

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: any) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload.data;
      })
      .addCase(loginAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export const selectUser = (state: any) => state.auth.user;
export const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated;


export default authSlice.reducer;

// slices/authSlice.js
import axios from "axios";
import { toast } from "react-toastify";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DOMAIN_URL } from "../../services";

const initialState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

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
        `${DOMAIN_URL.prod}/api/v1/login`,
        credentials,
        config
      );
      if (!response.status) {
        throw new Error("Login failed");
      }
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
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
        state.user = action.payload.data.data;
        toast.success(action.payload.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .addCase(loginAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action?.payload?.response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  },
});

export const { logout } = authSlice.actions;
export const selectUser = (state: any) => state.auth.user;
export const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated;

export default authSlice.reducer;

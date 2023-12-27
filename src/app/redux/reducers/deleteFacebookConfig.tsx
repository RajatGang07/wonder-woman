// slices/saveFacebookSlice.js
import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  // user: null,
  // isAuthenticated: false,
  status: "idle",
  error: null,
};
const backendURL = "http://localhost:8080";

export const deleteFacebookConfigAsync: any = createAsyncThunk(
  "faebook/config",
  async (credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response: any = await axios.post(
        `${backendURL}/api/v1/facebook/config/delete`,
        credentials,
        config
      );
      if (!response.status) {
        throw new Error("config save failed");
      }

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const deletefaebookConfigSlice = createSlice({
  name: "deleteFacebookConfig",
  initialState,
  reducers: {
    logout: (state: any) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteFacebookConfigAsync.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(deleteFacebookConfigAsync.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        // state.isAuthenticated = true;
        // state.user = action.payload.data;
      })
      .addCase(deleteFacebookConfigAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
        // state.error = action.payload;
      });
  },
});

export const { logout } = deletefaebookConfigSlice.actions;

export default deletefaebookConfigSlice.reducer;

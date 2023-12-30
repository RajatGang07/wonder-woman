// slices/saveFacebookSlice.js
import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DOMAIN_URL } from "../../services";

const initialState = {
  status: "idle",
  error: null,
};

export const facebookConfigAsync: any = createAsyncThunk(
  "faebook/config",
  async (credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response: any = await axios.post(
        `${DOMAIN_URL.prod}/api/v1/facebook/config`,
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

const faebookConfigSlice = createSlice({
  name: "faebookConfig",
  initialState,
  reducers: {
    logout: (state: any) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(facebookConfigAsync.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(facebookConfigAsync.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
      })
      .addCase(facebookConfigAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
      });
  },
});

export const { logout } = faebookConfigSlice.actions;

export default faebookConfigSlice.reducer;

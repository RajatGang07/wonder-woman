// slices/saveFacebookSlice.js
import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  configData: null,
  // isAuthenticated: false,
  status: "idle",
  error: null,
};
const backendURL = "http://localhost:8080";

export const fetchFacebookConfigAsync: any = createAsyncThunk(
  "faebook/config",
  async (credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response: any = await axios.post(
        `${backendURL}/api/v1/get/facebook/config`,
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

const fetchfacebookConfigSlice = createSlice({
  name: "FetchfaebookConfig",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFacebookConfigAsync.pending, (state: any) => {
        state.status = "loading";
        state.configData = [];
      })
      .addCase(fetchFacebookConfigAsync.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        // state.isAuthenticated = true;
        state.configData = action.payload.data.facebookConfig;
      })
      .addCase(fetchFacebookConfigAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
        // state.error = action.payload;
        state.configData = [];
      });
  },
});

export default fetchfacebookConfigSlice.reducer;

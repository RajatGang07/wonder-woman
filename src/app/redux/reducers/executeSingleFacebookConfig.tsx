// slices/saveFacebookSlice.js
import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DOMAIN_URL } from "../../services";

const initialState = {
  status: "idle",
  loading: false,
  error: null,
};

export const executeSingleFacebookConfigAsync: any = createAsyncThunk(
  "facebook/execute",
  async (credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response: any = await axios.post(
        `${DOMAIN_URL.prod}/api/v1/generate/csv/single/config`,
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

const executeSingleFacebookConfigSlice = createSlice({
  name: "SingleFetchfaebookConfig",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(executeSingleFacebookConfigAsync.pending, (state: any) => {
        state.status = "loading";
        state.loading = true
      })
      .addCase(executeSingleFacebookConfigAsync.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        state.loading = false
      })
      .addCase(executeSingleFacebookConfigAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.loading = false
      });
  },
});

export default executeSingleFacebookConfigSlice.reducer;

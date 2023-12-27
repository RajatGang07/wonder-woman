// slices/facebookCred.js
import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: any = {
  status: "idle",
  error: null,
  facebookList: []
};
const backendURL = "http://localhost:8080";

export const facebookDisconnectDetailsAsync: any = createAsyncThunk(
  "facebook/get",
  async (credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response: any = await axios.post(
        `${backendURL}/api/v1/facebook/disconnect/auth`,
        credentials,
        config
      );
      if (!response.status) {
        throw new Error("Get facebook user list failed");
      }

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const facebookDeleteSlice = createSlice({
  name: "facebookDelete",
  initialState,
  reducers: {
    logout: (state: any) => {
      state.name = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(facebookDisconnectDetailsAsync.pending, (state: any) => {
        state.status = "loading";
        state.facebookList = [];
      })
      .addCase(facebookDisconnectDetailsAsync.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
      })
      .addCase(facebookDisconnectDetailsAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});


export default facebookDeleteSlice.reducer;

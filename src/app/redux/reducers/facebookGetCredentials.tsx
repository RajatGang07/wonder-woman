// slices/facebookCred.js
import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: any = {
  status: "idle",
  error: null,
  facebookList: []
};
const backendURL = "http://localhost:8080";

export const facebookGetDetailsAsync: any = createAsyncThunk(
  "facebook/get",
  async (credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response: any = await axios.post(
        `${backendURL}/api/v1/facebook/auth`,
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

const facebookGetUserListSlice = createSlice({
  name: "facebookGet",
  initialState,
  reducers: {
    logout: (state: any) => {
      state.name = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(facebookGetDetailsAsync.pending, (state: any) => {
        state.status = "loading";
        state.facebookList = [];
      })
      .addCase(facebookGetDetailsAsync.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        state.facebookList = action.payload.data.existingFacebookUserList;
      })
      .addCase(facebookGetDetailsAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.payload;
        state.facebookList = [];
      });
  },
});


export default facebookGetUserListSlice.reducer;

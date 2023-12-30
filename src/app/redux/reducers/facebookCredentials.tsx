// slices/facebookCred.js
import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DOMAIN_URL } from "../../services";

const initialState: any = {
  status: "idle",
  error: null,
};

export const facebookAsync: any = createAsyncThunk(
  "facebook/cred",
  async (credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response: any = await axios.post(
        `${DOMAIN_URL.prod}/api/save/fb`,
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

const facebookCredSlice = createSlice({
  name: "facebookCred",
  initialState,
  reducers: {
    logout: (state: any) => {
      state.name = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(facebookAsync.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(facebookAsync.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
      })
      .addCase(facebookAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = facebookCredSlice.actions;
export const selectname = (state: any) => state.auth.name;
export const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated;


export default facebookCredSlice.reducer;

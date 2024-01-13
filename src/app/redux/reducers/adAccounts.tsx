// slices/adAccountSlice.js
import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DOMAIN_URL } from "../../services";

const initialState = {
  adAccounts: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

export const adAccountAsync: any = createAsyncThunk(
  "adAccount/",
  async (credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response: any = await axios.post(
        `${DOMAIN_URL.prod}/api/integrations/facebook_ads/ad_accounts`,
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

const adAccountSlice = createSlice({
  name: "adAccount",
  initialState,
  reducers: {
    logout: (state: any) => {
      state.adAccounts = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adAccountAsync.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(adAccountAsync.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.adAccounts = action?.payload?.data?.data?.data;
      })
      .addCase(adAccountAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = adAccountSlice.actions;
export const selectadAccounts = (state: any) => state?.adAccount?.adAccounts;
export const selectIsAuthenticated = (state: any) => state?.adAccount?.isAuthenticated;


export default adAccountSlice.reducer;

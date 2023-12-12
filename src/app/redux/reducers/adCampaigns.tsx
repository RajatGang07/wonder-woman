// slices/adAccountSlice.js
import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  adCampaignAccounts: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};
const backendURL = "http://localhost:8080";

export const adCampaignAccountAsync: any = createAsyncThunk(
  "adCampaignAccount/",
  async (credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response: any = await axios.post(
        `${backendURL}/api/integrations/facebook_ads/ad_accounts/campaigns`,
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

const adCampaignAccountSlice = createSlice({
  name: "adCampaignAccount",
  initialState,
  reducers: {
    logout: (state: any) => {
      state.adCampaignAccounts = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adCampaignAccountAsync.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(adCampaignAccountAsync.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.adCampaignAccounts = action.payload.data.response.data;
      })
      .addCase(adCampaignAccountAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = adCampaignAccountSlice.actions;
export const selectadAccounts = (state: any) => state.adCampaignAccount.adCampaignAccounts;
export const selectIsAuthenticated = (state: any) => state.adCampaignAccount.isAuthenticated;


export default adCampaignAccountSlice.reducer;

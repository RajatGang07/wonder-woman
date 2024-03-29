// slices/adAccountSlice.js
import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DOMAIN_URL } from "../../services";

const initialState = {
  adCampaignAccounts: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

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
        `${DOMAIN_URL.prod}/api/integrations/facebook_ads/ad_accounts/campaigns`,
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
        let containsValue = true;
        action?.payload?.data && action?.payload?.data?.data?.data.map((item: any) => {
          if(state.adCampaignAccounts.length > 0){
            state.adCampaignAccounts.map((adCampaignAccount: any) => {
              if(item.id === adCampaignAccount.id) {
                containsValue = false
              }
          })
          }
        
          if(containsValue){
            state.adCampaignAccounts.push(item);
          }
        })
        console.log('action?.payload?.data ', action?.payload?.data?.data?.data, action?.payload?.data && action?.payload?.data?.data && action?.payload?.data?.data?.data.length > 0  )
        state.adCampaignAccounts = action?.payload?.data && action?.payload?.data?.data && action?.payload?.data?.data?.data.length > 0 ? state.adCampaignAccounts: [];
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

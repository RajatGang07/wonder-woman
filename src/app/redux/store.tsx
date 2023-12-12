"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import facebookCredentials from "./reducers/facebookCredentials";
import adAccountReducer from './reducers/adAccounts';
import adCampaignReducer from './reducers/adCampaigns';

const rootReducer = combineReducers({
  auth: authReducer,
  facebookCred: facebookCredentials,
  adAccountReducer: adAccountReducer,
  adCampaignReducer: adCampaignReducer
  
  //add all your reducers here
});

export const store = configureStore({
  reducer: rootReducer,
});

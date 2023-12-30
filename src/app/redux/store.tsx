"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import facebookCredentials from "./reducers/facebookCredentials";
import adAccountReducer from './reducers/adAccounts';
import adCampaignReducer from './reducers/adCampaigns';
import generateCSV from './reducers/generateCSV';
import storeFacebookInfo from './reducers/storeFacebookInfo';
import facebookGetUserListSlice from './reducers/facebookGetCredentials';
import fetchfacebookConfigSlice from './reducers/fetchFacebookConfig';
import executeSingleFacebookConfigSlice from './reducers/executeSingleFacebookConfig';
import signUpSlice from './reducers/signUpSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  facebookCred: facebookCredentials,
  adAccountReducer: adAccountReducer,
  adCampaignReducer: adCampaignReducer,
  generateCSVReducer: generateCSV,
  storeFacebookInfoReducer: storeFacebookInfo,
  facebookGetUserListReducer: facebookGetUserListSlice,
  fetchfacebookConfigReducer: fetchfacebookConfigSlice,
  executeSingleFacebookConfigSliceReducer: executeSingleFacebookConfigSlice,
  signUpReducer: signUpSlice
});

export const store = configureStore({
  reducer: rootReducer,
});

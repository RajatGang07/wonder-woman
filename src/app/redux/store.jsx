"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

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

const persistConfig = {
  key: 'root',
  storage,
}

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

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),

})

export const persistor = persistStore(store)


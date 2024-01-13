// slices/saveFacebookSlice.js
import axios from "axios";
import { toast } from "react-toastify";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DOMAIN_URL } from "../../services";

const initialState = {
  configData: null,
  status: "idle",
  error: null,
};

export const fetchFacebookConfigAsync: any = createAsyncThunk(
  "facebook/config",
  async (credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response: any = await axios.post(
        `${DOMAIN_URL.prod}/api/v1/get/facebook/config`,
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

const fetchfacebookConfigSlice = createSlice({
  name: "FetchfaebookConfig",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFacebookConfigAsync.pending, (state: any) => {
        state.status = "loading";
        state.configData = [];
      })
      .addCase(fetchFacebookConfigAsync.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        state.configData = action.payload.data.data;
        toast.success(action.payload.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .addCase(fetchFacebookConfigAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.configData = [];
        toast.error(action?.payload?.response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  },
});

export default fetchfacebookConfigSlice.reducer;

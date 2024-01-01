import axios from "axios";
import { toast } from "react-toastify";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DOMAIN_URL } from "../../services";

const initialState = {
  status: "idle",
  loading: false,
  error: null,
};

export const executeSingleFacebookConfigAsync: any = createAsyncThunk(
  "facebook/execute",
  async (credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response: any = await axios.post(
        `${DOMAIN_URL.prod}/api/v1/generate/csv/single/config`,
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

const executeSingleFacebookConfigSlice = createSlice({
  name: "SingleFetchfaebookConfig",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(executeSingleFacebookConfigAsync.pending, (state: any) => {
        state.status = "loading";
        state.loading = true
      })
      .addCase(executeSingleFacebookConfigAsync.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        state.loading = false;
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
      .addCase(executeSingleFacebookConfigAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.loading = false
        toast.error(action.payload.response.data.message, {
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

export default executeSingleFacebookConfigSlice.reducer;

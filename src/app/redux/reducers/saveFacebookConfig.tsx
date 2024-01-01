// slices/saveFacebookSlice.js
import axios from "axios";
import { toast } from "react-toastify";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DOMAIN_URL } from "../../services";

const initialState = {
  status: "idle",
  error: null,
};

export const facebookConfigAsync: any = createAsyncThunk(
  "faebook/config",
  async (credentials: any, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let response: any = {};
      if (!credentials?.id) {
        response = await axios.post(
          `${DOMAIN_URL.prod}/api/v1/facebook/config`,
          credentials,
          config
        );
      } else {
        response = await axios.post(
          `${DOMAIN_URL.prod}/api/v1/put/facebook/update`,
          credentials,
          config
        );
      }
      if (!response.status) {
        throw new Error("config save failed");
      }

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const faebookConfigSlice = createSlice({
  name: "faebookConfig",
  initialState,
  reducers: {
    logout: (state: any) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(facebookConfigAsync.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(facebookConfigAsync.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
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
      .addCase(facebookConfigAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
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

export const { logout } = faebookConfigSlice.actions;

export default faebookConfigSlice.reducer;

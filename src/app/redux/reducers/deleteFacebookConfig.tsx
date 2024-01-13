// slices/saveFacebookSlice.js
import axios from "axios";
import { toast } from "react-toastify";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DOMAIN_URL } from "../../services";

const initialState = {
  // user: null,
  // isAuthenticated: false,
  status: "idle",
  error: null,
};

export const deleteFacebookConfigAsync: any = createAsyncThunk(
  "faebook/config",
  async (credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response: any = await axios.post(
        `${DOMAIN_URL.prod}/api/v1/facebook/config/delete`,
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

const deletefaebookConfigSlice = createSlice({
  name: "deleteFacebookConfig",
  initialState,
  reducers: {
    logout: (state: any) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteFacebookConfigAsync.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(deleteFacebookConfigAsync.fulfilled, (state: any, action: any) => {
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
      .addCase(deleteFacebookConfigAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
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

export const { logout } = deletefaebookConfigSlice.actions;

export default deletefaebookConfigSlice.reducer;

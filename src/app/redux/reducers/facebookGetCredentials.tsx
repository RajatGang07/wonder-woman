// slices/facebookCred.js
import axios from "axios";
import { toast } from "react-toastify";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DOMAIN_URL } from "../../services";

const initialState: any = {
  status: "idle",
  error: null,
  facebookList: []
};

export const facebookGetDetailsAsync: any = createAsyncThunk(
  "facebook/get",
  async (credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response: any = await axios.post(
        `${DOMAIN_URL.prod}/api/v1/facebook/auth`,
        credentials,
        config
      );
      if (!response.status) {
        throw new Error("Get facebook user list failed");
      }

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const facebookGetUserListSlice = createSlice({
  name: "facebookGet",
  initialState,
  reducers: {
    logout: (state: any) => {
      state.name = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(facebookGetDetailsAsync.pending, (state: any) => {
        state.status = "loading";
        state.facebookList = [];
      })
      .addCase(facebookGetDetailsAsync.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        state.facebookList = action.payload.data.data;
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
      .addCase(facebookGetDetailsAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.payload;
        state.facebookList = [];
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


export default facebookGetUserListSlice.reducer;

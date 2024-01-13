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

export const facebookDisconnectDetailsAsync: any = createAsyncThunk(
  "facebook/get",
  async (credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response: any = await axios.post(
        `${DOMAIN_URL.prod}/api/v1/facebook/disconnect/auth`,
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

const facebookDeleteSlice = createSlice({
  name: "facebookDelete",
  initialState,
  reducers: {
    logout: (state: any) => {
      state.name = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(facebookDisconnectDetailsAsync.pending, (state: any) => {
        state.status = "loading";
        state.facebookList = [];
      })
      .addCase(facebookDisconnectDetailsAsync.fulfilled, (state: any, action: any) => {
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
      .addCase(facebookDisconnectDetailsAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.payload;
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


export default facebookDeleteSlice.reducer;

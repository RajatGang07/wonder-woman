// slices/facebookCred.js
import axios from "axios";
import { toast } from "react-toastify";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DOMAIN_URL } from "../../services";

const initialState: any = {
  status: "idle",
  error: null,
  csvList: []
};

export const generateCSVAsync: any = createAsyncThunk(
  "generate/Csv",
  async (credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response: any = await axios.post(
        `${DOMAIN_URL.prod}/api/v1/generate/csv`,
        credentials,
        config
      );
      if (!response.status) {
        throw new Error("CSV generation failed");
      }

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const generateCSVSlice = createSlice({
  name: "generateCsv",
  initialState,
  reducers: {
    logout: (state: any) => {
      state.name = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateCSVAsync.pending, (state: any) => {
        state.status = "loading";
        state.csvList = [];
      })
      .addCase(generateCSVAsync.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        state.csvList = action.payload.data;
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
      .addCase(generateCSVAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.payload;
        state.csvList = [];
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

export const { logout } = generateCSVSlice.actions;
export const selectname = (state: any) => state.auth.name;
export const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated;


export default generateCSVSlice.reducer;

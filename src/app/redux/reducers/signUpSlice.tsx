// slices/signUp.js
import axios from "axios";
import { toast } from "react-toastify";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DOMAIN_URL } from "../../services";

const initialState = {
  status: "idle",
  error: null,
};

export const signupAsync: any = createAsyncThunk(
  "auth/singup",
  async (credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response: any = await axios.post(
        `${DOMAIN_URL.prod}/api/v1/signup`,
        credentials,
        config
      );
      if (!response.status) {
        throw new Error("Signup failed");
      }
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const signUpSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(signupAsync.fulfilled, (state: any, action: any) => {
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
      .addCase(signupAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.payload;
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

export default signUpSlice.reducer;

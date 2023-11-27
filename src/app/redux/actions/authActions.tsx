import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = 'https://thunder-bird.azurewebsites.net'

// const backendURL = 'http://localhost:8080'

export const registerUser: any = createAsyncThunk(
  'auth/register',
  async ({ firstName, email, password }: any, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      await axios.post(
        `${backendURL}/api/v1/login`,
        {  email, password },
        config
      )
    } catch (error: any) {
    // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
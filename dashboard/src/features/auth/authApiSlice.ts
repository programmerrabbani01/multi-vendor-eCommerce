import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//  admin login

export const adminLogin = createAsyncThunk(
  "auth/loginUser",
  async (data: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/auth/adminLogin",
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: unknown) {
      // specify the error type as unknown
      if (axios.isAxiosError(error)) {
        // check if it's an AxiosError
        throw new Error(
          error.response?.data?.message || "Something went wrong"
        );
      }
      throw new Error("An unexpected error occurred");
    }
  }
);

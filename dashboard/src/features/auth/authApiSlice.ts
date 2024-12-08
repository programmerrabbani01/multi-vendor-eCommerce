import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setLogOut } from "./authSlice.ts";

//  admin & seller login

export const adminLogin = createAsyncThunk(
  "auth/loginUser",
  async (data: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/auth/adminSellerLogin",
        data,
        {
          withCredentials: true,
        }
      );
      console.log("Login successful, user:", response.data.user);
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

//  loggedIn  user

export const loggedInUser = createAsyncThunk("auth/loggedInUser", async () => {
  try {
    const response = await axios.get("http://localhost:5050/api/v1/auth/me", {
      withCredentials: true,
    });

    return response.data;
  } catch (error: unknown) {
    // specify the error type as unknown
    if (axios.isAxiosError(error)) {
      // check if it's an AxiosError
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
    throw new Error("An unexpected error occurred");
  }
});

// user logOut

export const logOutUser = createAsyncThunk(
  "auth/logOutUser",
  async (_, { dispatch }) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/auth/logOut",
        "",
        {
          withCredentials: true,
        }
      );

      // Dispatch additional reducers (e.g., clearing other states if needed)
      dispatch(setLogOut());
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

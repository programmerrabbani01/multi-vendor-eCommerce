import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { adminLogin } from "./authApiSlice.ts";
import { RootState } from "../../app/store.ts";

// Define the type for the user object
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Define the state structure for the `auth` slice
interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  message: string | null;
}

// Initial state
const initialState: AuthState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
  isLoading: false,
  error: null,
  message: null,
};

// create auth slice

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // admin login
    builder
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "An error occurred.";
      })
      .addCase(
        adminLogin.fulfilled,
        (state, action: PayloadAction<{ user: User; message: string }>) => {
          state.isLoading = false;
          state.message = action.payload.message;
          state.user = action.payload.user;
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      );
  },
});

// Export a typed selector
export const getAuthData = (state: RootState): AuthState => state.auth;

// export actions

export const { setMessageEmpty } = authSlice.actions;

// export auth slice

export default authSlice.reducer;

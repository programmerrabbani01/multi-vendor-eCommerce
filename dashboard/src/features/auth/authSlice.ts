import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { adminLogin, loggedInUser, logOutUser } from "./authApiSlice.ts";
import { RootState } from "../../app/store.ts";
import { User } from "../../types.ts";

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
    setLogOut: (state) => {
      state.message = null;
      state.error = null;
      state.user = null;
      localStorage.removeItem("user"); // Ensure local storage is cleared
    },
  },
  extraReducers: (builder) => {
    builder
      // admin login
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
          state.user = action.payload.user;
          state.message = action.payload.message;
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      )
      // loggedIn User
      .addCase(loggedInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loggedInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "An error occurred.";
      })
      .addCase(loggedInUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      // user logOut
      .addCase(logOutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "An error occurred.";
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = null;
        localStorage.removeItem("user");
      });
  },
});

// Export a typed selector
export const getAuthData = (state: RootState): AuthState => state.auth;

// export actions

export const { setMessageEmpty, setLogOut } = authSlice.actions;

// export auth slice

export default authSlice.reducer;

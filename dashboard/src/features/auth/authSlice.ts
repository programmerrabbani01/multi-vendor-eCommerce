import { createSlice } from "@reduxjs/toolkit";

// create auth slice

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: () => {},
});

// export auth slice

export default authSlice.reducer;

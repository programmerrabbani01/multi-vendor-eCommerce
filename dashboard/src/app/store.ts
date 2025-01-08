// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.ts";
import categoryReducer from "../features/category/categorySlice.ts";

// create store
const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

// Export the types
export type RootState = ReturnType<typeof store.getState>; // RootState is the type of the entire Redux store state
export type AppDispatch = typeof store.dispatch; // AppDispatch is the type of the dispatch function

// export store
export default store;

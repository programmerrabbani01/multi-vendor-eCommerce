// store.ts
import { configureStore } from "@reduxjs/toolkit";

// create store
const store = configureStore({
  reducer: {
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

// Export the types
export type RootState = ReturnType<typeof store.getState>; // RootState is the type of the entire Redux store state
export type AppDispatch = typeof store.dispatch; // AppDispatch is the type of the dispatch function

// export store
export default store;

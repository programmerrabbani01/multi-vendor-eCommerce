import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  createSize,
  deleteSize,
  getAllSize,
  updateSize,
} from "./sizeApiSlice.ts";

// Define the category type
interface Size {
  _id: string;
  name: string;
  [key: string]: string | number | boolean | undefined;
}

// Define the initial state type
interface SizeState {
  sizes: Size[] | null;
  error: string | null;
  message: string | null;
  loader: boolean;
}

// Initial state
const initialState: SizeState = {
  sizes: [],
  error: null,
  message: null,
  loader: false,
};

// Create the slice
const sizeSlice = createSlice({
  name: "size",
  initialState,
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllSizes
      .addCase(getAllSize.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllSize.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
        state.loader = false;
      })
      .addCase(
        getAllSize.fulfilled,
        (state, action: PayloadAction<{ sizes: Size[] }>) => {
          state.sizes = action.payload.sizes;
          state.loader = false;
        }
      )

      // createSize
      .addCase(createSize.pending, (state) => {
        state.loader = true;
      })
      .addCase(createSize.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
        state.loader = false;
      })
      .addCase(
        createSize.fulfilled,
        (state, action: PayloadAction<{ sizes: Size; message: string }>) => {
          state.sizes = state.sizes ?? [];
          // Push the new sizes into the array
          state.sizes.push(action.payload.sizes);
          state.message = action.payload.message;
          state.loader = false;
        }
      )

      // deleteSize
      .addCase(deleteSize.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteSize.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
        state.loader = false;
      })
      .addCase(deleteSize.fulfilled, (state, action) => {
        if (state.sizes) {
          state.sizes = state.sizes.filter(
            (data) => data._id !== action.payload.id // Use `id` instead of `category._id`
          );
        }
        state.message = action.payload.message;
        state.loader = false;
      })

      // updateSize
      .addCase(updateSize.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateSize.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
        state.loader = false;
      })

      .addCase(updateSize.fulfilled, (state, action) => {
        if (state.sizes && Array.isArray(state.sizes)) {
          const updatedSize = action.payload.sizes; // Ensure this matches the API response

          if (!updatedSize || !updatedSize._id) {
            console.error(
              "Updated sizes is missing or malformed:",
              updatedSize
            );
            return;
          }

          const index = state.sizes.findIndex(
            (data) => data._id === updatedSize._id
          );

          if (index !== -1) {
            // Update the sizes if found
            state.sizes[index] = updatedSize;
          }
        }
        state.message = action.payload.message; // Display success message if needed
        state.loader = false;
      });
  },
});

// Export selectors
export const getSizeData = (state: RootState) => state.size;

// Export actions
export const { setMessageEmpty } = sizeSlice.actions;

// Export reducer
export default sizeSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  createColor,
  deleteColor,
  getAllColors,
  updateColor,
} from "./colorApiSlice.ts";

// Define the category type
interface Color {
  _id: string;
  name: string;
  [key: string]: string | number | boolean | undefined;
}

// Define the initial state type
interface ColorState {
  colors: Color[] | null;
  error: string | null;
  message: string | null;
  loader: boolean;
}

// Initial state
const initialState: ColorState = {
  colors: [],
  error: null,
  message: null,
  loader: false,
};

// Create the slice
const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllColors
      .addCase(getAllColors.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllColors.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
        state.loader = false;
      })
      .addCase(
        getAllColors.fulfilled,
        (state, action: PayloadAction<{ colors: Color[] }>) => {
          state.colors = action.payload.colors;
          state.loader = false;
        }
      )

      // createColor
      .addCase(createColor.pending, (state) => {
        state.loader = true;
      })
      .addCase(createColor.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
        state.loader = false;
      })
      .addCase(
        createColor.fulfilled,
        (state, action: PayloadAction<{ color: Color; message: string }>) => {
          state.colors = state.colors ?? [];
          // Push the new colors into the array
          state.colors.push(action.payload.color);
          state.message = action.payload.message;
          state.loader = false;
        }
      )

      // deleteColor
      .addCase(deleteColor.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
        state.loader = false;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        if (state.colors) {
          state.colors = state.colors.filter(
            (data) => data._id !== action.payload.id // Use `id` instead of `category._id`
          );
        }
        state.message = action.payload.message;
        state.loader = false;
      })

      // updateColor
      .addCase(updateColor.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
        state.loader = false;
      })

      .addCase(updateColor.fulfilled, (state, action) => {
        if (state.colors && Array.isArray(state.colors)) {
          const updatedColor = action.payload.colors; // Ensure this matches the API response

          if (!updatedColor || !updatedColor._id) {
            console.error(
              "Updated colors is missing or malformed:",
              updatedColor
            );
            return;
          }

          const index = state.colors.findIndex(
            (data) => data._id === updatedColor._id
          );

          if (index !== -1) {
            // Update the colors if found
            state.colors[index] = updatedColor;
          }
        }
        state.message = action.payload.message; // Display success message if needed
        state.loader = false;
      });
  },
});

// Export selectors
export const getColorData = (state: RootState) => state.color;

// Export actions
export const { setMessageEmpty } = colorSlice.actions;

// Export reducer
export default colorSlice.reducer;

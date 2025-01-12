import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  updateBrand,
} from "./brandApiSlice.ts";

// Define the brand type
interface Brand {
  _id: string;
  name: string;
  [key: string]: string | number | boolean | undefined;
}

// Define the initial state type
interface BrandState {
  brand: Brand[] | null;
  error: string | null;
  message: string | null;
  loader: boolean;
}

// Initial state
const initialState: BrandState = {
  brand: [],
  error: null,
  message: null,
  loader: false,
};

// Create the slice
const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllBrands
      .addCase(getAllBrands.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
        state.loader = false;
      })
      .addCase(
        getAllBrands.fulfilled,
        (state, action: PayloadAction<{ brands: Brand[] }>) => {
          state.brand = action.payload.brands;
          state.loader = false;
        }
      )

      // create brand
      .addCase(createBrand.pending, (state) => {
        state.loader = true;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
        state.loader = false;
      })
      .addCase(
        createBrand.fulfilled,
        (state, action: PayloadAction<{ brand: Brand; message: string }>) => {
          state.brand = state.brand ?? [];
          // Push the new brand into the array
          state.brand.push(action.payload.brand);
          state.message = action.payload.message;
          state.loader = false;
        }
      )

      // delete brand
      .addCase(deleteBrand.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
        state.loader = false;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        if (state.brand) {
          state.brand = state.brand.filter(
            (data) => data._id !== action.payload.id // Use `id` instead of `brand._id`
          );
        }
        state.message = action.payload.message;
        state.loader = false;
      })

      // update brand
      .addCase(updateBrand.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
        state.loader = false;
      })

      .addCase(updateBrand.fulfilled, (state, action) => {
        if (state.brand && Array.isArray(state.brand)) {
          const updatedBrand = action.payload.brand; // Ensure this matches the API response

          if (!updatedBrand || !updatedBrand._id) {
            console.error(
              "Updated brand is missing or malformed:",
              updatedBrand
            );
            return;
          }

          const index = state.brand.findIndex(
            (data) => data._id === updatedBrand._id
          );

          if (index !== -1) {
            // Update the category if found
            state.brand[index] = updatedBrand;
          }
        }
        state.message = action.payload.message; // Display success message if needed
        state.loader = false;
      });
  },
});

// Export selectors
export const getBrandData = (state: RootState) => state.brand;

// Export actions
export const { setMessageEmpty } = brandSlice.actions;

// Export reducer
export default brandSlice.reducer;

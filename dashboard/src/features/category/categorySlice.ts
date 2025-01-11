import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "./categoryApiSlice";

// Define the category type
interface Category {
  _id: string;
  name: string;
  [key: string]: string | number | boolean | undefined;
}

// Define the initial state type
interface CategoryState {
  category: Category[] | null;
  error: string | null;
  message: string | null;
  loader: boolean;
}

// Initial state
const initialState: CategoryState = {
  category: [],
  error: null,
  message: null,
  loader: false,
};

// Create the slice
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllCategories
      .addCase(getAllCategories.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
        state.loader = false;
      })
      .addCase(
        getAllCategories.fulfilled,
        (state, action: PayloadAction<{ categories: Category[] }>) => {
          state.category = action.payload.categories;
          state.loader = false;
        }
      )

      // createCategory
      .addCase(createCategory.pending, (state) => {
        state.loader = true;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
        state.loader = false;
      })
      .addCase(
        createCategory.fulfilled,
        (
          state,
          action: PayloadAction<{ category: Category; message: string }>
        ) => {
          state.category = state.category ?? [];
          // Push the new category into the array
          state.category.push(action.payload.category);
          state.message = action.payload.message;
          state.loader = false;
        }
      )

      // deleteCategory
      .addCase(deleteCategory.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
        state.loader = false;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        if (state.category) {
          state.category = state.category.filter(
            (data) => data._id !== action.payload.id // Use `id` instead of `category._id`
          );
        }
        state.message = action.payload.message;
        state.loader = false;
      })

      // updateCategory
      .addCase(updateCategory.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
        state.loader = false;
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        if (state.category && Array.isArray(state.category)) {
          const updatedCategory = action.payload.category; // Ensure this matches the API response

          if (!updatedCategory || !updatedCategory._id) {
            console.error(
              "Updated category is missing or malformed:",
              updatedCategory
            );
            return;
          }

          const index = state.category.findIndex(
            (data) => data._id === updatedCategory._id
          );

          if (index !== -1) {
            // Update the category if found
            state.category[index] = updatedCategory;
          }
        }
        state.message = action.payload.message; // Display success message if needed
        state.loader = false;
      });
  },
});

// Export selectors
export const getCategoryData = (state: RootState) => state.category;

// Export actions
export const { setMessageEmpty } = categorySlice.actions;

// Export reducer
export default categorySlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { deleteProduct, getAllProducts } from "./productApiSlice.ts";

interface Category {
  name: string;
}

interface Brand {
  name: string;
}

// Define the product type
interface Product {
  _id: string;
  title: string;
  photos?: { url: string }[];
  category?: Category[]; // Define as an optional array of Category objects
  brand?: Brand[]; // Define as an optional array of Brand objects
  price: number; // Define price as a number
  discount?: string; // Define discount as an optional string
  stock: number; // Define stock as a number
  [key: string]: unknown; // Allow additional unknown properties if necessary
}

// Define the initial state type
interface ProductState {
  products: Product[] | null;
  error: string | null;
  message: string | null;
  loader: boolean;
}

// Initial state
const initialState: ProductState = {
  products: [],
  error: null,
  message: null,
  loader: false,
};

// Create the slice
const productSlice = createSlice({
  name: "product",
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
      .addCase(getAllProducts.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
        state.loader = false;
      })
      .addCase(
        getAllProducts.fulfilled,
        (state, action: PayloadAction<{ products: Product[] }>) => {
          state.products = action.payload.products;
          state.loader = false;
        }
      )
      // delete brand
      .addCase(deleteProduct.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
        state.loader = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (state.products) {
          state.products = state.products.filter(
            (data) => data._id !== action.payload.id // Use `id` instead of `brand._id`
          );
        }
        state.message = action.payload.message;
        state.loader = false;
      });
  },
});

// Export selectors
export const getProductData = (state: RootState) => state.product;

// Export actions
export const { setMessageEmpty } = productSlice.actions;

// Export reducer
export default productSlice.reducer;

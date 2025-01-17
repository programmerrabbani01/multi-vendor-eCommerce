import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  createProductAPi,
  deleteProduct,
  getAllProducts,
} from "./productApiSlice.ts";
import { Color, Size } from "../../types.ts";

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
  desc: string;
  photos?: { url: string }[];
  category?: Category[];
  brand?: Brand[];
  colors?: Color[];
  Sizes?: Size[];
  price: number;
  discount?: number;
  stock: number;
  [key: string]: unknown;
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
      // get All Products
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
      // delete product
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
            (data) => data._id !== action.payload.id
          );
        }
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(createProductAPi.pending, (state) => {
        state.loader = true;
      })
      .addCase(createProductAPi.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
        state.loader = false;
      })
      .addCase(createProductAPi.fulfilled, (state, action) => {
        state.message = action.payload.message;

        // Check if `state.products` is not null and append the new product
        if (state.products) {
          state.products = [...state.products, action.payload.product];
        } else {
          // Initialize `state.products` with the new product
          state.products = [action.payload.product];
        }

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

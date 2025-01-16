import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Brand, Category, Color, Size } from "../../types.ts";

// get all products

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5050/api/v1/product", {
        withCredentials: true,
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Handle 404 specifically
        if (error.response?.status === 404) {
          // Return an empty brands array if no products are found
          return [];
        }
        // Handle other errors
        return rejectWithValue(
          error.response?.data?.message || "Something went wrong"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

// create product

interface Product {
  _id: string;
  title: string;
  desc: string;
  photos?: { url: string }[];
  category?: Category[];
  brand?: Brand[];
  colors?: Color[];
  sizes?: Size[];
  discount?: number;
  stock: number;
  [key: string]: unknown;
}

interface CreateProductError {
  message: string;
}
export const createProductAPi = createAsyncThunk<
  { product: Product; message: string },
  FormData,
  { rejectValue: CreateProductError }
>("product/createProduct", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/v1/product",
      data,
      {
        withCredentials: true, // Include credentials (cookies)
      }
    );

    return {
      product: response.data.newProduct, // Ensure this matches your API response
      message: response.data.message || "Product created successfully",
    };
  } catch (error) {
    // Handle Axios error
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to create product",
      });
    }
    // Handle unexpected error
    return rejectWithValue({ message: "An unexpected error occurred" });
  }
});

// delete product

export const deleteProduct = createAsyncThunk<
  { id: string; message: string; success: boolean }, // Add `id` to the resolved type
  string, // Type for the argument (id)
  { rejectValue: { message: string } } // Type for rejected value
>("product/deleteProduct", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(
      `http://localhost:5050/api/v1/product/${id}`,
      {
        withCredentials: true,
      }
    );
    return { ...response.data, id }; // Include `id` in the resolved payload
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || "Something went wrong",
      });
    }
    return rejectWithValue({ message: "An unexpected error occurred" });
  }
});

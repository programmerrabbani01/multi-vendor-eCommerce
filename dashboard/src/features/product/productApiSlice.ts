import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

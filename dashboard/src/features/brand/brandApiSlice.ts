import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UpdateBrandData } from "../../types.ts";

// get all brand

export const getAllBrands = createAsyncThunk(
  "brand/getAllBrands",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5050/api/v1/brand", {
        withCredentials: true,
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Handle 404 specifically
        if (error.response?.status === 404) {
          // Return an empty brands array if no brands are found
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

// create brand

interface Brand {
  _id: string;
  name: string;
  [key: string]: string | number | boolean | undefined;
}

// Rejection type
interface CreateBrandError {
  message: string;
}
export const createBrand = createAsyncThunk<
  { brand: Brand; message: string },
  FormData,
  { rejectValue: CreateBrandError }
>("brand/createBrand", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/v1/brand",
      data,
      { withCredentials: true }
    );

    // Ensure the response contains the complete brand data
    return {
      brand: response.data.brand, // Adjust based on your API structure
      message: "Brand created successfully",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || "Something went wrong",
      });
    }
    return rejectWithValue({ message: "An unexpected error occurred" });
  }
});

// delete brand

export const deleteBrand = createAsyncThunk<
  { id: string; message: string; success: boolean }, // Add `id` to the resolved type
  string, // Type for the argument (id)
  { rejectValue: { message: string } } // Type for rejected value
>("brand/deleteBrand", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(
      `http://localhost:5050/api/v1/brand/${id}`,
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

//  brand update

export const updateBrand = createAsyncThunk(
  "brand/updateBrand",
  async (data: UpdateBrandData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/brand/${data.DataId}`,
        data.formData,
        { withCredentials: true }
      );
      console.log("API Response:", response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Something went wrong"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UpdateCategoryData } from "../../types.ts";

// get all category

export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5050/api/v1/category",
        {
          withCredentials: true,
        }
      );
      return response.data; // Return the fetched categories
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Handle 404 specifically
        if (error.response?.status === 404) {
          // Return an empty categories array if no categories are found
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

// create category

interface Category {
  _id: string;
  name: string;
  [key: string]: string | number | boolean | undefined;
}

// Rejection type
interface CreateCategoryError {
  message: string;
}
export const createCategory = createAsyncThunk<
  { category: Category; message: string },
  FormData,
  { rejectValue: CreateCategoryError }
>("category/createCategory", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/v1/category",
      data,
      { withCredentials: true }
    );

    // Ensure the response contains the complete category data
    return {
      category: response.data.category, // Adjust based on your API structure
      message: "Category created successfully",
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

// delete category

export const deleteCategory = createAsyncThunk<
  { id: string; message: string; success: boolean }, // Add `id` to the resolved type
  string, // Type for the argument (id)
  { rejectValue: { message: string } } // Type for rejected value
>("category/deleteCategory", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(
      `http://localhost:5050/api/v1/category/${id}`,
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

//  category update

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (data: UpdateCategoryData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/category/${data.DataId}`,
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

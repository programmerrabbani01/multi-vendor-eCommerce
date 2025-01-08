import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UpdateCategoryData } from "../../types.ts";

// get all category

// export const getAllCategories = createAsyncThunk(
//   "product/getAllCategories",
//   async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5050/api/v1/category",
//         {
//           withCredentials: true,
//         }
//       );

//       return response.data;
//     } catch (error: unknown) {
//       // specify the error type as unknown
//       if (axios.isAxiosError(error)) {
//         // check if it's an AxiosError
//         throw new Error(
//           error.response?.data?.message || "Something went wrong"
//         );
//       }
//       throw new Error("An unexpected error occurred");
//     }
//   }
// );

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

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/category/${id}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error: unknown) {
      // specify the error type as unknown
      if (axios.isAxiosError(error)) {
        // check if it's an AxiosError
        throw new Error(
          error.response?.data?.message || "Something went wrong"
        );
      }
      throw new Error("An unexpected error occurred");
    }
  }
);

//  category update

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (data: UpdateCategoryData) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/category/${data.DataId}`,
        data.formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: unknown) {
      // specify the error type as unknown
      if (axios.isAxiosError(error)) {
        // check if it's an AxiosError
        throw new Error(
          error.response?.data?.message || "Something went wrong"
        );
      }
      throw new Error("An unexpected error occurred");
    }
  }
);

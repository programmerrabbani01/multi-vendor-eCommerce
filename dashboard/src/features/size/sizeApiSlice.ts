import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all size

export const getAllSizes = createAsyncThunk(
  "size/getAllSizes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5050/api/v1/size", {
        withCredentials: true,
      });

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

// create size

export const createSize = createAsyncThunk(
  "size/createSize",
  async (data: { name: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/size",
        data,
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

// update size

interface sizeValues {
  name: string; // Name of the size
}

interface UpdateSizePayload {
  id: string;
  values: sizeValues;
}

export const updateSize = createAsyncThunk(
  "size/updateSize",
  async (data: UpdateSizePayload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/size/${data.id}`,
        data.values,
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

// delete size

export const deleteSize = createAsyncThunk<
  { id: string; message: string; success: boolean }, // Add `id` to the resolved type
  string, // Type for the argument (id)
  { rejectValue: { message: string } } // Type for rejected value
>("size/deleteSize", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(
      `http://localhost:5050/api/v1/size/${id}`,
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

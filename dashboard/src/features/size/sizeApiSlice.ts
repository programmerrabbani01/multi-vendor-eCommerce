import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all size

export const getAllSize = createAsyncThunk(
  "size/getAllSize",
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
  async (data, { rejectWithValue }) => {
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

export const deleteSize = createAsyncThunk(
  "size/deleteSize",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/size/${id}`,
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

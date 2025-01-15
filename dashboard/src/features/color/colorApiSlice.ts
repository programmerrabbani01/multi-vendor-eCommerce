import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all color

export const getAllColors = createAsyncThunk(
  "color/getAllColors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5050/api/v1/color", {
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

// create color

export const createColor = createAsyncThunk(
  "color/createColor",
  async (data: { name: string; colorCode: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/color",
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

// update a color

interface ColorValues {
  name: string; // Name of the color
  colorCode: string; // Color code (e.g., a hex value or similar)
}

interface UpdateColorPayload {
  id: string;
  values: ColorValues;
}

export const updateColor = createAsyncThunk(
  "color/updateColor",
  async (data: UpdateColorPayload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/color/${data.id}`,
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

// delete a color

export const deleteColor = createAsyncThunk<
  { id: string; message: string; success: boolean }, // Add `id` to the resolved type
  string, // Type for the argument (id)
  { rejectValue: { message: string } } // Type for rejected value
>("color/deleteColor", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(
      `http://localhost:5050/api/v1/color/${id}`,
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

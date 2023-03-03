import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../models";

interface IState {
  data: Array<IProduct>;
  total: number | null;
  status: "pending" | "fulfilled" | "rejected" | null;
  error: string | null;
}

const apiUrl = process.env.REACT_APP_API_HOST;

export const fetchProducts = createAsyncThunk<
  Array<IProduct>,
  undefined,
  { rejectValue: string }
>("products/fetchPosts", async function (_, { rejectWithValue }) {
  const response = await fetch((apiUrl as string) + "products?limit=10");

  if (response.ok) {
    const data = await response.json();
    return data.products;
  } else {
    return rejectWithValue("Server error");
  }
});

const initialState: IState = {
  data: [],
  total: null,
  status: null,
  error: null,
};
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "fulfilled";
      state.error = null;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload as string;
    });
  },
});

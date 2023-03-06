import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IComment } from "../models";

interface IState {
  data: Array<IComment>;
  total: number | null;
  status: "pending" | "fulfilled" | "rejected" | null;
  error: string | null;
}

interface IFetchResponse {
  comments: Array<IComment>;
  total: number;
  limit: number;
  skip: number;
}

const apiUrl = process.env.REACT_APP_API_HOST;

export const fetchComments = createAsyncThunk<
  IFetchResponse,
  number,
  { rejectValue: string }
>("comments/fetchComments", async function (productId, { rejectWithValue }) {
  const response = await fetch(
    (apiUrl as string) + `comments/post/${productId}`
  );

  if (response.ok) {
    return await response.json();
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

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      const { comments, total } = action.payload;
      state.data = comments;
      state.total = total;
      state.status = "fulfilled";
      state.error = null;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload as string;
    });
  },
});

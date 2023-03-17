import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IState {
	data: Array<String>;
	status: 'pending' | 'fulfilled' | 'rejected' | null;
	error: string | null;
}

const apiUrl = process.env.REACT_APP_API_HOST;

export const fetchCategories = createAsyncThunk<
	Array<String>,
	undefined,
	{ rejectValue: string }
>('categories/fetchCategories', async function (_, { rejectWithValue }) {
	const response = await fetch((apiUrl as string) + 'products/categories');

	if (response.ok) {
		return await response.json();
	} else {
		return rejectWithValue('Server error');
	}
});

const initialState: IState = {
	data: [],
	status: null,
	error: null,
};

export const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCategories.pending, (state) => {
			state.status = 'pending';
			state.error = null;
		});
		builder.addCase(fetchCategories.fulfilled, (state, action) => {
			state.data = action.payload;
			state.status = 'fulfilled';
			state.error = null;
		});
		builder.addCase(fetchCategories.rejected, (state, action) => {
			state.status = 'rejected';
			state.error = action.payload as string;
		});
	},
});

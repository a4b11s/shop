import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IProduct } from '../models';

interface IState {
	data: Array<IProduct>;
	total: number;
	limit: number;
	status: 'pending' | 'fulfilled' | 'rejected' | null;
	error: string | null;
}

interface IFetchResponse {
	products: Array<IProduct>;
	total: number;
	limit: number;
	skip: number;
}

interface IFetchPayload {
	limit: number;
	skip: number;
	category?: string;
}

const apiUrl = process.env.REACT_APP_API_HOST;

export const fetchProducts = createAsyncThunk<
	IFetchResponse,
	IFetchPayload,
	{ rejectValue: string }
>('products/fetchPosts', async function (params, { rejectWithValue }) {
	const response = await fetch(
		(apiUrl as string) +
			`products${params.category ? '/category/' + params.category : ''}?limit=${
				params.limit
			}&skip=${params.skip}`
	);

	if (response.ok) {
		return await response.json();
	} else {
		return rejectWithValue('Server error');
	}
});

export const fetchSingleProducts = createAsyncThunk<
	IProduct,
	number,
	{ rejectValue: string }
>('product/fetchSingleProducts', async function (id, { rejectWithValue }) {
	const response = await fetch((apiUrl as string) + `products/${id}`);

	if (response.ok) {
		return await response.json();
	} else {
		return rejectWithValue('Server error');
	}
});

const initialState: IState = {
	data: [],
	total: 0,
	limit: 12,
	status: null,
	error: null,
};

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state) => {
			state.status = 'pending';
			state.error = null;
		});
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			const { products, total } = action.payload;
			state.data = products;
			state.total = total;
			state.status = 'fulfilled';
			state.error = null;
		});
		builder.addCase(fetchProducts.rejected, (state, action) => {
			state.status = 'rejected';
			state.error = action.payload as string;
		});
		builder.addCase(fetchSingleProducts.pending, (state) => {
			state.status = 'pending';
			state.error = null;
		});
		builder.addCase(fetchSingleProducts.fulfilled, (state, action) => {
			state.data = state.data.concat(action.payload);
			state.status = 'fulfilled';
			state.error = null;
		});
		builder.addCase(fetchSingleProducts.rejected, (state, action) => {
			state.status = 'rejected';
			state.error = action.payload as string;
		});
	},
});

import { createSlice } from '@reduxjs/toolkit';

import { IProduct } from '../models';
import { fetchProducts, fetchSingleProducts } from '../services/api';

interface IState {
	data: Array<IProduct>;
	total: number;
	limit: number;
	status: 'pending' | 'fulfilled' | 'rejected' | null;
	error: string | null;
}

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

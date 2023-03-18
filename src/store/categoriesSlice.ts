import { createSlice } from '@reduxjs/toolkit';

import { fetchCategories } from '../services/api';

interface IState {
	data: Array<String>;
	status: 'pending' | 'fulfilled' | 'rejected' | null;
	error: string | null;
}

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

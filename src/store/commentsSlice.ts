import { createSlice } from '@reduxjs/toolkit';

import { IComment } from '../models';
import { fetchComments } from '../services/api';

interface IState {
	data: Array<IComment>;
	total: number | null;
	status: 'pending' | 'fulfilled' | 'rejected' | null;
	error: string | null;
}

const initialState: IState = {
	data: [],
	total: null,
	status: null,
	error: null,
};

export const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchComments.pending, (state) => {
			state.status = 'pending';
			state.error = null;
		});
		builder.addCase(fetchComments.fulfilled, (state, action) => {
			const { comments, total } = action.payload;
			state.data = comments;
			state.total = total;
			state.status = 'fulfilled';
			state.error = null;
		});
		builder.addCase(fetchComments.rejected, (state, action) => {
			state.status = 'rejected';
			state.error = action.payload as string;
		});
	},
});

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { IComment, IProduct } from '../models';

interface ICommentsFetchResponse {
	comments: Array<IComment>;
	total: number;
	limit: number;
	skip: number;
}

interface IProductFetchResponse {
	products: Array<IProduct>;
	total: number;
	limit: number;
	skip: number;
}

interface IProductFetchPayload {
	limit: number;
	skip: number;
	category?: string;
}

export const apiInstance = axios.create({
	baseURL: process.env.REACT_APP_API_HOST,
});

const fetch = async (
	url: string,
	rejectWithValue: Function,
	config: {} = {}
) => {
	return await apiInstance
		.get(url, config)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return rejectWithValue(error.code);
		});
};

export const fetchCategories = createAsyncThunk<
	Array<String>,
	undefined,
	{ rejectValue: string }
>('categories/fetchCategories', async function (_, { rejectWithValue }) {
	return fetch('products/categories', rejectWithValue);
});

export const fetchComments = createAsyncThunk<
	ICommentsFetchResponse,
	number,
	{ rejectValue: string }
>('comments/fetchComments', async function (productId, { rejectWithValue }) {
	return fetch(`comments/post/${productId}`, rejectWithValue);
});

export const fetchProducts = createAsyncThunk<
	IProductFetchResponse,
	IProductFetchPayload,
	{ rejectValue: string }
>('products/fetchPosts', async function (params, { rejectWithValue }) {
	if (typeof params.category !== 'undefined')
		return fetch(`products/category/${params.category}`, rejectWithValue, {
			params: {
				limit: params.limit,
				skip: params.skip,
			},
		});

	return fetch('products', rejectWithValue, {
		params: {
			limit: params.limit,
			skip: params.skip,
		},
	});
});

export const fetchSingleProducts = createAsyncThunk<
	IProduct,
	number,
	{ rejectValue: string }
>('product/fetchSingleProducts', async function (id, { rejectWithValue }) {
	return fetch(`products/${id}`, rejectWithValue);
});

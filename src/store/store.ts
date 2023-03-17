import { useDispatch } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { productsSlice } from './productsSlice';
import { commentsSlice } from './commentsSlice';
import { customerSlice } from './customerSlice';
import { categoriesSlice } from './categoriesSlice';

const rootReducer = combineReducers({
	products: productsSlice.reducer,
	comments: commentsSlice.reducer,
	categories: categoriesSlice.reducer,
	customer: customerSlice.reducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;

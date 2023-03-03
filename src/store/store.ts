import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./productsSlice";
import { useDispatch } from "react-redux";
import { commentsSlice } from "./commentsSlice";

const rootReducer = combineReducers({
  products: productsSlice.reducer,
  comments: commentsSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;

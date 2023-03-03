import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../models";

interface ICart {
  product: IProduct;
  count: number;
}
interface IState {
  cart: Array<ICart>;
  favorite: Array<IProduct>;
}

const initialState: IState = {
  cart: [],
  favorite: [],
};
export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newProduct = action.payload;
      const newProductInCartIndex = state.cart.findIndex(
        (product) => product.product.id === newProduct.id
      );
      if (newProductInCartIndex === -1) {
        state.cart.push({ product: newProduct, count: 1 });
      } else {
        state.cart[newProductInCartIndex].count += 1;
      }
    },
    delFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (products) => products.product.id !== action.payload
      );
    },
    addToFavorite: (state, action) => {
      const newProduct = action.payload;
      const newProductInFavoriteIndex = state.favorite.findIndex(
        (product) => product.id === newProduct.id
      );
      if (newProductInFavoriteIndex !== -1) {
        state.cart.push(newProduct);
      }
    },
    delFromFavorite: (state, action) => {
      state.favorite = state.favorite.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

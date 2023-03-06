import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../models";

interface ICart {
  product: IProduct;
  count: number;
}

interface IState {
  cart: Array<ICart>;
}

const initialState: IState = {
  cart: [],
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
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
    delFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(
        (products) => products.product.id !== action.payload
      );
    },
    changeCountInCart: (
      state,
      action: PayloadAction<{ productId: number; newCount: number }>
    ) => {
      const { productId, newCount } = action.payload;
      if (newCount > 0) {
        const productIndex = state.cart.findIndex(
          (products) => products.product.id === productId
        );
        if (newCount <= state.cart[productIndex].product.stock) {
          state.cart[productIndex].count = newCount;
        }
      }
    },
  },
});

export const { addToCart, delFromCart, changeCountInCart } =
  customerSlice.actions;

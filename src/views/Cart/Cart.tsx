import React from "react";
import { useSelector } from "react-redux";
import { IRootState, useAppDispatch } from "../../store/store";
import { changeCountInCart, delFromCart } from "../../store/customerSlice";

import ProductListItem from "../../components/ProductListItem/ProductListItem";
import Price from "../../components/Price/Price";

import classes from "./Cart.module.css";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cart = useSelector((state: IRootState) => state.customer.cart);
  let cartPrice = 0;
  cart.forEach((value) => (cartPrice += value.product.price * value.count));

  const handleChangeCountInCart = (productId: number, newCount: number) => {
    dispatch(changeCountInCart({ newCount, productId }));
  };

  const handleDelFromCart = (productId: number) => {
    dispatch(delFromCart(productId));
  };

  return (
    <div>
      {cart.map(({ product, count }) => (
        <ProductListItem
          key={product.title + product.id}
          changeCountInCart={handleChangeCountInCart}
          countInCart={count}
          product={product}
          delFromCart={handleDelFromCart}
        />
      ))}

      <div className={classes.totalPrice}>
        <span>Total price:</span>
        <Price price={cartPrice} discountPercentage={0} currency="$" />
      </div>
    </div>
  );
};

export default Cart;

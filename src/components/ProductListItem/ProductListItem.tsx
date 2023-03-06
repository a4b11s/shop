import React from "react";

import { IProduct } from "../../models";

import Price from "../Price/Price";
import StarRating from "../StarRating/StarRating";
import Button from "../Button/Button";

import classes from "./ProductListItem.module.css";

interface IProps {
  product: IProduct;
  countInCart?: number | undefined;
  changeCountInCart?: Function;
  delFromCart?: Function;
}
const ProductListItem = (props: IProps) => {
  const { product, countInCart, changeCountInCart, delFromCart } = props;

  const { id, title, discountPercentage, rating, thumbnail, price, stock } =
    product;

  return (
    <div className={classes.wrapper}>
      <img className={classes.thumbnail} src={thumbnail} alt="thumbnail" />
      <div className={classes.info}>
        <h1 className={classes.title}>{title}</h1>
        <Price
          currency="$"
          price={price}
          discountPercentage={discountPercentage}
        />
        <StarRating rating={rating} />
      </div>
      {changeCountInCart && countInCart ? (
        <div className={classes.countInCart}>
          <Button
            disabled={countInCart <= 1}
            onClick={() => {
              changeCountInCart(id, countInCart - 1);
            }}
          >
            -
          </Button>
          <span>{countInCart}</span>
          <Button
            disabled={countInCart >= stock}
            onClick={() => {
              changeCountInCart(id, countInCart + 1);
            }}
          >
            +
          </Button>
        </div>
      ) : (
        ""
      )}
      {delFromCart && (
        <Button
          onClick={() => {
            delFromCart(id);
          }}
        >
          X
        </Button>
      )}
    </div>
  );
};

export default ProductListItem;

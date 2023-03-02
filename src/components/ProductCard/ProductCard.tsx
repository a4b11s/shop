import React from "react";
import { IProducts } from "../../models";

import classes from "./ProductCard.module.css";

import StarRating from "../StarRating/StarRating";
import Price from "../Price/Price";

interface IProps {
  product: IProducts;
  handleClickOnCard: Function;
  handleClickOnBrand: Function;
  handleClickOnCategory: Function;
}

const ProductCard = (props: IProps) => {
  const {
    id,
    title,
    category,
    brand,
    discountPercentage,
    price,
    rating,
    thumbnail,
  } = props.product;

  return (
    <div
      onClick={() => {
        props.handleClickOnCard(id);
      }}
      className={classes.cardWrapper}
    >
      <div className={classes.cardMedia}>
        <img alt="Thumbnail" src={thumbnail} />
      </div>
      <h1 className={classes.cardTitle}>{title}</h1>
      <div className={classes.cardBody}>
        <Price
          currency="$"
          price={price}
          discountPercentage={discountPercentage}
        />
        <StarRating rating={rating} />
      </div>
      <div className={classes.cardFooter}>
        <button
          className={classes.brand}
          onClick={(e) => {
            e.stopPropagation();
            props.handleClickOnBrand(brand);
          }}
        >
          {brand}
        </button>
        <button
          className={classes.category}
          onClick={(e) => {
            e.stopPropagation();
            props.handleClickOnCategory(category);
          }}
        >
          {category}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

import React from "react";
import { IProduct } from "../../models";

import classes from "./ProductCard.module.css";

import StarRating from "../StarRating/StarRating";
import Price from "../Price/Price";
import Button from "../Button/Button";

interface IProps {
  product: IProduct;
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
        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation();
            props.handleClickOnBrand(brand);
          }}
        >
          {brand}
        </Button>
        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation();
            props.handleClickOnCategory(category);
          }}
        >
          {category}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

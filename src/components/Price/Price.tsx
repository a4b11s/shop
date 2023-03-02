import React from "react";
import classes from "./Price.module.css";

const Price = (props: {
  price: number;
  discountPercentage: number;
  currency: string;
}) => {
  const { price, discountPercentage, currency } = props;

  const isDiscount = discountPercentage > 0;
  const oldPrice = ((price / 100) * discountPercentage + price).toFixed(2);

  return (
    <div className={classes.wrapper}>
      {isDiscount && (
        <>
          <del className={classes.oldPrice}>
            {oldPrice} {currency}
          </del>
        </>
      )}
      <span className={classes.price}>
        {price} {currency}
      </span>
    </div>
  );
};

export default Price;

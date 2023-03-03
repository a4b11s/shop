import React from "react";
import classes from "./StarRating.module.css";

const StarRating = (props: { rating: number }) => {
  const { rating } = props;

  return (
    <div className={classes.wrapper}>
      {[...Array(5)].map((item, index) => {
        if (Math.floor(rating) > index) {
          return (
            <span
              key={index}
              className={classes.star + " " + classes.full}
            ></span>
          );
        } else if (rating > index && rating < index + 1) {
          return (
            <span
              key={index}
              className={classes.star + " " + classes.half}
            ></span>
          );
        } else {
          return (
            <span
              key={index}
              className={classes.star + " " + classes.empty}
            ></span>
          );
        }
      })}
    </div>
  );
};

export default StarRating;

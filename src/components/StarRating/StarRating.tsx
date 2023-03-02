import React from "react";
import style from "./StarRating.module.css";

const StarRating = (props: { rating: number }) => {
  const { rating } = props;

  return (
    <div>
      {[...Array(5)].map((item, index) => {
        if (Math.floor(rating) > index) {
          return <span className={style.star + " " + style.full}></span>;
        } else if (rating > index && rating < index + 1) {
          return <span className={style.star + " " + style.half}></span>;
        } else {
          return <span className={style.star + " " + style.empty}></span>;
        }
      })}
    </div>
  );
};

export default StarRating;

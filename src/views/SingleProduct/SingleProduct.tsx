import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IRootState, useAppDispatch } from "../../store/store";
import { useParams } from "react-router-dom";

import Price from "../../components/Price/Price";
import StarRating from "../../components/StarRating/StarRating";
import Slider from "../../components/Slider/Slider";
import Button from "../../components/Button/Button";

import classes from "./SingleProduct.module.css";
import heartIcon from "./heart.svg";
import basketIcon from "./basket.svg";
import stockIcon from "./stock.svg";
import truckIcon from "./truck.svg";
import warrantyIcon from "./warranty.svg";
import categoryIcon from "./category.svg";
import { fetchComments } from "../../store/commentsSlice";
import Comment from "../../components/Comment/Comment";
import Spinner from "../../components/Spinner/Spinner";
import Alert from "../../components/Alert/Alert";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const {
    data: productsData,
    status: productsStatus,
    error: productsError,
  } = useSelector((state: IRootState) => state.products);
  const { data: commentsData, status: commentsStatus } = useSelector(
    (state: IRootState) => state.comments
  );
  const product = productsData.filter(
    (product) => product.id === parseInt(id as string)
  );
  const filteredCommentsData = commentsData.filter((comment) => {
    return comment.postId === (id ? parseInt(id) : 0);
  });
  useEffect(() => {
    if (id) {
      dispatch(fetchComments(parseInt(id)));
    }
  }, [dispatch, id]);
  if (productsStatus === "fulfilled" && id && product.length) {
    const [
      {
        stock,
        description,
        images,
        title,
        category,
        brand,
        discountPercentage,
        price,
        rating,
      },
    ] = product;

    return (
      <>
        <section className={classes.header}>
          <h1 className={classes.title}>{title}</h1>
          <Slider images={images} slideSize={400} />
          <div className={classes.leftBar}>
            <div id={classes.action} className={classes.section}>
              <Price
                price={price}
                discountPercentage={discountPercentage}
                currency={"$"}
              />
              <StarRating rating={rating} />
              <Button onClick={() => {}}>
                <img width="36px" src={basketIcon} alt="basket" />
              </Button>
              <Button onClick={() => {}}>
                <img width="36px" src={heartIcon} alt="favorite" />
              </Button>
              <Button onClick={() => {}}>{brand}</Button>
            </div>
            <ul id={classes.info} className={classes.section}>
              <li>
                <img src={stockIcon} width="36px" alt="stock" />
                <span>In stock {stock}</span>
              </li>
              <li>
                <img src={categoryIcon} width="36px" alt="category" />
                <span>
                  In category <Button onClick={() => {}}>{category}</Button>
                </span>
              </li>
              <li>
                <img src={warrantyIcon} width="36px" alt="warranty" />
                <span>Warranty one year</span>
              </li>
              <li>
                <img width="36px" src={truckIcon} alt="delivery" />
                <span>Delivery in 3 days from the moment of the order</span>
              </li>
            </ul>
            <div className={classes.description + " " + classes.section}>
              {description}
            </div>
          </div>
        </section>
        {commentsStatus === "fulfilled" ? (
          <section className={classes.section}>
            {filteredCommentsData.map((comment) => {
              return <Comment key={comment.id} comment={comment} />;
            })}
          </section>
        ) : (
          <Spinner />
        )}
      </>
    );
  } else if (productsStatus === "pending") {
    return <Spinner />;
  } else {
    return <Alert type="error" isOpen={true} message={productsError} />;
  }
};

export default SingleProduct;

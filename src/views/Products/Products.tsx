import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IRootState } from "../../store/store";
import ProductCard from "../../components/ProductCard/ProductCard";

import classes from "./Products.module.css";
import Spinner from "../../components/Spinner/Spinner";
import Alert from "../../components/Alert/Alert";

const Products = () => {
  const navigate = useNavigate();

  const { data, status, error } = useSelector(
    (state: IRootState) => state.products
  );

  const handleClickOnCard = (id: number) => navigate(`/product/${id}`);
  const handleClickOnBrand = (brand: string) =>
    navigate(`/products?brand=${brand}`);
  const handleClickOnCategory = (category: string) =>
    navigate(`/products?category=${category}`);

  if (status === "fulfilled" && data.length) {
    return (
      <div className={classes.wrapper}>
        {data.map((item) => {
          return (
            <ProductCard
              handleClickOnCard={handleClickOnCard}
              handleClickOnBrand={handleClickOnBrand}
              handleClickOnCategory={handleClickOnCategory}
              key={item.id}
              product={item}
            />
          );
        })}
      </div>
    );
  } else if (status === "pending") {
    return <Spinner />;
  } else {
    return <Alert isOpen={true} message={error} />;
  }
};

export default Products;

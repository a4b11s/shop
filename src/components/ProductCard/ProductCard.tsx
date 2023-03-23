import React from 'react';

import { IProduct } from '../../models';
import StarRating from '../StarRating/StarRating';
import Price from '../Price/Price';
import Button from '../Button/Button';

import classes from './ProductCard.module.css';

interface IProps {
	product: IProduct;
	onClickOnCard?: (id: number) => void;
	onClickOnBrand?: (brand: string) => void;
	onClickOnCategory?: (category: string) => void;
}

const ProductCard = (props: IProps) => {
	const {
		product,
		onClickOnCategory = () => {},
		onClickOnCard = () => {},
		onClickOnBrand = () => {},
	} = props;
	const {
		id,
		title,
		category,
		brand,
		discountPercentage,
		price,
		rating,
		thumbnail,
	} = product;

	const handleClickOnCard = () => {
		onClickOnCard(id);
	};

	const handleClickOnBrand = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation();
		onClickOnBrand(brand);
	};

	const handleClickOnCategory = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation();
		onClickOnCategory(category);
	};

	return (
		<div onClick={handleClickOnCard} className={classes.cardWrapper}>
			<div className={classes.cardMedia}>
				<img alt="Thumbnail" src={thumbnail} />
			</div>
			<h1 className={classes.cardTitle}>{title}</h1>
			<div className={classes.cardBody}>
				<Price currency="$" price={price} discountPercentage={discountPercentage} />
				<StarRating rating={rating} />
			</div>
			<div className={classes.cardFooter}>
				<Button onClick={handleClickOnBrand}>{brand}</Button>
				<Button onClick={handleClickOnCategory}>{category}</Button>
			</div>
		</div>
	);
};

export default ProductCard;

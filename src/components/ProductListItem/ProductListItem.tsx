import React from 'react';

import { IProduct } from '../../models';
import Price from '../Price/Price';
import StarRating from '../StarRating/StarRating';
import Button from '../Button/Button';

import classes from './ProductListItem.module.css';

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

interface IProps {
	product: IProduct;
	countInCart?: number | undefined;
	onChangeCountInCart?: (productId: number, newCount: number) => void;
	onDelFromCart?: (id: number) => void;
}

const ProductListItem = (props: IProps) => {
	const { product, countInCart, onChangeCountInCart, onDelFromCart } = props;
	const { id, title, discountPercentage, rating, thumbnail, price, stock } =
		product;

	return (
		<div className={classes.wrapper}>
			<img className={classes.thumbnail} src={thumbnail} alt="thumbnail" />
			<div className={classes.info}>
				<h1 className={classes.title}>{title}</h1>
				<Price currency="$" price={price} discountPercentage={discountPercentage} />
				<StarRating rating={rating} />
			</div>
			{onChangeCountInCart && countInCart ? (
				<div className={classes.countInCart}>
					<Button
						disabled={countInCart <= 1}
						onClick={() => {
							onChangeCountInCart(id, countInCart - 1);
						}}
					>
						-
					</Button>
					<span>{countInCart}</span>
					<Button
						disabled={countInCart >= stock}
						onClick={() => {
							onChangeCountInCart(id, countInCart + 1);
						}}
					>
						+
					</Button>
				</div>
			) : (
				''
			)}
			{onDelFromCart && (
				<Button
					onClick={() => {
						onDelFromCart(id);
					}}
				>
					<DeleteForeverOutlinedIcon />
				</Button>
			)}
		</div>
	);
};

export default ProductListItem;

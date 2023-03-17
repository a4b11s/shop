import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import { IRootState, useAppDispatch } from '../../store/store';
import {
	changeCountInCart,
	delFromCart,
	ICart,
} from '../../store/customerSlice';
import ProductListItem from '../../components/ProductListItem/ProductListItem';
import Price from '../../components/Price/Price';

import classes from './Cart.module.css';

const sumProductPrice = (product: Array<ICart>): number => {
	let sum = 0;
	product.forEach((item) => {
		sum += item.product.price * item.count;
	});
	return sum;
};

const Cart = () => {
	const dispatch = useAppDispatch();
	const cart = useSelector((state: IRootState) => state.customer.cart);
	const [cartPrice, setCartPrice] = useState(0);

	useEffect(() => {
		setCartPrice(sumProductPrice(cart));
	}, [cart]);

	const handleChangeCountInCart = (productId: number, newCount: number) => {
		dispatch(changeCountInCart({ newCount, productId }));
	};

	const handleDelFromCart = (productId: number) => {
		dispatch(delFromCart(productId));
	};

	return (
		<div>
			{cart.map(({ product, count }) => (
				<ProductListItem
					key={product.title + product.id}
					onChangeCountInCart={handleChangeCountInCart}
					countInCart={count}
					product={product}
					onDelFromCart={handleDelFromCart}
				/>
			))}

			<div className={classes.totalPrice}>
				<span>Total price:</span>
				<Price price={cartPrice} discountPercentage={0} currency="$" />
			</div>
		</div>
	);
};

export default Cart;

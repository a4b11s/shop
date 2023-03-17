import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import SafetyCheckOutlinedIcon from '@mui/icons-material/SafetyCheckOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { fetchComments } from '../../store/commentsSlice';
import { addToCart } from '../../store/customerSlice';
import Price from '../../components/Price/Price';
import StarRating from '../../components/StarRating/StarRating';
import Slider from '../../components/Slider/Slider';
import Button from '../../components/Button/Button';
import Comment from '../../components/Comment/Comment';
import Spinner from '../../components/Spinner/Spinner';
import Alert from '../../components/Alert/Alert';
import { IRootState, useAppDispatch } from '../../store/store';
import { fetchSingleProducts } from '../../store/productsSlice';

import classes from './SingleProduct.module.css';

const SingleProduct = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	const [isShowAddToCartAlert, setIsShowAddToCartAlert] = useState(false);

	const {
		data: productsData,
		status: productsStatus,
		error: productsError,
	} = useSelector((state: IRootState) => state.products);

	const { data: commentsData, status: commentsStatus } = useSelector(
		(state: IRootState) => state.comments
	);

	const [product] = productsData.filter(
		(product) => product.id === parseInt(id as string)
	);

	useEffect(() => {
		if (id) {
			if (!product) {
				dispatch(fetchSingleProducts(parseInt(id)));
			} else {
				dispatch(fetchComments(parseInt(id)));
			}
		}
	}, [product, dispatch, id]);

	const handleAddToCart = () => {
		dispatch(addToCart(product));
		setIsShowAddToCartAlert(true);
		setTimeout(() => {
			setIsShowAddToCartAlert(false);
		}, 1500);
	};

	if (productsStatus === 'fulfilled' && id && product) {
		const {
			stock,
			description,
			images,
			title,
			category,
			brand,
			discountPercentage,
			price,
			rating,
		} = product;

		return (
			<>
				<Alert
					isOpen={isShowAddToCartAlert}
					message="Added to cart!"
					type="success"
				/>
				<section className={classes.header}>
					<h1 className={classes.title}>{title}</h1>
					<Slider images={images} slideSize={400} />
					<div className={classes.leftBar}>
						<div id={classes.action} className={classes.section}>
							<Price
								price={price}
								discountPercentage={discountPercentage}
								currency={'$'}
							/>
							<StarRating rating={rating} />
							<Button onClick={handleAddToCart}>
								<ShoppingCartOutlinedIcon />
							</Button>
							<Button onClick={() => {}}>{brand}</Button>
						</div>
						<ul id={classes.info} className={classes.section}>
							<li>
								<Inventory2OutlinedIcon />
								<span>In stock {stock}</span>
							</li>
							<li>
								<CategoryOutlinedIcon />
								<span>
									In category <Button onClick={() => {}}>{category}</Button>
								</span>
							</li>
							<li>
								<SafetyCheckOutlinedIcon />
								<span>Warranty one year</span>
							</li>
							<li>
								<LocalShippingOutlinedIcon />
								<span>Delivery in 3 days from the moment of the order</span>
							</li>
						</ul>
						<div className={classes.description + ' ' + classes.section}>
							{description}
						</div>
					</div>
				</section>
				{commentsStatus === 'fulfilled' ? (
					commentsData.length ? (
						<section className={classes.section}>
							{commentsData.map((comment) => {
								return <Comment key={comment.id} comment={comment} />;
							})}
						</section>
					) : (
						''
					)
				) : (
					<Spinner />
				)}
			</>
		);
	} else if (productsStatus === 'pending') {
		return <Spinner />;
	} else {
		return <Alert type="error" isOpen={true} message={productsError} />;
	}
};

export default SingleProduct;

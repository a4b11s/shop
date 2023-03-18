import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import { IRootState, useAppDispatch } from '../../store/store';
import { fetchProducts } from '../../store/productsSlice';
import { fetchCategories } from '../../store/categoriesSlice';
import { IProduct } from '../../models';
import ProductCard from '../../components/ProductCard/ProductCard';
import Spinner from '../../components/Spinner/Spinner';
import Alert from '../../components/Alert/Alert';
import DropDown from '../../components/DropDown/DropDown';
import Pagination from '../../components/Pagination/Pagination';

import classes from './Products.module.css';

const Products = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const brandSearch = searchParams.get('brand');
	const categorySearch = searchParams.get('category');

	const [sortBy, setSortBy] = useState<keyof IProduct>('price');
	const [page, setPage] = useState<number>(1);

	const sortParam: Array<keyof IProduct> = [
		'title',
		'price',
		'rating',
		'discountPercentage',
	];

	const { data, status, error, total, limit } = useSelector(
		(state: IRootState) => state.products
	);
	const { data: categoriesData, status: categoriesStatus } = useSelector(
		(state: IRootState) => state.categories
	);

	useEffect(() => {
		dispatch(
			fetchProducts({
				limit: limit,
				skip: (page - 1) * limit,
				category: categorySearch ? categorySearch : undefined,
			})
		);
		dispatch(fetchCategories());
	}, [dispatch, page, categorySearch, limit]);

	const handleClearSearchParams = () => setSearchParams();

	const handleClickOnCard = (id: number) => navigate(`/product/${id}`);

	const handleBrandChange = (brand: string) => setSearchParams({ brand });

	const handleCategoryChange = (category: string) => {
		setSearchParams({ category });
		setPage(1);
	};

	if (status === 'pending') return <Spinner />;

	if (status === 'rejected')
		return <Alert type="error" isOpen={true} message={error} />;

	if (
		status === 'fulfilled' &&
		data.length &&
		categoriesStatus === 'fulfilled'
	) {
		const sortedData = [...data].sort((a, b) => {
			return a[sortBy] < b[sortBy] ? -1 : 1;
		});

		return (
			<>
				<div className={classes.header}>
					<div>
						<span className={classes.label}>Category:</span>
						<DropDown
							defaultValue={categorySearch || 'all'}
							options={['all', ...(categoriesData as string[])]}
							onSelected={(value: string) => {
								if (value === 'all') {
									handleClearSearchParams();
								} else {
									handleCategoryChange(value);
								}
							}}
						/>
					</div>
					<div>
						<span className={classes.label}>Sort by:</span>
						<DropDown
							defaultValue={sortBy}
							options={sortParam}
							onSelected={(value: keyof IProduct) => {
								setSortBy(value);
							}}
						/>
					</div>
				</div>
				<div className={classes.wrapper}>
					{sortedData.map((item) => {
						if (brandSearch !== null) {
							if (item.brand !== brandSearch) {
								return null;
							}
						}

						if (categorySearch !== null) {
							if (item.category !== categorySearch) {
								return null;
							}
						}

						return (
							<ProductCard
								onClickOnCard={handleClickOnCard}
								onClickOnBrand={handleBrandChange}
								onClickOnCategory={handleCategoryChange}
								key={item.id}
								product={item}
							/>
						);
					})}
				</div>
				<Pagination
					count={Math.ceil(total / limit)}
					current={page}
					onChange={(page: number) => {
						setPage(page);
					}}
				/>
			</>
		);
	}

	return <Alert type="error" isOpen={true} message={'Error'} />;
};

export default Products;

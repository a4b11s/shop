import React, { useEffect, useMemo, useState } from 'react';

import { FormikValues, useFormik } from 'formik';
import { useSelector } from 'react-redux';

import { sendOrder } from '../../services/order';
import { getOrderValidationSchema } from '../../services/validationSchemas';
import {
	getAddressArray,
	getCityArray,
	getCountryArray,
} from '../../services/addressApi';
import { IOrderInfo } from '../../models';

import Alert from '../../components/Alert/Alert';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import { IRootState } from '../../store/store';

import { useAuth } from '../../hooks/use-auth';

import classes from './Order.module.css';

const Order = () => {
	const cart = useSelector((state: IRootState) => state.customer.cart);
	const { isAuth, uid } = useAuth();

	const [countries, setCountries] = useState<Array<string>>([]);
	const [inputtedCountry, setInputtedCountry] = useState<string>();
	const [inputtedCity, setInputtedCity] = useState<string>();

	const cities = useMemo(() => {
		if (inputtedCountry) return getCityArray(inputtedCountry);

		return [];
	}, [inputtedCountry]);

	const addresses = useMemo(() => {
		if (inputtedCity) return getAddressArray(inputtedCity);

		return [];
	}, [inputtedCity]);

	const validationSchema = useMemo(() => {
		if (countries && cities && addresses)
			return getOrderValidationSchema(countries, cities, addresses);

		return {};
	}, [countries, cities, addresses]);

	useEffect(() => {
		setCountries(getCountryArray());
	}, []);

	const initialValues = {
		name: '',
		email: '',
		deliveryCountry: '',
		deliveryCity: '',
		deliveryStreet: '',
		phone: '',
	};

	const { errors, touched, ...formik } = useFormik({
		initialValues: initialValues,
		validationSchema,
		onSubmit: handleSubmit,
	});

	function handleSubmit(value: FormikValues) {
		if (isAuth) {
			sendOrder(cart, uid as string, value as IOrderInfo);
		}
	}

	if (!cart.length)
		return <Alert isOpen message={'Cart is empty'} type={'error'} />;

	return (
		<div>
			<form className={classes.wrapper} onSubmit={formik.handleSubmit}>
				<Input
					label="Your name"
					errorMessage={touched.name && errors.name ? errors.name : undefined}
					id="name"
					name="name"
					type="text"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					value={formik.values.name}
				/>
				<Input
					label="Your email"
					errorMessage={touched.email && errors.email ? errors.email : undefined}
					id="email"
					name="email"
					type="email"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					value={formik.values.email}
				/>
				<Input
					label="Your Country"
					autocomplete={countries}
					errorMessage={
						touched.deliveryCountry && errors.deliveryCountry
							? errors.deliveryCountry
							: undefined
					}
					id="deliveryCountry"
					name="deliveryCountry"
					type="text"
					onBlur={formik.handleBlur}
					onChange={(e) => {
						setInputtedCountry(e.target.value);
						formik.handleChange(e);
					}}
					value={formik.values.deliveryCountry}
				/>
				<Input
					label="Your City"
					autocomplete={cities}
					errorMessage={
						touched.deliveryCity && errors.deliveryCity
							? errors.deliveryCity
							: undefined
					}
					id="deliveryCity"
					name="deliveryCity"
					type="text"
					onBlur={formik.handleBlur}
					onChange={(e) => {
						setInputtedCity(e.target.value);
						formik.handleChange(e);
					}}
					value={formik.values.deliveryCity}
				/>
				<Input
					label="Your address"
					autocomplete={addresses}
					errorMessage={
						touched.deliveryStreet && errors.deliveryStreet
							? errors.deliveryStreet
							: undefined
					}
					id="deliveryStreet"
					name="deliveryStreet"
					type="text"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					value={formik.values.deliveryStreet}
				/>
				<Input
					label="Your phone"
					errorMessage={touched.phone && errors.phone ? errors.phone : undefined}
					id="phone"
					name="phone"
					type="text"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					value={formik.values.phone}
				/>
				<Button type="submit">Order</Button>
			</form>
		</div>
	);
};

export default Order;

import React from 'react';

import { FormikValues, useFormik } from 'formik';
import { useSelector } from 'react-redux';

import { sendOrder } from '../../services/order';
import { orderValidationSchema } from '../../services/validationSchemas';
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
	const initialValues = {
		name: '',
		email: '',
		deliveryAddress: '',
		phone: '',
	};
	const { errors, touched, ...formik } = useFormik({
		initialValues: initialValues,
		validationSchema: orderValidationSchema,
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
					label="Your delivery address"
					errorMessage={
						touched.deliveryAddress && errors.deliveryAddress
							? errors.deliveryAddress
							: undefined
					}
					id="deliveryAddress"
					name="deliveryAddress"
					type="text"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					value={formik.values.deliveryAddress}
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

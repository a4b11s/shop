import React from 'react';

import { FormikValues, useFormik } from 'formik';

import Input from '../Input/Input';
import Button from '../Button/Button';
import { authorizationValidationSchema } from '../../services/validationSchemas';

interface IProps {
	handleFormAuthSubmit: (value: FormikValues) => void;
}

const initialValues = {
	email: '',
	password: '',
};

const AuthForm = (props: IProps) => {
	const { handleFormAuthSubmit } = props;

	const { errors, touched, ...formik } = useFormik({
		initialValues: initialValues,
		validationSchema: authorizationValidationSchema,
		onSubmit: handleFormAuthSubmit,
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Input
				type="email"
				label="Email"
				id="email"
				onBlur={formik.handleBlur}
				onChange={formik.handleChange}
				value={formik.values.email}
			/>
			<Input
				type="password"
				label="Password"
				id="password"
				onBlur={formik.handleBlur}
				onChange={formik.handleChange}
				value={formik.values.password}
			/>
			<Button style={{ width: '100%' }} type="submit">
				Login
			</Button>
		</form>
	);
};

export default AuthForm;

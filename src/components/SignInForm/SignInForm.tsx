import React from 'react';

import { FormikValues, useFormik } from 'formik';

import Input from '../Input/Input';
import Button from '../Button/Button';
import { authorizationValidationSchema } from '../../services/validationSchemas';

interface IProps {
	handleFormSignInSubmit: (value: FormikValues) => void;
}

const initialValues = {
	email: '',
	password: '',
};

const SignInForm = (props: IProps) => {
	const { handleFormSignInSubmit } = props;

	const { errors, touched, ...formik } = useFormik({
		initialValues: initialValues,
		validationSchema: authorizationValidationSchema,
		onSubmit: handleFormSignInSubmit,
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
				Sign In
			</Button>
		</form>
	);
};

export default SignInForm;

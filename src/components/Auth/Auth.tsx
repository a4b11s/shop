import React from 'react';

import { FormikValues, useFormik } from 'formik';

import Button from '../Button/Button';
import Input from '../Input/Input';
import { authorizationValidationSchema } from '../../services/validationSchemas';

import { useAppDispatch } from '../../store/store';
import { addUser } from '../../store/customerSlice';

import { useAuth } from '../../hooks/use-auth';

import classes from './Auth.module.css';

import GoogleIcon from '@mui/icons-material/Google';

interface IProps {
	onAuth?: () => void;
}

const Auth = (props: IProps) => {
	const { auth } = useAuth();
	const { onAuth = () => {} } = props;
	const dispatch = useAppDispatch();

	const initialValues = {
		email: '',
		password: '',
	};
	const { errors, touched, ...formik } = useFormik({
		initialValues: initialValues,
		validationSchema: authorizationValidationSchema,
		onSubmit: handleFormAuthSubmit,
	});

	function handleFormAuthSubmit(value: FormikValues) {
		auth(
			(user) => {
				dispatch(addUser(user));
				onAuth();
			},
			{ email: value.email as string, password: value.password as string }
		);
	}

	function handleGoogleAuthButtonClick() {
		auth((user) => {
			dispatch(addUser(user));
			onAuth();
		});
	}

	return (
		<div className={classes.wrapper}>
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
				<Button type="submit">Login</Button>
			</form>
			<div>
				<Button onClick={handleGoogleAuthButtonClick}>
					<span className={classes.authBtn}>
						<GoogleIcon /> Login with google
					</span>
				</Button>
			</div>
		</div>
	);
};

export default Auth;

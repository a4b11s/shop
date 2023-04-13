import React, { useState } from 'react';

import { FormikValues } from 'formik';

import Button from '../Button/Button';
import AuthForm from '../AuthForm/AuthForm';
import SignInForm from '../SignInForm/SignInForm';

import { useAppDispatch } from '../../store/store';
import { addUser } from '../../store/customerSlice';

import { useAuth } from '../../hooks/use-auth';

import classes from './Auth.module.css';

import GoogleIcon from '@mui/icons-material/Google';

interface IProps {
	onAuth?: () => void;
	onSignIn?: () => void;
}

const Auth = (props: IProps) => {
	const { onAuth = () => {}, onSignIn = () => {} } = props;
	const { signIn, auth } = useAuth();
	const [isSigningIn, setIsSigningIn] = useState(false);
	const dispatch = useAppDispatch();

	function handleFormAuthSubmit(value: FormikValues) {
		auth(
			(user) => {
				dispatch(addUser(user));
				onAuth();
			},
			{ email: value.email as string, password: value.password as string }
		);
	}

	function handleFormSignInSubmit(value: FormikValues) {
		signIn(
			(user) => {
				dispatch(addUser(user));
				onSignIn();
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

	function handleSignInAuthButtonClick() {
		setIsSigningIn((prevState) => !prevState);
	}

	return (
		<div className={classes.wrapper}>
			<div>
				{isSigningIn ? (
					<AuthForm handleFormAuthSubmit={handleFormAuthSubmit} />
				) : (
					<SignInForm handleFormSignInSubmit={handleFormSignInSubmit} />
				)}
				<Button onClick={handleGoogleAuthButtonClick}>
					<span className={classes.authBtn}>
						<GoogleIcon /> Login with google
					</span>
				</Button>
				<div>
					<button onClick={handleSignInAuthButtonClick}>
						{isSigningIn ? 'Login' : 'SignIn'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Auth;

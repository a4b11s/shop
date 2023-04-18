import React, { useState } from 'react';

import { FormikValues } from 'formik';

import Button from '../Button/Button';
import AuthForm from '../AuthForm/AuthForm';
import SignInForm from '../SignInForm/SignInForm';
import Modal from '../Modal/Modal';
import Alert from '../Alert/Alert';

import { useAppDispatch } from '../../store/store';
import { addUser } from '../../store/customerSlice';

import { useAuth } from '../../hooks/use-auth';

import classes from './Auth.module.css';

import GoogleIcon from '@mui/icons-material/Google';

interface IProps {
	onAuth?: () => void;
	onSignIn?: () => void;
	onModalClose?: () => void;
	isOpen?: boolean;
}

const Auth = (props: IProps) => {
	const {
		onAuth = () => {},
		onSignIn = () => {},
		onModalClose = () => {},
		isOpen = false,
	} = props;
	const { signIn, auth } = useAuth();
	const [isSigningIn, setIsSigningIn] = useState(false);
	const [error, setError] = useState('');
	const dispatch = useAppDispatch();

	function handleFormAuthSubmit(value: FormikValues) {
		setError('');
		auth(
			(user) => {
				dispatch(addUser(user));
				onAuth();
			},
			{ email: value.email as string, password: value.password as string },
			(error) => {
				setError(error);
			}
		);
	}

	function handleFormSignInSubmit(value: FormikValues) {
		setError('');
		signIn(
			(user) => {
				dispatch(addUser(user));
				onSignIn();
			},
			{ email: value.email as string, password: value.password as string },

			(error) => {
				setError(error);
			}
		);
	}

	function handleGoogleAuthButtonClick() {
		setError('');
		auth(
			(user) => {
				dispatch(addUser(user));
				onAuth();
			},
			undefined,
			(error) => {
				setError(error);
			}
		);
	}

	function handleSignInAuthButtonClick() {
		setError('');
		setIsSigningIn((prevState) => !prevState);
	}

	return (
		<>
			<Alert isOpen={!!error && isOpen} message={error} type="error" />
			<Modal
				onClose={onModalClose}
				title={isSigningIn ? 'Sign in' : 'Auth'}
				isOpen={isOpen}
			>
				<div className={classes.wrapper}>
					<div>
						{isSigningIn ? (
							<SignInForm handleFormSignInSubmit={handleFormSignInSubmit} />
						) : (
							<AuthForm handleFormAuthSubmit={handleFormAuthSubmit} />
						)}
						<Button onClick={handleGoogleAuthButtonClick}>
							<span className={classes.authBtn}>
								<GoogleIcon /> Login with google
							</span>
						</Button>
						<div>
							<button
								className={classes.switchBtn}
								onClick={handleSignInAuthButtonClick}
							>
								{isSigningIn ? 'Login' : 'Sign In'}
							</button>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default Auth;

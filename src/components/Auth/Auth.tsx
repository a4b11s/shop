import React from 'react';

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import Button from '../Button/Button';

import { useAppDispatch } from '../../store/store';
import { addUser } from '../../store/customerSlice';

import classes from './Auth.module.css';

import GoogleIcon from '@mui/icons-material/Google';

interface IProps {
	onAuth?: () => void;
}

const Auth = ({ onAuth = () => {} }: IProps) => {
	const auth = getAuth();
	const dispatch = useAppDispatch();

	const handleGoogleAuth = () => {
		const provider = new GoogleAuthProvider();

		signInWithPopup(auth, provider).then((result) => {
			const credentialFromResult = GoogleAuthProvider.credentialFromResult(result);
			const { photoURL, email, displayName, uid } = result.user;

			dispatch(
				addUser({
					photoURL,
					email,
					uid,
					displayName,
					accessToken: credentialFromResult?.accessToken || null,
				})
			);

			onAuth();
		});
	};

	return (
		<div className={classes.wrapper}>
			<Button onClick={handleGoogleAuth}>
				<span className={classes.authBtn}>
					<GoogleIcon /> Login with google
				</span>
			</Button>
		</div>
	);
};

export default Auth;

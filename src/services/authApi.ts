import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithEmailAndPassword,
} from 'firebase/auth';

import { IUser } from '../models';
import { auth } from '../firebase';

const provider = new GoogleAuthProvider();

export interface ICredential {
	email: string;
	password: string;
}

export const loginWithGoogle = (callback: (user: IUser) => void) => {
	signInWithPopup(auth, provider).then((result) => {
		const credentialFromResult = GoogleAuthProvider.credentialFromResult(result);
		const { photoURL, email, displayName, uid } = result.user;
		callback({
			accessToken: credentialFromResult?.accessToken || null,
			photoURL,
			email,
			displayName,
			uid,
		});
	});
};

export const loginWithCredential = (
	credential: ICredential,
	callback: (user: IUser) => void
) => {
	signInWithEmailAndPassword(auth, credential.email, credential.password)
		.then((result) => {
			const { photoURL, email, displayName, uid } = result.user;
			console.log(result.user);
			callback({
				accessToken: null,
				photoURL,
				email,
				displayName,
				uid,
			});
			// ...
		})
		.catch((error) => {
			console.log(error.message);
			if (error.code === 'auth/user-not-found') {
				createUserWithEmailAndPassword(auth, credential.email, credential.password)
					.then((result) => {
						const { photoURL, email, displayName, uid } = result.user;
						callback({
							accessToken: null,
							photoURL,
							email,
							displayName,
							uid,
						});
						// ...
					})
					.catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;
						console.log(errorCode, errorMessage);
					});
			}
		});
};

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

const userMappingFunction = (data: any) => {
	const user: IUser = data.user;
	return user;
};

export const loginWithGoogle = (callback: (user: IUser) => void) => {
	signInWithPopup(auth, provider).then((result) => {
		callback(userMappingFunction(result));
	});
};

export const loginWithCredential = (
	credential: ICredential,
	callback: (user: IUser) => void
) => {
	signInWithEmailAndPassword(auth, credential.email, credential.password)
		.then((result) => {
			callback(userMappingFunction(result));
		})
		.catch((error) => {
			console.log(error.message);
			if (error.code === 'auth/user-not-found') {
				console.log('s');
			}
		});
};

export const signInWithCredential = (
	credential: ICredential,
	callback: (user: IUser) => void
) => {
	createUserWithEmailAndPassword(auth, credential.email, credential.password)
		.then((result) => {
			callback(userMappingFunction(result));
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
		});
};

import { useSelector } from 'react-redux';

import { IRootState } from '../store/store';
import { IUser } from '../models';
import {
	ICredential,
	loginWithCredential,
	loginWithGoogle,
} from '../services/authApi';

export const useAuth = () => {
	const user = useSelector((state: IRootState) => state.customer.user);
	const { displayName, uid, email, photoURL } = user;

	const auth = (cb: (user: IUser) => void, credential?: ICredential) => {
		if (credential) {
			loginWithCredential(credential, cb);
		} else {
			loginWithGoogle(cb);
		}
	};

	return {
		auth,
		isAuth: !!email,
		uid,
		email,
		displayName,
		photoURL,
	};
};

import { useSelector } from 'react-redux';

import { IRootState } from '../store/store';

export const useAuth = () => {
	const user = useSelector((state: IRootState) => state.customer.user);
	const { displayName, uid, email, accessToken, photoURL } = user;

	return {
		isAuth: !!email,
		uid,
		email,
		accessToken,
		displayName,
		photoURL,
	};
};

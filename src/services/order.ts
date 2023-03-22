import { ICart } from '../store/customerSlice';
import { IOrderInfo } from '../models';

export const sendOrder = (
	cart: ICart[],
	userId: string,
	orderInfo: IOrderInfo
) => {
	console.log('cart:', cart);
	console.log('userId:', userId);
	console.log('orderInfo:', orderInfo);
};

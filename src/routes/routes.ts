import { IRoutes } from '../models';
import Products from '../views/Products/Products';
import SingleProduct from '../views/SingleProduct/SingleProduct';
import Cart from '../views/Cart/Cart';
import Order from '../views/Order/Order';

export const publicRoutes: Array<IRoutes> = [
	{
		isShowInMenu: true,
		isHomePage: true,
		path: '/',
		name: 'Products',
		component: Products,
	},
	{
		isShowInMenu: false,
		isHomePage: false,
		path: '/product/:id',
		name: 'SingleProduct',
		component: SingleProduct,
	},
];

export const privateRoutes: Array<IRoutes> = [
	{
		isShowInMenu: true,
		isHomePage: false,
		path: '/cart',
		name: 'cart',
		component: Cart,
	},
	{
		isShowInMenu: false,
		isHomePage: false,
		path: '/order',
		name: 'order',
		component: Order,
	},
];

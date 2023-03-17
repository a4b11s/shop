import { IRoutes } from '../models';
import Products from '../views/Products/Products';
import SingleProduct from '../views/SingleProduct/SingleProduct';
import Cart from '../views/Cart/Cart';

export const routes: Array<IRoutes> = [
	{
		isShow: true,
		isIndex: true,
		path: '/',
		name: 'Products',
		component: Products,
	},
	{
		isShow: false,
		isIndex: false,
		path: '/product/:id',
		name: 'SingleProduct',
		component: SingleProduct,
	},
	{
		isShow: true,
		isIndex: false,
		path: '/cart',
		name: 'cart',
		component: Cart,
	},
];

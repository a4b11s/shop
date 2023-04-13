export interface IRoutes {
	readonly isShowInMenu: boolean;
	readonly isHomePage: boolean;
	readonly path: string;
	readonly name: string;
	readonly component: Function;
}

export interface IProduct {
	id: number;
	title: string;
	description: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	brand: string;
	category: string;
	thumbnail: string;
	images: Array<string>;
}

export interface IComment {
	id: number;
	body: string;
	postId: number;
	user: {
		id: number;
		username: string;
	};
}

export interface IUser {
	displayName: string | null;
	email: string | null;
	uid: string | null;
	photoURL: string | null;
}

export interface IOrderInfo {
	name: string;
	email: string;
	deliveryAddress: string;
	phone: number;
}

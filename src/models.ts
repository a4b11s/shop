export interface IRoutes {
	readonly isShow: boolean;
	readonly isIndex: boolean;
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

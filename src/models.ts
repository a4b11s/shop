export interface IRoutes {
  readonly isShow: boolean;
  readonly isIndex: boolean;
  readonly path: string;
  readonly name: string;
  readonly component: Function;
}

export interface IProducts {
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

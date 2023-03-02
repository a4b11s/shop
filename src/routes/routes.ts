import { IRoutes } from "../models";
import Products from "../views/Products";

export const routes: Array<IRoutes> = [
  {
    isShow: true,
    isIndex: true,
    path: "/",
    name: "Products",
    component: Products,
  },
];

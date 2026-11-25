import { IProduct } from "./iproduct";
export interface IProductResponse {
     products: IProduct[];
     total: number;
     skip: number;
     limit: number;
}

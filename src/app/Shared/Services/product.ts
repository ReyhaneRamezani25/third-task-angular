import { Injectable } from '@angular/core';
import { HttpClientBase } from './http-client-base';
import { IProductResponse } from '../Models/iproduct-response';
import { ICategory } from '../Models/icategory';
@Injectable({
  providedIn: 'root',
})
export class Product extends HttpClientBase {

  private apiUrl = 'https://dummyjson.com/products';
  private categoriesApiUrl = 'https://dummyjson.com/products/categories';

  login() {
    return this.post<any>('https://dummyjson.com/auth/login', {
      username: 'emilys',
      password: 'emilyspass'
    });
  }

  getProducts(){
    return this.get<IProductResponse>(this.apiUrl);
  }

  getCategories(){
    return this.get<ICategory[]>(this.categoriesApiUrl);
  }

  postProduct(product: any) {
    return this.post<any>(
      'https://dummyjson.com/products/add',
      product
    );
  }
  
}

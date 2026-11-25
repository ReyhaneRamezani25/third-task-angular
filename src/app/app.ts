import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from './Shared/Services/product';
import { IProduct } from './Shared/Models/iproduct';
import { ProductForm } from './ProductForm/Componets/product-form/product-form';
import { FocusHighlight } from './Shared/Directives/focus-highlight';
import { ICategory } from './Shared/Models/icategory';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ProductForm,FocusHighlight],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
  private _productService = inject(Product);
  products: IProduct[] = [];
  categories: ICategory[] = [];
  showAddProductForm : boolean = false;
  constructor() {
    this._productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.products;
        console.log(this.products);
      },
      error: (error) => {
        console.log(error);
      }});
    this._productService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
        console.log(this.categories);
      },
      error: (error) => {
        console.log(error);
      }
    })
    }
}

import { Component, inject, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../../../Shared/Validators/custom-validators';
import { ICategory } from '../../../Shared/Models/icategory';
import { Product } from '../../../Shared/Services/product';
import { Auth } from '../../../Shared/Services/auth';
@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {
  private _formBuilder = inject(FormBuilder);
  private _productService = inject(Product);
  private _authService = inject(Auth);
  productForm = this._formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(100),Validators.minLength(3),noWhitespaceValidator]],
    price: [null, [Validators.required,Validators.min(0.01)]],
    category: ['', [Validators.required, Validators.maxLength(20),noWhitespaceValidator]],
    stock: [null, [Validators.required, Validators.min(0)]],
    description: ['', [Validators.required,noWhitespaceValidator]]
  });
  @Output() close = new EventEmitter<void>();
  @Input() categories : ICategory[] = [];
  closeForm() {
    this.close.emit();
  }
  isFieldInvalid(fieldName: string): boolean {
    const control = this.productForm.get(fieldName);

    return !!control && control.invalid && control.touched;
  }

  submitForm() {
  if (this.productForm.invalid) {
    this.productForm.markAllAsTouched();
    return;
  }

  this._productService.login().subscribe({
    next: (response) => {
      this._authService.setToken(response.accessToken);

      this._productService.postProduct(this.productForm.value).subscribe({
        next: (response) => {
          console.log('Product added:', response);
          this.productForm.reset();
        },
        error: (error) => {
          console.log(error);
        }
      });
    },
    error: (error) => {
      console.log('Login error:', error);
    }
  });
 }

}

// app/product-form.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service'; // 
import { Product } from './product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule], // 
  template: `
    <h2>Add New Product</h2>
    <form (ngSubmit)="addProduct()" #form="ngForm">
      <input class="form-control mb-2" name="productName" [(ngModel)]="product.name" placeholder="Product Name" required>
      <select class="form-select mb-2" [(ngModel)]="product.type" name="type">
        <option value="Electronics">Electronics</option>
        <option value="Gaming">Gaming</option>
        <option value="Appliance">Appliance</option>
        <option value="Audio">Audio</option>
        <option value="Computer">Computer</option>
      </select>
      <input class="form-control mb-2" name="price" type="number" [(ngModel)]="product.price" placeholder="Price" required>
      <input class="form-control mb-2" name="supplier" [(ngModel)]="product.supplier" placeholder="Supplier" required>
      <button class="btn btn-primary" type="submit">Add New Product</button>
    </form>
    <div *ngIf="message" class="alert alert-info mt-3">{{ message }}</div>
  `
})
export class ProductForm {
  product: Product = {
    id: 0,
    name: '',
    type: 'Electronics',
    price: 0,
    supplier: ''
  };
  message: string = '';

  constructor(private service: ProductService) { } //Similar to inejction

  addProduct() {
    this.service.addProduct(this.product).subscribe({
      next: value => {
        //Once you get a response for the product being added, reset the values that populate the form
        this.product = { id: 0, name: '', type: 'Electronics', price: 0, supplier: '' };
        //Call getAll to refresh the content of the page, triggered by the subscribe method
        this.service.getAll().subscribe();
      },
      error: err => {
        this.message = `Error adding product: ${err.error.body || err.message}`;
        console.error('Error adding product:', err);
      }
    });
  }
}

//As an improvement maybe having a setter to reset the values of product
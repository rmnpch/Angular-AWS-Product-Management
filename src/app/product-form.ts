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
  product: Product = { // 
    id: 0, // ID is handled by Lambda now
    name: '',
    type: 'Electronics',
    price: 0, // 
    supplier: ''
  };
  message: string = '';

  // CRITICAL CHANGE: REMOVE ProductList injection from here
  constructor(private service: ProductService) { } // 

  addProduct() {
    this.message = 'Adding product...';
    this.service.addProduct(this.product).subscribe(
      response => {
        this.message = `Product '${this.product.name}' added successfully!`;
        // Reset form
        this.product = { id: 0, name: '', type: 'Electronics', price: 0, supplier: '' }; // 
        // After adding, tell the ProductService to refresh its data
        // This will in turn trigger ProductList to update via its subscription to productsSignal
        this.service.getAll().subscribe(); // Just subscribe to trigger the fetch
      },
      error => {
        this.message = `Error adding product: ${error.error.body || error.message}`;
        console.error('Error adding product:', error);
      }
    );
  }
}
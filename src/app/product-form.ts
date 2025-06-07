import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';

@Component({
    selector: 'app-product-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
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
  `
})
export class ProductForm {
    product = {
        name: '',
        type: 'Electronics',
        price: 0,
        supplier: ''
    };

    constructor(private service: ProductService) { }

    addProduct() {
        this.service.addProduct(this.product);
        this.product = { name: '', type: 'Electronics', price: 0, supplier: '' };
    }
}


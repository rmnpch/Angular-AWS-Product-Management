import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './product.service';
@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule],
    template: `
    <h2>All Products</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Price</th>
          <th>Supplier</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let p of products()">
          <td>{{ p.name }}</td>
          <td>{{ p.type }}</td>
          <td>\${{ p.price }}</td>
          <td>{{ p.supplier }}</td>
          <td><button class="btn btn-danger btn-sm" (click)="deleteProduct(p.name)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  `
})
export class ProductList {
    private service = inject(ProductService);
    products = computed(() => this.service.getAll());

    deleteProduct(name: string) {
        this.service.deleteProduct(name);
    }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from './product.model';

@Component({
  selector: 'product-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table *ngIf="products.length" class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Price</th>
          <th>Supplier</th>
          <th *ngIf="canDelete">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let p of products">
          <td>{{ p.name | titlecase }}</td>
          <td>{{ p.type }}</td>
          <td>{{ p.price | currency: 'AUD'}}</td>
          <td>{{ p.supplier |titlecase}}</td>
          <td *ngIf="canDelete">
            <button class="btn btn-danger btn-sm" (click)="delete.emit(p.name)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class ProductTable {
  @Input() products: Product[] = [];
  @Input() canDelete = false;
  @Output() delete = new EventEmitter<string>();
}

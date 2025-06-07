import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';

@Component({
    selector: 'app-search-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <h2>Search Products</h2>
    <form (ngSubmit)="search()" #searchForm="ngForm">
      <input type="text" [(ngModel)]="searchName" name="searchName" class="form-control mb-2"
        placeholder="Search Product By Name">
      <button type="submit" class="btn btn-primary mb-3">Search</button>
    </form>

    <table *ngIf="results.length" class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Price</th>
          <th>Supplier</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let p of results">
          <td>{{ p.name | titlecase }}</td>
          <td>{{ p.type }}</td>
          <td>{{ p.price | currency: 'AUD' }}</td>
          <td>{{ p.supplier  }}</td>
        </tr>
      </tbody>
    </table>
  `
})
export class SearchForm {
    searchName = '';
    results: any[] = [];

    constructor(private service: ProductService) { }

    search() {
        this.results = this.service.searchByName(this.searchName);
    }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { ProductTable } from './product-table';
import { Product } from './product.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [FormsModule, ProductTable, CommonModule],
  template: `
    <h2>Search Products</h2>
    <form (ngSubmit)="search()" #searchForm="ngForm">
      <input type="text" [(ngModel)]="searchName" name="searchName" class="form-control mb-2"
        placeholder="Search Product By Name">
      <button type="submit" class="btn btn-primary mb-3">Search</button>
    </form>
    <div *ngIf="message" class="alert alert-info mt-3">{{ message }}</div>
    <product-table [products]="results"></product-table>
    <div *ngIf="results.length === 0 && searched" class="alert alert-warning mt-3">No matching products found.</div>
  `
})
export class SearchForm {
  searchName = '';
  results: Product[] = [];
  message: string = '';
  searched: boolean = false;

  constructor(private service: ProductService) { }

  search() {
    this.message = 'Searching...';
    this.searched = true;
    this.service.searchByName(this.searchName).subscribe(
      response => {
        if (response && Array.isArray(response)) { // Lambda returns an array for search
          this.results = response;
          this.message = `Found ${response.length} results for '${this.searchName}'.`;
        } else {
          this.results = [];
          this.message = response.body || `No results found for '${this.searchName}'.`;
        }
      },
      error => {
        this.results = [];
        this.message = `Error during search: ${error.error.body || error.message}`;
        console.error('Error searching products:', error);
      }
    );
  }
}

import { Component, ChangeDetectorRef } from '@angular/core'; //Change detector added after search method had to be submitted twice to update results
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
    <!-- <div *ngIf="results.length === 0 && searched" class="alert alert-warning mt-3">No matching products found.</div> -->
  `
})
export class SearchForm {
  searchName = '';
  results: Product[] = [];
  message: string = '';
  searched: boolean = false;

  constructor(private service: ProductService, private cdr: ChangeDetectorRef) { }

  search() {
    this.searched = true;
    this.message = 'Searching...';
    this.service.searchByName(this.searchName).subscribe({
      next: response => {
        if (response && Array.isArray(response)) {
          this.results = response;
          this.message = `Found ${response.length} results for '${this.searchName}'.`;
        } else {
          // This 'else' might not be reached if the API returns 404 for no results
          // It's more for a 200 OK with a non-array body, or an empty array
          this.results = [];
          this.message = response.body || `No results found for '${this.searchName}'.`;
        }
        this.cdr.detectChanges();
      },
      error: err => {
        this.results = [];
        if (err.status === 404) {
          this.message = `No results found for '${this.searchName}'.`;
        } else {
          this.message = `Error during search: ${err.error.body || err.message}`;
          console.error('Error searching products:', err);
        }
        this.cdr.detectChanges();
      }
    });
  }
}
//Lastly, show where bootstrap is being imported

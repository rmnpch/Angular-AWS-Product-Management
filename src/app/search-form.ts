import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { ProductTable } from './product-table';
import { Product } from './product.model';


@Component({
    selector: 'app-search-form',
    standalone: true,
    imports: [FormsModule, ProductTable],
    template: `
    <h2>Search Products</h2>
    <form (ngSubmit)="search()" #searchForm="ngForm">
      <input type="text" [(ngModel)]="searchName" name="searchName" class="form-control mb-2"
        placeholder="Search Product By Name">
      <button type="submit" class="btn btn-primary mb-3">Search</button>
    </form>

        <product-table [products]="results"></product-table>

  `
})
export class SearchForm {
    searchName = '';
    results: Product[] = [];

    constructor(private service: ProductService) { }

    search() {
        this.results = this.service.searchByName(this.searchName);
    }
}

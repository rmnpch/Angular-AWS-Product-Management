import { Component } from '@angular/core';
import { ProductForm } from './product-form';
import { ProductList } from './product-list';
import { SearchForm } from './search-form';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductForm, ProductList, SearchForm, HttpClientModule],
  template: `
    <header class="p-3 bg-dark text-white">
      <h1>Product Management Website</h1>
      <small>Create, search and delete items</small>
    </header>
    <main class="container mt-4">
      <app-search-form></app-search-form>
      <app-product-form></app-product-form>
      <app-product-list></app-product-list>
    </main>
  `
})
export class App { }
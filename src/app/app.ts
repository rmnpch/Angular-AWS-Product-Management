import { Component } from '@angular/core';

//Imports other components
import { ProductForm } from './product-form';
import { ProductList } from './product-list';
import { SearchForm } from './search-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductForm, ProductList, SearchForm],
  template: `
    <header class="p-3 bg-dark text-white">
      <h1>Product Management Website</h1>
      <small>Create, search and delete items</small>
    </header>
    <main class="container mt-4">
      <app-search-form></app-search-form>
      <hr>
      <app-product-form></app-product-form>
      <hr>
      <app-product-list></app-product-list>
    </main>
  `
})
export class App { }


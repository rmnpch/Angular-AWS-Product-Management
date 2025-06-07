import { Component, computed, inject } from '@angular/core';
import { ProductService } from './product.service';
import { ProductTable } from './product-table';
@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [ProductTable],
    template: `
    <h2>All Products</h2>
    <product-table [products]="products()" [canDelete]="true" (delete)="deleteProduct($event)"></product-table>
  `
})
export class ProductList {
    private service = inject(ProductService);
    products = computed(() => this.service.getAll());

    deleteProduct(id: number) {
        this.service.deleteProduct(id);
    }
}


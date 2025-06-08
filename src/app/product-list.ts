import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { ProductTable } from './product-table';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [ProductTable, CommonModule],
    template: `
    <h2>All Products</h2>
    <div *ngIf="message" class="alert alert-info">{{ message }}</div> 
    <product-table [products]="products()" [canDelete]="true" (delete)="deleteProduct($event)"></product-table>
    <div *ngIf="products().length === 0" class="alert alert-warning mt-3">No products found.</div>
  `
})
//onto product-table >

export class ProductList implements OnInit {
    private service = inject(ProductService);
    products = this.service.productsSignal; //getter to bring products from services
    message: string = '';

    ngOnInit() {
        this.loadProducts(); //load products when application starts
    }

    loadProducts() {
        this.service.getAll().subscribe({
            next: value => {
                this.message = `Success loading products:`
                setTimeout(() => { this.message = '' }, 500)
            },
            error: err => {
                this.message = `Error loading products: ${err.error.body || err.message}`;
            }
        });
    }

    deleteProduct(name: string) {
        // if (confirm(`Are you sure you want to delete ${name}?`)) {
        this.service.deleteProduct(name).subscribe({
            next: value => {
                this.message = `Product '${name}' deleted successfully.`;
                this.loadProducts();
            },
            error: err => {
                this.message = `Error deleting product '${name}': ${err.error.body || err.message}`;
                console.error('Error deleting product:', err);
            }
        });
    }
}

// onto product-form
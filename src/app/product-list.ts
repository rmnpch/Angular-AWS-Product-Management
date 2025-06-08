import { Component, computed, inject, OnInit } from '@angular/core';
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
    <div *ngIf="products().length === 0 && !loading" class="alert alert-warning mt-3">No products found.</div>
  `
})
export class ProductList implements OnInit {
    private service = inject(ProductService);
    products = this.service.productsSignal;
    message: string = '';
    loading: boolean = false;

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts() {
        this.loading = true;
        this.message = 'Loading products...';
        this.service.getAll().subscribe(
            response => {
                this.message = 'Products loaded successfully.';
                this.loading = false;
            },
            error => {
                this.message = `Error loading products: ${error.error.body || error.message}`;
                this.loading = false;
                console.error('Error loading products:', error);
            }
        );
    }

    deleteProduct(name: string) {
        if (confirm(`Are you sure you want to delete ${name}?`)) {
            this.service.deleteProduct(name).subscribe(
                response => {
                    this.message = `Product '${name}' deleted successfully.`;
                    this.loadProducts();
                },
                error => {
                    this.message = `Error deleting product '${name}': ${error.error.body || error.message}`;
                    console.error('Error deleting product:', error);
                }
            );
        }
    }
}


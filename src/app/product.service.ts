import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private products = signal<any[]>([]);

    getAll() {
        return this.products();
    }

    addProduct(product: any) {
        this.products.update(p => [...p, product]);
    }

    deleteProduct(name: string) {
        this.products.update(p => p.filter(item => item.name !== name));
    }

    searchByName(name: string) {
        return this.products().filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
    }
}

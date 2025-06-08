import { Injectable, signal } from '@angular/core';
import { Product } from './product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {


    private nextId = 3;

    private readonly initialProducts: Product[] = [
        {
            'id': 1,
            'name': 'PlayStation 5',
            'type': 'Gaming',
            'price': 799,
            'supplier': 'Sony Australia'
        },
        {
            'id': 2,
            'name': 'Apple AirPods Pro',
            'type': 'Audio',
            'price': 399,
            'supplier': 'Apple'
        }
    ];

    private products = signal<Product[]>(this.initialProducts);


    getAll() {
        return this.products();
    }

    addProduct(product: Product) {
        this.products.update(p => [...p, product]);
    }

    deleteProduct(id: number) {
        this.products.update(p => p.filter(item => item.id !== id));
    }

    searchByName(name: string): Product[] {
        console.log(JSON.parse(JSON.stringify(this.getAll())))

        return this.products().filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
    }
}

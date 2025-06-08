import { Injectable, signal } from '@angular/core';
import { Product } from './product.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private apiGatewayUrl = 'https://5r0znt22uk.execute-api.ap-southeast-2.amazonaws.com/production/product'

    private products = signal<Product[]>([]);

    // private nextId = 3;

    // private readonly initialProducts: Product[] = [
    //     {
    //         id: 1,
    //         name: 'PlayStation 5',
    //         type: 'Gaming',
    //         price: 799,
    //         supplier: 'Sony Australia'
    //     },
    //     {
    //         id: 2,
    //         name: 'Apple AirPods Pro',
    //         type: 'Audio',
    //         price: 399,
    //         supplier: 'Apple'
    //     }
    // ];
    // private products = signal<Product[]>(this.initialProducts);

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        let params = new HttpParams().set('param', 'list');
        return this.http.get<any>(this.apiGatewayUrl, { params }).pipe(
            tap(response => {
                if (response && response.items) {
                    this.products.set(response.items); // Update signal after successful fetch
                }
            })
        );
    }

    addProduct(product: Product): Observable<any> {
        // Construct the query parameter string as required by your Lambda
        const createParam = `${product.name},${product.type},${product.price},${product.supplier}`;
        let params = new HttpParams().set('create', createParam);
        // POST request with query parameters (body is null)
        return this.http.post<any>(this.apiGatewayUrl, null, { params });
        // Note: You might want to call getAll() or update the signal locally after success
        // This can be done in the component or by chaining another tap here.
    }

    deleteProduct(name: string): Observable<any> {
        let params = new HttpParams().set('delete', name);
        return this.http.delete<any>(this.apiGatewayUrl, { params });
        // Similar to addProduct, you might want to refresh the list or update the signal
        // after a successful deletion.
    }

    searchByName(name: string): Observable<any> {
        let params = new HttpParams().set('search', name);
        return this.http.get<any>(this.apiGatewayUrl, { params });
        // The search results will be returned directly from the observable.
        // No need to update the main products signal here, as it's a separate search result.
    }

    updateProduct(product: Product): Observable<any> {
        const updateParam = `${product.name},${product.type},${product.price},${product.supplier}`;
        let params = new HttpParams().set('update', updateParam);
        return this.http.patch<any>(this.apiGatewayUrl, null, { params });
    }

    get productsSignal() {
        return this.products.asReadonly();
    }
}

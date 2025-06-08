import { Injectable, signal } from '@angular/core';
import { Product } from './product.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
//// Makes this service available across the whole app 

export class ProductService {

    private apiGatewayUrl = 'https://5r0znt22uk.execute-api.ap-southeast-2.amazonaws.com/production/product'
    //Connection string given by API Gateway, only containing one resource and having all methods

    private products = signal<Product[]>([]);
    //Creating a sinal of products so that any component using it will update upon change

    constructor(private http: HttpClient) { }
    // Injecting http client to make api requests and interecat with the backend

    getAll(): Observable<any> {
        // This method will be called to fetch all the items on the database, using ?params=list
        let params = new HttpParams().set('param', 'list');
        //Use HHTP to make the get request with the list param. The tap is chained to take the response and use the signal setter to assign the items to products
        return this.http.get<any>(this.apiGatewayUrl, { params }).pipe(
            tap(response => {
                if (response && response.items) {
                    this.products.set(response.items);
                }
            })
        );
    }

    addProduct(product: Product): Observable<any> {
        // Each HTTP method will require a different param, this time, products are added using ?create=name,type,price,supplier
        const createParam = `${product.name},${product.type},${product.price},${product.supplier}`;
        let params = new HttpParams().set('create', createParam);
        console.log(params)
        // POST request with create parameters 
        return this.http.post<any>(this.apiGatewayUrl, null, { params }); //null because nothing is coming from req.body
    }

    deleteProduct(name: string): Observable<any> {
        // This time, param is ?delete=name
        let params = new HttpParams().set('delete', name);
        return this.http.delete<any>(this.apiGatewayUrl, { params });
    }

    searchByName(name: string): Observable<any> {
        // To search, use ?search=name
        let params = new HttpParams().set('search', name);
        return this.http.get<any>(this.apiGatewayUrl, { params });
    }

    updateProduct(product: Product): Observable<any> {
        // This time, products are added using ?update=name,type,price,supplier
        const updateParam = `${product.name},${product.type},${product.price},${product.supplier}`;
        let params = new HttpParams().set('update', updateParam);
        return this.http.patch<any>(this.apiGatewayUrl, null, { params });
    }

    get productsSignal() {
        return this.products.asReadonly();
    } //getter for products that is going to pass the products signal to product-list.ts
}

//onto product-list >

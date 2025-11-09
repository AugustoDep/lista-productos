import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model'; 
import { ProductResponse } from '../models/product-response.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  apiUrl: string = 'https://dummyjson.com/products'; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}?limit=0`);
  }
  
  getSingleProduct(id: number) : Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}/${id}`); 
  }

  addProduct(product: Product) : Observable<Product>{
    return this.http.post<Product>(`${this.apiUrl}/add`, JSON.stringify({product}) ); 
  }

  updateProduct(product: Product) : Observable<Product>{
    var id = product.id; 
    return this.http.put<Product>(`${this.apiUrl}/id` ,JSON.stringify({product}))
  }

  deleteProduct(id: number) : Observable<Product>{
    return this.http.delete<Product>(`${this.apiUrl}/id`);
  }
}

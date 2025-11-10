import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductResponse } from '../models/product-response.model';

export interface ProductPayload {
  title: string;
  price: number;
  description: string;
  category: string;
  rating: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  apiUrl: string = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getAll(params?: { limit?: number; skip?: number }): Observable<ProductResponse> {
    let httpParams = new HttpParams();

    if (params?.limit !== undefined) {
      httpParams = httpParams.set('limit', params.limit);
    }
    if (params?.skip !== undefined) {
      httpParams = httpParams.set('skip', params.skip);
    }

    return this.http.get<ProductResponse>(this.apiUrl, { params: httpParams });
  }
  
  getSingleProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: ProductPayload): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/add`, product);
  }

  updateProduct(id: number, product: ProductPayload): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${id}`);
  }
}

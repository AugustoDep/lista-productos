import { Injectable, signal } from "@angular/core";
import { Product } from "../models/product.model";
import { ProductService } from "./product.service";
import { firstValueFrom } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProductStoreService {

  productsList = signal<Product[]>([]);

  setProducts(products: Product[]) {
    this.productsList.set(products);
  }

  async loadProductsFromApi(productService: ProductService) {
    const data = await firstValueFrom(productService.getAll()); 
    this.setProducts(data?.products); 
  }
}
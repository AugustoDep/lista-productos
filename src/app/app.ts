import { Component, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { LeftSidebarComponent } from "./components/left-sidebar/left-sidebar.component";
import { MainComponent } from './components/main.component/main.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LayoutService } from './services/layout.service';
import { ProductStoreService } from './services/product-store.service';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  imports: [LeftSidebarComponent, MainComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
  private layout = inject(LayoutService);
  private store = inject(ProductStoreService);
  private productService = inject(ProductService);
  private platformId = inject(PLATFORM_ID);


  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.layout.updateScreenWidth(window.innerWidth);
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.layout.updateScreenWidth(window.innerWidth);
    }

    this.store.loadProductsFromApi(this.productService);

    console.log(this.store.productsList()); 

  }
}

import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from '../../models/product.model';
import { LayoutService } from '../../services/layout.service';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {

  private layout = inject(LayoutService);

  productsList = signal<Product[]>([]);  

  sizeClass = computed(() =>
    this.layout.isLeftSidebarCollapsed() ? 'collapsed' : ''
  );

  screenWidth = this.layout.screenWidth;
}
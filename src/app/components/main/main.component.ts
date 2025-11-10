import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from '../../models/product.model';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {

  @Input() collapsed = false;

  productsList = signal<Product[]>([]);  

  sizeClass() {
    return this.collapsed ? 'collapsed' : '';
  }
}
import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Product } from '../../models/product.model';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DeleteConfirmComponent } from '../modals/delete-confirm/delete-confirm.component';
import { EditProductComponent } from '../modals/edit-product/edit-product.component';
import { AddProductComponent } from '../modals/add-product/add-product.component';
import { ProductPayload, ProductService } from '../../services/product.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, filter, switchMap, tap } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductsTableComponent implements OnInit {

  private readonly productService = inject(ProductService);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly snackBar = inject(MatSnackBar);

  readonly columnsToDisplay = ['id', 'name', 'price', 'expand', 'actions'];

  readonly products = signal<Product[]>([]);
  readonly isLoading = signal(true);
  readonly loadError = signal(false);

  readonly pageIndex = signal(0);
  readonly pageSize = signal(50);
  readonly totalProducts = signal(0);
  readonly expandedProductId = signal<number | null>(null);
  readonly expandedProductImg = signal<string>(""); 

  readonly dataSource = computed(() => this.products());

  createProduct(): void {
    const dialogRef = this.dialog.open<AddProductComponent, undefined, ProductPayload>(AddProductComponent, {
      width: '500px'
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((payload): payload is ProductPayload => !!payload),
        tap(() => {
          this.isLoading.set(true);
          this.loadError.set(false);
        }),
        switchMap(payload => this.productService.addProduct(payload))
      )
      .subscribe({
        next: (newProduct) => {
          // this.fetchProducts();
          this.products.update(current => [...current, newProduct]);
          this.totalProducts.update(total => total + 1);
          this.isLoading.set(false);
          this.snackBar.open('Producto creado con éxito', 'Cerrar', { duration: 3000 });
        },
        error: err => {
          console.error('Error agregando producto', err);
          this.loadError.set(true);
          this.isLoading.set(false);
        }
      });
  }

  editItem(product: Product): void {
    const dialogRef = this.dialog.open<EditProductComponent, { product: Product }, ProductPayload>(EditProductComponent, {
      width: '500px',
      data: { product }
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((payload): payload is ProductPayload => !!payload),
        tap(() => {
          this.isLoading.set(true);
          this.loadError.set(false);
        }),
        switchMap(payload => this.productService.updateProduct(product.id, payload))
      )
      .subscribe({
        next: (updatedProduct) => {
          // this.fetchProducts();  since the server does not actually actualice, we make the changes locally. 
          console.log(updatedProduct); 
          this.products.update(current => 
            current.map(p => p.id === product.id ? updatedProduct : p)
          );
          this.isLoading.set(false);
          this.snackBar.open('Producto actualizado con éxito', 'Cerrar', { duration: 3000 });
        },
        error: err => {
          console.error('Error actualizando producto', err);
          this.loadError.set(true);
          this.isLoading.set(false);
        }
      });
  }

  deleteItem(product: Product): void {
    const dialogRef = this.dialog.open<DeleteConfirmComponent, { productName: string }, boolean>(DeleteConfirmComponent, {
      width: '400px',
      data: { productName: product.title }
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(result => !!result),
        tap(() => {
          this.isLoading.set(true);
          this.loadError.set(false);
        }),
        switchMap(() => this.productService.deleteProduct(product.id))
      )
      .subscribe({
        next: () => {
          const total = this.totalProducts();
          this.totalProducts.set(total > 0 ? total - 1 : 0);
          this.products.update(current => current.filter(p => p.id !== product.id));
          this.isLoading.set(false); 
          // this.fetchProducts();
          this.snackBar.open('Producto eliminado con éxito', 'Cerrar', { duration: 3000 });
        },
        error: err => {
          console.error('Error eliminando producto', err);
          this.loadError.set(true);
          this.isLoading.set(false);
        }
      });
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.fetchProducts();
  }

  toggleExpand(element: Product): void {
    this.expandedProductId.update(current =>
      current === element.id ? null : element.id
    );
    this.expandedProductImg.set(element.images[0]);
    this.products.update(items => [...items]);
  }

  isExpanded(element: Product): boolean {
    return this.expandedProductId() === element.id;
  }

  isExpandedRow = (_: number, row: Product) => this.isExpanded(row);

  private fetchProducts() {
    const limit = this.pageSize();
    const skip = this.pageIndex() * limit;

    this.isLoading.set(true);
    this.loadError.set(false);

    this.productService.getAll({ limit, skip })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: response => {
          this.totalProducts.set(response?.total ?? 0);
          this.products.set([...(response?.products ?? [])]);
        },
        error: err => {
          console.error('Error cargando productos', err);
          this.loadError.set(true);
        }
      });
  }
}




















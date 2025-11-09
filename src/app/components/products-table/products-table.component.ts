import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ProductStoreService } from '../../services/product-store.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Product } from '../../models/product.model';
import { MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DeleteConfirmComponent } from '../delete-confirm.component/delete-confirm.component';
import { EditProductComponent } from '../edit-product.component/edit-product.component';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-products-table',
  imports: [
    MatTableModule, 
    MatInputModule, 
    MatPaginatorModule, 
    MatIconModule,
    MatButtonModule
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
export class ProductsTableComponent implements OnInit, AfterViewInit{
  
  private store = inject(ProductStoreService);
  private dialog = inject(MatDialog);
  private layout = inject(LayoutService);

  isSidebarCollapsed = this.layout.isLeftSidebarCollapsed;

  productsList : any  = this.store.productsList;

  columnsToDisplay = [ 'id' , 'name' , 'price', 'expand', 'actions']; 
  columnsToDisplayWithExpand = [...this.columnsToDisplay];

  dataSource = new MatTableDataSource<Product>([]);

  expandedElement: Product | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  ngOnInit() : void {
    this.dataSource.data = [...this.productsList()]; 
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editItem(product: Product): void {      
    const dialogRef = this.dialog.open(EditProductComponent, {
        width: '500px',
        data: { product: product }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Update the product with new values
          const updatedProduct = { ...product, ...result };
          
          // Update in dataSource
          const index = this.dataSource.data.findIndex(p => p.id === product.id);
          if (index !== -1) {
            const newData = [...this.dataSource.data];
            newData[index] = updatedProduct;
            this.dataSource.data = newData;
          }

          // Also update in your store if needed
          // this.store.updateProduct(updatedProduct);
          
          console.log('Product updated:', updatedProduct);
        }
      });
  }

  deleteItem(product: Product): void {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '400px',
      data: { productName: product.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Remove from dataSource
        this.dataSource.data = this.dataSource.data.filter(p => p.id !== product.id);
        
        // Also remove from your store if needed
        // this.store.deleteProduct(product.id);
        
        console.log('Product deleted:', product);
        
        // If the deleted product was expanded, clear the expanded element
        if (this.expandedElement?.id === product.id) {
          this.expandedElement = null;
        }
      }
    });
  }

  //arreglar
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleExpand(element: any): void {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.dataSource.data = [...this.dataSource.data];
  }

  isExpandedRow = (index: number, row: Product) => {
    const result = this.isExpanded(row);
    return result;
  };

  isExpanded(element: any): boolean {
    return this.expandedElement === element;
  }
  //renderRows()  cuando haga alguna operacion crud
}




















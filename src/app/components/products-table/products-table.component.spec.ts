import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsTableComponent } from './products-table.component';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';

describe('ProductsTableComponent', () => {
  let component: ProductsTableComponent;
  let fixture: ComponentFixture<ProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsTableComponent],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getAll: () => of({ products: [], total: 0, limit: 10, skip: 0 })
          } as Partial<ProductService>
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

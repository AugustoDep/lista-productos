import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProductComponent } from './edit-product.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

const dialogDataMock = {
  product: {
    id: 1,
    title: 'Test',
    description: 'Desc',
    category: 'Category',
    price: 10,
    discountPercentage: 0,
    rating: 4,
    stock: 0,
    brand: '',
    warrantyInformation: '',
    reviews: [],
    returnPolicy: '',
    minimumOrderQuantity: ''
  }
};

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProductComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

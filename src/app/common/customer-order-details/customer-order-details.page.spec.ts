import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerOrderDetailsPage } from './customer-order-details.page';

describe('CustomerOrderDetailsPage', () => {
  let component: CustomerOrderDetailsPage;
  let fixture: ComponentFixture<CustomerOrderDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CustomerOrderDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerOrdersPage } from './customer-orders.page';

describe('CustomerOrdersPage', () => {
  let component: CustomerOrdersPage;
  let fixture: ComponentFixture<CustomerOrdersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CustomerOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

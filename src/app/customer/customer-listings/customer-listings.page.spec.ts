import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerListingsPage } from './customer-listings.page';

describe('CustomerListingsPage', () => {
  let component: CustomerListingsPage;
  let fixture: ComponentFixture<CustomerListingsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CustomerListingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

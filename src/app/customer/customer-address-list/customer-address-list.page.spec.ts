import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerAddressListPage } from './customer-address-list.page';

describe('CustomerAddressListPage', () => {
  let component: CustomerAddressListPage;
  let fixture: ComponentFixture<CustomerAddressListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CustomerAddressListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerListingOverviewPage } from './customer-listing-overview.page';

describe('CustomerListingOverviewPage', () => {
  let component: CustomerListingOverviewPage;
  let fixture: ComponentFixture<CustomerListingOverviewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CustomerListingOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

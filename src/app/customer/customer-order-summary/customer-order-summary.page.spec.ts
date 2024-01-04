import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerOrderSummaryPage } from './customer-order-summary.page';

describe('CustomerOrderSummaryPage', () => {
  let component: CustomerOrderSummaryPage;
  let fixture: ComponentFixture<CustomerOrderSummaryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CustomerOrderSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

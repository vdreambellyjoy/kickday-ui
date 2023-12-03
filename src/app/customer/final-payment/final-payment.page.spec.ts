import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinalPaymentPage } from './final-payment.page';

describe('FinalPaymentPage', () => {
  let component: FinalPaymentPage;
  let fixture: ComponentFixture<FinalPaymentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FinalPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

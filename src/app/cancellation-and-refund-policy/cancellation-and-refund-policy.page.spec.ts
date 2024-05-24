import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancellationAndRefundPolicyPage } from './cancellation-and-refund-policy.page';

describe('CancellationAndRefundPolicyPage', () => {
  let component: CancellationAndRefundPolicyPage;
  let fixture: ComponentFixture<CancellationAndRefundPolicyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CancellationAndRefundPolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

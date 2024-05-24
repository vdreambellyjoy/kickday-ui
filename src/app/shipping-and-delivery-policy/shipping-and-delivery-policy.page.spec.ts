import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShippingAndDeliveryPolicyPage } from './shipping-and-delivery-policy.page';

describe('ShippingAndDeliveryPolicyPage', () => {
  let component: ShippingAndDeliveryPolicyPage;
  let fixture: ComponentFixture<ShippingAndDeliveryPolicyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShippingAndDeliveryPolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

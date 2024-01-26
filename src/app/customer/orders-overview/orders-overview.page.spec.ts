import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersOverviewPage } from './orders-overview.page';

describe('OrdersOverviewPage', () => {
  let component: OrdersOverviewPage;
  let fixture: ComponentFixture<OrdersOverviewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrdersOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllListingsPage } from './all-listings.page';

describe('AllListingsPage', () => {
  let component: AllListingsPage;
  let fixture: ComponentFixture<AllListingsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AllListingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

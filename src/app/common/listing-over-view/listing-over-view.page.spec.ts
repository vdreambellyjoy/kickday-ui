import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListingOverViewPage } from './listing-over-view.page';

describe('ListingOverViewPage', () => {
  let component: ListingOverViewPage;
  let fixture: ComponentFixture<ListingOverViewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListingOverViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

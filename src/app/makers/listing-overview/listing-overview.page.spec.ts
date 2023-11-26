import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListingOverviewPage } from './listing-overview.page';

describe('ListingOverviewPage', () => {
  let component: ListingOverviewPage;
  let fixture: ComponentFixture<ListingOverviewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListingOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

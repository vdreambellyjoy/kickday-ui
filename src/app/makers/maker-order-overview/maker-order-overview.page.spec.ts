import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MakerOrderOverviewPage } from './maker-order-overview.page';

describe('MakerOrderOverviewPage', () => {
  let component: MakerOrderOverviewPage;
  let fixture: ComponentFixture<MakerOrderOverviewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MakerOrderOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

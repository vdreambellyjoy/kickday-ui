import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MakerDashboardPage } from './maker-dashboard.page';

describe('MakerDashboardPage', () => {
  let component: MakerDashboardPage;
  let fixture: ComponentFixture<MakerDashboardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MakerDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

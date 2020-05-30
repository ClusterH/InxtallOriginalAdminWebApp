import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchantDashboardComponent } from './marchant-dashboard.component';

describe('MarchantDashboardComponent', () => {
  let component: MarchantDashboardComponent;
  let fixture: ComponentFixture<MarchantDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarchantDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarchantDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

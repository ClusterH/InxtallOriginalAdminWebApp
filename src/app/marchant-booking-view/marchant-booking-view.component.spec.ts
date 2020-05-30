import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchantBookingViewComponent } from './marchant-booking-view.component';

describe('MarchantBookingViewComponent', () => {
  let component: MarchantBookingViewComponent;
  let fixture: ComponentFixture<MarchantBookingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarchantBookingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarchantBookingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

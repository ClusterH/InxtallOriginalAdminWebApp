import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchantBookingComponent } from './marchant-booking.component';

describe('MarchantBookingComponent', () => {
  let component: MarchantBookingComponent;
  let fixture: ComponentFixture<MarchantBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarchantBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarchantBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

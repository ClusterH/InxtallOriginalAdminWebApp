import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchantBookingComplateComponent } from './marchant-booking-complate.component';

describe('MarchantBookingComplateComponent', () => {
  let component: MarchantBookingComplateComponent;
  let fixture: ComponentFixture<MarchantBookingComplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarchantBookingComplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarchantBookingComplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

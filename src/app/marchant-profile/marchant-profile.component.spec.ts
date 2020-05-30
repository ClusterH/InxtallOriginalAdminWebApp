import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchantProfileComponent } from './marchant-profile.component';

describe('MarchantProfileComponent', () => {
  let component: MarchantProfileComponent;
  let fixture: ComponentFixture<MarchantProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarchantProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarchantProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

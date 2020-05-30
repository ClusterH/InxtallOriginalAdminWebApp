import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMarchantComponent } from './admin-marchant.component';

describe('AdminMarchantComponent', () => {
  let component: AdminMarchantComponent;
  let fixture: ComponentFixture<AdminMarchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMarchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMarchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

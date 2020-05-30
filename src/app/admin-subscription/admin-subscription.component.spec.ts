import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubscriptionComponent } from './admin-subscription.component';

describe('AdminSubscriptionComponent', () => {
  let component: AdminSubscriptionComponent;
  let fixture: ComponentFixture<AdminSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

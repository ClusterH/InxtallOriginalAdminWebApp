import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationMerchantComponent } from './registration-merchant.component';

describe('RegistrationMerchantComponent', () => {
  let component: RegistrationMerchantComponent;
  let fixture: ComponentFixture<RegistrationMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

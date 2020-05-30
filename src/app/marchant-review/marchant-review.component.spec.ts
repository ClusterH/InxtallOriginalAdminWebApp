import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchantReviewComponent } from './marchant-review.component';

describe('MarchantReviewComponent', () => {
  let component: MarchantReviewComponent;
  let fixture: ComponentFixture<MarchantReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarchantReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarchantReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

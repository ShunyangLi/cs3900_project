import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingComRecommendationComponent } from './booking-com-recommendation.component';

describe('BookingComRecommendationComponent', () => {
  let component: BookingComRecommendationComponent;
  let fixture: ComponentFixture<BookingComRecommendationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingComRecommendationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingComRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

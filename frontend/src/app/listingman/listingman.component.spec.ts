import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingmanComponent } from './listingman.component';

describe('ListingmanComponent', () => {
  let component: ListingmanComponent;
  let fixture: ComponentFixture<ListingmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

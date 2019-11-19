import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesmanComponent } from './imagesman.component';

describe('ImagesmanComponent', () => {
  let component: ImagesmanComponent;
  let fixture: ComponentFixture<ImagesmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoommanComponent } from './roomman.component';

describe('RoommanComponent', () => {
  let component: RoommanComponent;
  let fixture: ComponentFixture<RoommanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoommanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoommanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

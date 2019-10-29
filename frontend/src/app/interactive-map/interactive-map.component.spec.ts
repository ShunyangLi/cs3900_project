import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveMapComponent } from './interactive-map.component';

describe('MaptestComponent', () => {
  let component: InteractiveMapComponent;
  let fixture: ComponentFixture<InteractiveMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractiveMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

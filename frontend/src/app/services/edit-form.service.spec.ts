import { TestBed } from '@angular/core/testing';

import { EditFormService } from './edit-form.service';

describe('EditFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditFormService = TestBed.get(EditFormService);
    expect(service).toBeTruthy();
  });
});

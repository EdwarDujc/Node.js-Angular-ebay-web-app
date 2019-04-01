import { TestBed } from '@angular/core/testing';

import { ProcessingBarService } from './processing-bar.service';

describe('ProcessingBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessingBarService = TestBed.get(ProcessingBarService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DraganddropService } from './draganddrop.service';

describe('DraganddropService', () => {
  let service: DraganddropService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DraganddropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

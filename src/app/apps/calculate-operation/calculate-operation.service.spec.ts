import { TestBed } from '@angular/core/testing';

import { CalculateOperationService } from './calculate-operation.service';

describe('CalculateOperationService', () => {
  let service: CalculateOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DandelionService } from './dandelion.service';

describe('DandelionService', () => {
  let service: DandelionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DandelionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

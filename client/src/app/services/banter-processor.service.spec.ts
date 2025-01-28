import { TestBed } from '@angular/core/testing';

import { BanterProcessorService } from './banter-processor.service';

describe('BanterProcessorService', () => {
  let service: BanterProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BanterProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

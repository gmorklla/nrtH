/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IntervalRequestService } from './interval-request.service';

describe('IntervalRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntervalRequestService]
    });
  });

  it('should ...', inject([IntervalRequestService], (service: IntervalRequestService) => {
    expect(service).toBeTruthy();
  }));
});

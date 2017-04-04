/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TimePlusService } from './time-plus.service';

describe('TimePlusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimePlusService]
    });
  });

  it('should ...', inject([TimePlusService], (service: TimePlusService) => {
    expect(service).toBeTruthy();
  }));
});

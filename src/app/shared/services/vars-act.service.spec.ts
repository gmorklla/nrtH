/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VarsActService } from './vars-act.service';

describe('VarsActService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VarsActService]
    });
  });

  it('should ...', inject([VarsActService], (service: VarsActService) => {
    expect(service).toBeTruthy();
  }));
});

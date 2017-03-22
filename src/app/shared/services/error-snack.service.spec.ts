/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ErrorSnackService } from './error-snack.service';

describe('ErrorSnackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorSnackService]
    });
  });

  it('should ...', inject([ErrorSnackService], (service: ErrorSnackService) => {
    expect(service).toBeTruthy();
  }));
});

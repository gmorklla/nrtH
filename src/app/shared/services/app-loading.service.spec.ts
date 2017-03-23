/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppLoadingService } from './app-loading.service';

describe('AppLoadingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppLoadingService]
    });
  });

  it('should ...', inject([AppLoadingService], (service: AppLoadingService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { HttpGetServiceService } from './http-get-service.service';

describe('HttpGetServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpGetServiceService]
    });
  });

  it('should ...', inject([HttpGetServiceService], (service: HttpGetServiceService) => {
    expect(service).toBeTruthy();
  }));
});

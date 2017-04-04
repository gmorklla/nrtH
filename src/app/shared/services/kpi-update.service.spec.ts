/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KpiUpdateService } from './kpi-update.service';

describe('KpiUpdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KpiUpdateService]
    });
  });

  it('should ...', inject([KpiUpdateService], (service: KpiUpdateService) => {
    expect(service).toBeTruthy();
  }));
});

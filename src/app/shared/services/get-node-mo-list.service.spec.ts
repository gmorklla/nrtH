/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetNodeMoListService } from './get-node-mo-list.service';

describe('GetNodeMoListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetNodeMoListService]
    });
  });

  it('should ...', inject([GetNodeMoListService], (service: GetNodeMoListService) => {
    expect(service).toBeTruthy();
  }));
});

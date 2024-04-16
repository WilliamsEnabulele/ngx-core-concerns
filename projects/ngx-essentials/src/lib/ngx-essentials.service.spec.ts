import { TestBed } from '@angular/core/testing';

import { NgxEssentialsService } from './ngx-essentials.service';

describe('NgxEssentialsService', () => {
  let service: NgxEssentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxEssentialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

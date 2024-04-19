import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { OfflineService } from './offline.service';

describe('OfflineService', () => {
  let service: OfflineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfflineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false when offline', fakeAsync(() => {
    spyOnProperty(navigator, 'onLine').and.returnValue(false);

    let isOnline: boolean = false;
    service.isOnline().subscribe(isOnline => {
      isOnline = isOnline;
    });

    tick();

    expect(isOnline).toBeFalse();
  }));

  it('should return true when online', fakeAsync(() => {
    spyOnProperty(navigator, 'onLine').and.returnValue(true);

    let isOnline: boolean = false;
    service.isOnline().subscribe(online => {
      isOnline = online;
    });

    tick();

    expect(isOnline).toBeTrue();
  }));
});

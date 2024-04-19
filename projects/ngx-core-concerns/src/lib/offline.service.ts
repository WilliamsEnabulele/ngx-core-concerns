import { Injectable } from '@angular/core';
import { Observable, fromEvent, map, merge, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfflineService {

  online$: Observable<boolean>;

  constructor() {
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false))
    );
  }

  isOnline(): Observable<boolean> {
    return this.online$;
  }
}

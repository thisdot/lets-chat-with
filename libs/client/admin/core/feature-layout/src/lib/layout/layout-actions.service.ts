import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutActionsService {
  private backSubject = new Subject<void>();

  readonly back$ = this.backSubject.asObservable();

  back() {
    this.backSubject.next();
  }
}

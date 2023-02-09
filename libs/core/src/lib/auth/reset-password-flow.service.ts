import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ResetPasswordData } from '../models/reset-password-data';

@Injectable({ providedIn: 'root' })
export class ResetPasswordFlowService {
  private resetPasswordData = new BehaviorSubject<ResetPasswordData | null>(null);

  readonly resetPasswordFlowCache$: Observable<ResetPasswordData | null> =
    this.resetPasswordData.asObservable();

  writeResetPasswordFlowCache(resetPasswordData: ResetPasswordData): void {
    this.resetPasswordData.next(resetPasswordData);
  }

  patchResetPasswordFlowCache(resetPasswordData: Partial<ResetPasswordData>): void {
    this.resetPasswordFlowCache$.pipe(take(1)).subscribe((cache) => {
      this.resetPasswordData.next({ ...cache, ...resetPasswordData } as ResetPasswordData);
    });
  }

  clearResetPasswordFlowCache(): void {
    this.resetPasswordData.next(null);
  }
}

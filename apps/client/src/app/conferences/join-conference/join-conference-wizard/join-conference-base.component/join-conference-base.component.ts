import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { LayoutActionsService } from '../../../../layout/layout-actions.service';
import { WizardComponent } from '../../../../shared/wizard';

@Injectable()
export class JoinConferenceBaseComponent<T> implements OnInit, OnDestroy {
  protected destroy$ = new Subject<void>();
  form: UntypedFormGroup;
  constructor(
    protected wizard: WizardComponent<T>,
    protected layoutActionsService: LayoutActionsService
  ) {}

  ngOnInit(): void {
    this.form?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((input: T) => this.wizard.saveData(input));
    this.layoutActionsService.back$
      .pipe(
        tap((_) => void this.wizard.onBack()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    this.wizard.nextRoute();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, Validators, AsyncValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { LayoutActionsService } from '../../layout/layout-actions.service';
import { Store } from '@ngrx/store';
import {
  Conference,
  conferenceJoinAttempted,
  ConferencesSelectors,
  CoreState,
} from '@conf-match/core';

@Component({
  selector: 'cm-conference-url-form',
  templateUrl: './conference-url-form.component.html',
  styleUrls: ['./conference-url-form.component.scss'],
})
export class ConferenceUrlFormComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();
  conferences$ = this.store.select(ConferencesSelectors.selectAttendeeConferences);
  form = this.fb.group({
    domain: [
      null,
      {
        validators: Validators.required,
      },
    ],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private store: Store<CoreState>,
    private layoutActionsService: LayoutActionsService
  ) {}

  ngOnInit(): void {
    this.layoutActionsService.back$
      .pipe(
        tap((_) => void this.router.navigate(['../'])),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  submit() {
    if (this.form.valid) {
      this.store.dispatch(conferenceJoinAttempted({ letsChatWithUrl: this.form.value.domain }));
    }
  }
}

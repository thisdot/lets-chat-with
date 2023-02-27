import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@conf-match/shared';
import { delay, filter, take } from 'rxjs/operators';
import { JoinConferenceModalComponent } from './join-conference-modal/join-conference-modal.component';

import { Conference, ConferencesActions, ConferencesSelectors } from '@conf-match/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'cm-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss'],
})
export class ConferencesComponent {
  readonly conferences$ = this._store
    .select(ConferencesSelectors.selectAttendeeConferences)
    .pipe(delay(3000));
  readonly conferencesLoaded$ = this._store.select(
    ConferencesSelectors.selectAttendeeConferencesLoaded
  );
  stack: any[] = [];

  constructor(
    private _modalService: ModalService,
    private _router: Router,
    private _store: Store<any>
  ) {
    this._store.dispatch(ConferencesActions.conferencesLoadAttempted());
  }

  openModal(): void {
    const modal = this._modalService.openDockedModal<any, any>(
      JoinConferenceModalComponent,
      undefined,
      {
        closeButton: false,
      }
    );
    modal.onClose
      .pipe(
        take(1),
        filter((e) => e?.type === 'success' && e?.page)
      )
      .subscribe((e) => {
        switch (e.page) {
          case 'URLForm':
            // TODO: should this be a route change?
            this._router.navigate(['conferences/domain']);
            break;

          case 'QRScan':
            // TODO: should this be a route change?
            this._router.navigate(['conferences/qr-scan']);
            break;

          default:
            break;
        }
      });
  }

  selectConference(e: KeyboardEvent | MouseEvent, conferenceId: string): void {
    e.preventDefault();

    this._router.navigate(['/conferences', conferenceId, 'connect']);
  }

  trackById(index: number, item: Conference) {
    return item.id;
  }
}

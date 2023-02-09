import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { userTermsAcceptAttempted } from '@conf-match/core';

interface Term {
  title: string;
  text: string;
  icon: string;
}

@Component({
  selector: 'cm-terms',
  templateUrl: './application-terms.component.html',
  styleUrls: ['./application-terms.component.scss'],
})
export class ApplicationTermsComponent {
  constructor(private _store: Store) {}

  readonly terms: Term[] = [
    { title: 'empathyTitle', text: 'empathyText', icon: 'Flash' },
    { title: 'empathyTitle', text: 'empathyText', icon: 'SettingsWheel' },
    { title: 'empathyTitle', text: 'empathyText', icon: 'Info' },
    { title: 'empathyTitle', text: 'empathyText', icon: 'WavingHand' },
  ];

  onAgree() {
    this._store.dispatch(userTermsAcceptAttempted());
  }
}

import { Component, HostBinding } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectConferenceId } from '@conf-match/core';
import { map } from 'rxjs/operators';

export interface MainNavLink {
  label: string;
  iconName: string;
  to: string;
}

@Component({
  selector: 'cm-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent {
  public links$: Observable<Array<MainNavLink>> = this.store.pipe(
    select(selectConferenceId),
    map((conferenceId) => {
      return [
        {
          label: 'Connect',
          iconName: 'SearchFilled',
          to: `/conferences/${conferenceId}/connect`,
        },
        {
          label: 'Chatters',
          iconName: 'FlashFilled',
          to: `/conferences/${conferenceId}/chatters`,
        },
        {
          label: 'Messages',
          iconName: 'MessageBubbleTypingFilled',
          to: `/conferences/${conferenceId}/messages`,
        },
        {
          label: 'Profile',
          iconName: 'PersonFilled',
          to: `/conferences/${conferenceId}/profile`,
        },
      ];
    })
  );

  @HostBinding('class.cm-main-nav')
  get defaultClass() {
    return true;
  }

  constructor(private store: Store<any>) {}
}

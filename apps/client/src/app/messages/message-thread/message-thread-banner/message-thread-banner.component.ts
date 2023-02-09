import { Component, Input } from '@angular/core';
import {
  Attendee,
  MatchAttendee,
  mapAttendeeToAttendeeModel,
  InterestModel,
  IdentifierModel,
} from '@conf-match/api';
import { MessagesSelectors } from '@conf-match/client/conference/messages/data-access';
import { selectAttendee } from '@conf-match/core';
import { Store } from '@ngrx/store';
import { formatDistance } from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cm-message-thread-banner',
  templateUrl: './message-thread-banner.component.html',
  styleUrls: ['./message-thread-banner.component.scss'],
})
export class MessageThreadBannerComponent {
  matchedSince$: Observable<string>;
  chatThread$: Observable<string>;
  attendee$: Observable<Attendee>;
  interests$: Observable<InterestModel[]>;
  identifiers$: Observable<IdentifierModel[]>;

  @Input()
  public matchAttendee?: MatchAttendee;

  constructor(private store: Store<any>) {
    this.matchedSince$ = this.store
      .select(MessagesSelectors.selectMatchedSince)
      .pipe(map(this.getMatchStartDate));

    this.interests$ = this.store.select(MessagesSelectors.selectChatThreadInterests);
    this.identifiers$ = this.store.select(MessagesSelectors.selectChatThreadIdentifiers);

    this.attendee$ = this.store.select(selectAttendee).pipe(map(mapAttendeeToAttendeeModel));
  }

  getMatchStartDate(matchedSince: string): string {
    return formatDistance(new Date(matchedSince), new Date(), { addSuffix: true });
  }
}

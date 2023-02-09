import { Component } from '@angular/core';
import { mapAttendeeToAttendeeModel } from '@conf-match/api';
import { map } from 'rxjs/operators';
import { MatchProfileService } from './match-profile.service';

@Component({
  selector: 'cm-match-profile',
  templateUrl: './match-profile.component.html',
  styleUrls: ['./match-profile.component.scss'],
  providers: [MatchProfileService],
})
export class MatchProfileComponent {
  attendee$ = this.matchProfileService.attendee$.pipe(map(mapAttendeeToAttendeeModel));

  constructor(private matchProfileService: MatchProfileService) {}

  onChat() {
    this.matchProfileService.chatWith();
  }
}

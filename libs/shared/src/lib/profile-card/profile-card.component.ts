import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Attendee } from '@conf-match/api';
import { getSocialLink } from '@conf-match/utilities';
import { map, Subject, takeUntil } from 'rxjs';
import { CmBreakpoints } from '../breakpoint/breakpoint.types';

const SOCIALS_DEFAULT = {
  linkedin: {},
  twitter: {},
  facebook: {},
};

@Component({
  selector: 'cm-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent implements OnInit {
  socials = SOCIALS_DEFAULT;
  isMobile: boolean = false;
  private readonly destroy$ = new Subject<void>();

  @Input()
  attendee?: Attendee;

  @Input()
  canEdit = false;

  @Input()
  showOwnIdentifiers = true;

  @Input()
  showSocials = true;

  @Output()
  readonly edit = new EventEmitter<void>();

  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe(CmBreakpoints.MD.DOWN)
      .pipe(
        takeUntil(this.destroy$),
        map((x) => x?.matches)
      )
      .subscribe((x) => {
        this.isMobile = x;
      });
  }

  ngOnInit() {
    const { linkedin, twitter, facebook } = this.attendee!;
    const socials = { linkedin, twitter, facebook };

    this.showSocials = Object.values(socials).some((x) => !!x);
    this.socials = Object.keys(socials).reduce((a, profileName) => {
      const username = socials[profileName];
      if (!username) {
        return a;
      }
      const sanitizedURL = getSocialLink(profileName, username, this.isMobile);

      return {
        ...a,
        [profileName]: {
          socialURL: sanitizedURL,
          username,
        },
      };
    }, SOCIALS_DEFAULT);
  }
}

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
import { getSocialProfile } from '@conf-match/utilities';
import { map, Subject, takeUntil } from 'rxjs';
import { CmBreakpoints } from '../breakpoint/breakpoint.types';

@Component({
  selector: 'cm-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent implements OnInit {
  socials = {
    linkedin: {},
    twitter: {},
    facebook: {},
  };
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
    this.showSocials = !!linkedin || !!twitter || !!facebook;
    this.socials = [linkedin, twitter, facebook].reduce(
      (a, socialURL) => {
        if (!socialURL) {
          return a;
        }
        const { profileName, sanitizedURL, username } = getSocialProfile(socialURL, this.isMobile);

        return {
          ...a,
          [profileName]: {
            socialURL: sanitizedURL,
            username,
          },
        };
      },
      {
        linkedin: {},
        twitter: {},
        facebook: {},
      }
    );
  }
}

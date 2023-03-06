import { BreakpointObserver } from '@angular/cdk/layout';
import {
  AfterContentInit,
  Component,
  ContentChild,
  HostBinding,
  Input,
  Renderer2,
} from '@angular/core';
import { InputDirective } from '@conf-match/client/shared/ui-input';
import { IconName } from '@conf-match/shared/ui-icons';
import { getSocialProfile } from '@conf-match/utilities';
import { map, Subject, takeUntil } from 'rxjs';
import { CmBreakpoints } from '../breakpoint/breakpoint.types';

type SocialPlatform = 'linkedin' | 'fb' | 'twitter';

const IconMap: { [key in SocialPlatform]: IconName } = {
  linkedin: 'SocialLinkedIn',
  fb: 'SocialFacebook',
  twitter: 'SocialTwitter',
};

@Component({
  selector: 'cm-social-input-wrapper',
  templateUrl: './social-input-wrapper.component.html',
  styleUrls: ['./social-input-wrapper.component.scss'],
})
export class SocialInputWrapperComponent implements AfterContentInit {
  isMobile: boolean = false;
  private readonly destroy$ = new Subject<void>();

  @Input() platform?: SocialPlatform;
  @ContentChild(InputDirective) input?: InputDirective;

  constructor(private breakpointObserver: BreakpointObserver, private _renderer: Renderer2) {
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

  @HostBinding('class.cm-social-input-wrapper')
  get defaultClass() {
    return true;
  }

  get iconName(): IconName | null {
    return this.platform ? IconMap[this.platform] : null;
  }

  ngAfterContentInit() {
    if (!this.input) {
      throw new Error('Expected an InputDirective');
    }

    this._renderer.addClass(this.input.nativeElement, 'cm-social-input-wrapper__input');

    this._renderer.listen(this.input.nativeElement, 'input', (e: Event) => {
      const el = e.target as HTMLInputElement;
      const { sanitizedURL } = getSocialProfile(el.value, this.isMobile);
      el.value = sanitizedURL;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

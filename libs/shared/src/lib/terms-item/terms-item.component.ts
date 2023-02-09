import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cm-terms-item',
  templateUrl: './terms-item.component.html',
  styleUrls: ['./terms-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsItemComponent {
  @Input()
  title?: string;

  @Input()
  text?: string;

  @Input()
  icon?: string;

  @HostBinding('class.cm-terms')
  get isTerms() {
    return true;
  }
}

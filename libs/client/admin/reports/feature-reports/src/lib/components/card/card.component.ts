import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cm-card',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {}

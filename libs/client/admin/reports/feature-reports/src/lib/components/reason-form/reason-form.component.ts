import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cm-reason-form',
  templateUrl: './reason-form.component.html',
  styleUrls: ['./reason-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReasonFormComponent {
  @Input()
  placeholder = '';

  reason = '';

  @Output()
  submission = new EventEmitter<string>();
}

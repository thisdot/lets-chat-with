import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cm-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalHeaderComponent {
  @Output()
  back = new EventEmitter();

  @Output()
  cancel = new EventEmitter();

  @Input()
  showBack = false;

  @Input()
  title?: string;
}

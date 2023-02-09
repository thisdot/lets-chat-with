import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'cm-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
  @Input() count = 0;
  @Input() total = 0;

  @HostBinding('class.cm-counter--bg')
  @Input()
  background = true;

  @HostBinding('class.cm-counter')
  get defaultClass() {
    return true;
  }

  @HostBinding('class.cm-counter--zero-reached')
  get isZeroCountReached() {
    return this.count === 0;
  }
}

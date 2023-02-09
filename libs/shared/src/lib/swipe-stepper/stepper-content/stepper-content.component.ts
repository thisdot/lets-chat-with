import { Component, Input, HostBinding, ElementRef, ChangeDetectionStrategy } from '@angular/core';

export enum ContentPosition {
  Focused,
  Left,
  Right,
  Hidden,
}

@Component({
  selector: 'cm-stepper-content',
  template: '<ng-content></ng-content>',
  styleUrls: ['./stepper-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperContentComponent {
  @Input() position?: ContentPosition;

  constructor(public ref: ElementRef) {}

  @HostBinding('class.cm-stepper-content')
  get defaultClass() {
    return true;
  }

  @HostBinding('class.cm-stepper-content--focused')
  get isFocused() {
    return this.position === ContentPosition.Focused;
  }

  @HostBinding('class.cm-stepper-content--left')
  get isLeft() {
    return this.position === ContentPosition.Left;
  }

  @HostBinding('class.cm-stepper-content--right')
  get isRight() {
    return this.position === ContentPosition.Right;
  }

  @HostBinding('class.cm-stepper-content--hidden')
  get isHidden() {
    return this.position === ContentPosition.Hidden;
  }
}

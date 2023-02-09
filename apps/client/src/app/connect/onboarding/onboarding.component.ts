import { Component, ViewChild, HostBinding } from '@angular/core';
import { SwipeStepperComponent, ModalController } from '@conf-match/shared';

@Component({
  selector: 'cm-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent {
  @ViewChild(SwipeStepperComponent) stepper: SwipeStepperComponent;

  constructor(private _ctrl: ModalController<void>) {}

  @HostBinding('class.cm-onboarding')
  get defaultClass() {
    return true;
  }

  onActionButtonClick() {
    if (this.stepper.focusedIdx > 0) {
      this._ctrl.close();
    } else {
      this.stepper.swipeLeft();
    }
  }
}

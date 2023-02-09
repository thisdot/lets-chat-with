import { Component, Input } from '@angular/core';
import { storiesOf } from '@storybook/angular';
import { ThemeService } from '@conf-match/shared/theme';

import { SwipeStepperComponent } from './swipe-stepper.component';
import { StepperContentComponent } from './stepper-content/stepper-content.component';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';

@Component({
  selector: 'cm-content-test',
  template: `
    <div [style.background]="bg">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        font-size: 80px;
        font-family: sans-serif;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
      }
    `,
  ],
})
export class ContentComponent {
  @Input() bg: string;
}

const moduleMetadata = {
  declarations: [ContentComponent, SwipeStepperComponent, StepperContentComponent],
  imports: [SharedStorybookHelpersModule],
  providers: [ThemeService],
};

storiesOf('Shared/SwipeStepper', module).add('Primary (default)', () => ({
  moduleMetadata,
  template: `
      <cm-theme>
        <cm-swipe-stepper>
          <cm-stepper-content>
            <cm-content-test bg="red">1</cm-content-test>
          </cm-stepper-content>
          <cm-stepper-content>
            <cm-content-test bg="blue">2</cm-content-test>
          </cm-stepper-content>
          <cm-stepper-content>
            <cm-content-test bg="green">3</cm-content-test>
          </cm-stepper-content>
          <cm-stepper-content>
            <cm-content-test bg="cyan">4</cm-content-test>
          </cm-stepper-content>
          <cm-stepper-content>
            <cm-content-test bg="magenta">5</cm-content-test>
          </cm-stepper-content>
          <cm-stepper-content>
            <cm-content-test bg="orange">6</cm-content-test>
          </cm-stepper-content>
        </cm-swipe-stepper>
      </cm-theme>
    `,
  styles: [
    `
      :host {
        display: block;
        width: 300px;
        height: 600px;
      }
    `,
  ],
}));

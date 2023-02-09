import { Component } from '@angular/core';

const Routes = ['./terms', './verify'];

@Component({
  selector: 'cm-signup-wizard-component',
  templateUrl: './signup-wizard.component.html',
})
export class SignupWizardComponent {
  routes = Routes;
}

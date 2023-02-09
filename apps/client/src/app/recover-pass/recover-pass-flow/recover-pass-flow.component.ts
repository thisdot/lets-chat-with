import { Component } from '@angular/core';
import { Location } from '@angular/common';

export const Routes = ['./recover-pass/email', './recover-pass/code', './recover-pass/new-pass'];

@Component({
  selector: 'cm-recover-pass-flow',
  templateUrl: './recover-pass-flow.component.html',
  styleUrls: ['./recover-pass-flow.component.scss'],
})
export class RecoverPassFlowComponent {
  routes = Routes;

  constructor(public location: Location) {}
}

import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'cm-landing-view',
  templateUrl: './landing-view.component.html',
  styleUrls: ['./landing-view.component.scss'],
})
export class LandingViewComponent {
  @HostBinding('class.cm-landing-view')
  get defaultClass() {
    return true;
  }
}

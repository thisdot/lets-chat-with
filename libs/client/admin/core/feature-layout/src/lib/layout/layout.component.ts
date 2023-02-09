import { Component } from '@angular/core';
import { RouteTag } from '@conf-match/shared/route-tags';

@Component({
  selector: 'cm-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  readonly RouteTag = RouteTag;
}

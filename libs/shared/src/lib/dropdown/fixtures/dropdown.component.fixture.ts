import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DropdownComponent } from '../dropdown.component';

@Component({
  selector: `cm-dropdown-fixture`,
  template: `
    <cm-dropdown showCaret>
      <cm-dropdown-toggle *ngIf="hasToggler$ | async">Button</cm-dropdown-toggle>
      <cm-dropdown-menu class="pull-right">
        <ul>
          <li><a>...</a></li>
        </ul>
      </cm-dropdown-menu>
    </cm-dropdown>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponentFixture {
  @ViewChild(DropdownComponent, { static: false })
  readonly dropdown: DropdownComponent;

  readonly hasToggler$ = new BehaviorSubject(true);
}

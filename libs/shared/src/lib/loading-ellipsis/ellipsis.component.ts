import { Component, Input } from '@angular/core';

@Component({
  selector: 'cm-ellipsis',
  template: `
    <div class="cm-ellipsis" [style.width.px]="size" [style.height.px]="size">
      <div class="cm-ellipsis__part"></div>
      <div class="cm-ellipsis__part"></div>
      <div class="cm-ellipsis__part"></div>
      <div class="cm-ellipsis__part"></div>
    </div>
  `,
  styleUrls: ['./ellipsis.component.scss'],
})
export class EllipsisComponent {
  @Input()
  size = 100;
}

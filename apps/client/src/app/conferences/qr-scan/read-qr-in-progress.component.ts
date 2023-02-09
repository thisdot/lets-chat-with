import { Component } from '@angular/core';

@Component({
  selector: 'cm-read-qr-in-progress',
  template: ` <cm-ellipsis></cm-ellipsis> `,
  styles: [
    `
      :host {
        display: flex;
        width: 100%;
        height: 100%;
      }

      cm-ellipsis {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class ReadQrInProgressComponent {}

import { Component } from '@angular/core';

@Component({
  selector: 'cm-app',
  templateUrl: './app.component.html',
  styles: [
    `
      :host {
        width: 100vw;
        height: 100vh;
      }
    `,
  ],
})
export class AppComponent {}

import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ThemeService } from '@conf-match/shared/theme';

@Component({
  selector: 'cm-theme',
  template: ` <ng-content></ng-content> `,
})
export class ThemeComponent {
  constructor(@Inject(DOCUMENT) document, theme: ThemeService) {
    theme.init();

    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css?family=Lato:400,700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'cm-empty-indicator',
  template: `
    <div class="empty-indicator" *transloco="let t; read: 'reports'">
      <img src="/assets/reports-empty.svg" [alt]="t('cactus')" />
      <h3 class="empty-indicator__title">{{ title }}</h3>
      <p class="empty-indicator__subtitle">{{ subtitle }}</p>
    </div>
  `,
  styleUrls: ['./empty-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyIndicatorComponent {
  @Input()
  title = '';

  @Input()
  subtitle = '';
}

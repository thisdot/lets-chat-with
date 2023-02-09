import { Component } from '@angular/core';
import { storiesOf } from '@storybook/angular';
import { ThemeService } from '@conf-match/shared/theme';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { SharedStorybookHelpersModule } from '@conf-match/shared/storybook-helpers';
import { NotificationService } from './notification.service';
import { NotificationType } from './utils';
import { NotificationComponent } from './notification.component';

@Component({
  selector: 'cm-notification-creator',
  template: `
    <form [formGroup]="form" (ngSubmit)="create(form.value)">
      <p>Title*: <input formControlName="title" placeholder="(required)" /></p>
      <p>Message: <input formControlName="message" placeholder="(optional)" /></p>
      <p>
        Type:
        <select formControlName="type">
          <option value="" disabled selected>(optional)</option>
          <option [value]="NotificationType.Success">Success</option>
        </select>
      </p>
      <p>
        TTL:
        <input formControlName="ttl" placeholder="(zero for infinite; in MS)" />
      </p>
      <p>
        <button [disabled]="form.invalid">Create</button>
      </p>
    </form>
  `,
  styles: [
    `
      :host {
        position: fixed;
        right: 15px;
        bottom: 15px;
        background-color: white;
        padding: 15px;
        z-index: 9999999;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        font-family: sans-serif;
      }

      p {
        margin-bottom: 10px;
        overflow: hidden;
      }

      input,
      select {
        float: right;
        margin-left: 15px;
        width: 150px;
      }
    `,
  ],
})
class NotificationCreator {
  NotificationType = NotificationType;
  form: FormGroup;

  constructor(private _nService: NotificationService, builder: FormBuilder) {
    this.form = builder.group({
      title: ['', Validators.required],
      message: null,
      type: null,
      ttl: null,
    });
  }

  create(vals: any) {
    vals.ttl = parseInt(vals.ttl, 10);
    this._nService.createNotification(vals);
  }
}

const moduleMetadata = {
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedStorybookHelpersModule,
    PortalModule,
    OverlayModule,
    SharedUiIconsModule,
  ],
  declarations: [NotificationComponent, NotificationCreator],
  providers: [ThemeService],
  entryComponents: [NotificationComponent],
};

storiesOf('Shared/Notification', module).add('Default', () => ({
  moduleMetadata,
  template: `
      <cm-theme>
        <cm-notification-creator></cm-notification-creator>
      </cm-theme>
    `,
}));

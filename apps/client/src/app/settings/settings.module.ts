import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientSharedUiPasswordWrapperModule } from '@conf-match/client/shared/ui-password-wrapper';
import { TranslocoModule } from '@ngneat/transloco';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { EmailComponent } from './email/email.component';
import { PasswordComponent } from './password/password.component';
import { HelpComponent } from './help/help.component';
import { HouseRulesComponent } from './house-rules/house-rules.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SharedModule as CmSharedModule } from '@conf-match/shared';
import { SharedModule as AppSharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SettingsWrapperComponent } from './settings-wrapper.component';
import { EffectsModule } from '@ngrx/effects';
import { SettingsEffects } from './state/settings.effects';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { ClientSharedUiInputModule } from '@conf-match/client/shared/ui-input';

@NgModule({
  declarations: [
    SettingsComponent,
    EmailComponent,
    PasswordComponent,
    HelpComponent,
    HouseRulesComponent,
    NotificationsComponent,
    SettingsWrapperComponent,
  ],
  imports: [
    CommonModule,
    SharedUiButtonsModule,
    SharedUiIconsModule,
    ClientSharedUiPasswordWrapperModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([SettingsEffects]),
    CmSharedModule,
    AppSharedModule,
    TranslocoModule,
    ClientSharedUiInputModule,
  ],
})
export class SettingsModule {}

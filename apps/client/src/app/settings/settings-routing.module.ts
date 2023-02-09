import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailComponent } from './email/email.component';
import { HelpComponent } from './help/help.component';
import { HouseRulesComponent } from './house-rules/house-rules.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PasswordComponent } from './password/password.component';
import { SettingsWrapperComponent } from './settings-wrapper.component';
import { SettingsGuard } from './settings/settings.guard';

import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsWrapperComponent,
    children: [
      { path: '', component: SettingsComponent, canActivate: [SettingsGuard] },
      { path: 'email', component: EmailComponent },
      { path: 'password', component: PasswordComponent },
      { path: 'help', component: HelpComponent },
      { path: 'house-rules', component: HouseRulesComponent },
      { path: 'notifications', component: NotificationsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}

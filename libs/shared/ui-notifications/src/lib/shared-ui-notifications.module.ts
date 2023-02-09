import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';

@NgModule({
  imports: [CommonModule, SharedUiIconsModule],
  declarations: [NotificationComponent],
  exports: [NotificationComponent],
})
export class SharedUiNotificationsModule {}

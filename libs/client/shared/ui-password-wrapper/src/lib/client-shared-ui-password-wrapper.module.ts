import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordWrapperComponent } from './password-wrapper/password-wrapper.component';
import { ClientSharedUiInputModule } from '@conf-match/client/shared/ui-input';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';

@NgModule({
  imports: [CommonModule, ClientSharedUiInputModule, TranslocoModule, SharedUiIconsModule],
  declarations: [PasswordWrapperComponent],
  exports: [PasswordWrapperComponent],
})
export class ClientSharedUiPasswordWrapperModule {}

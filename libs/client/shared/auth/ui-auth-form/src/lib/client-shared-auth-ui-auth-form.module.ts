import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientSharedUiTextFieldWrapperModule } from '@conf-match/client/shared/ui-text-field-wrapper';
import { ClientSharedUiPasswordWrapperModule } from '@conf-match/client/shared/ui-password-wrapper';
import { TranslocoModule } from '@ngneat/transloco';
import { ClientSharedUiInputModule } from '@conf-match/client/shared/ui-input';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientSharedUiTextFieldWrapperModule,
    ClientSharedUiPasswordWrapperModule,
    TranslocoModule,
    ClientSharedUiInputModule,
    SharedUiButtonsModule,
  ],
  declarations: [AuthFormComponent],
  exports: [AuthFormComponent],
})
export class ClientSharedAuthUiAuthFormModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialAuthButtonsComponent } from './social-auth-buttons/social-auth-buttons.component';
import { SharedModule as CmSharedModule } from '@conf-match/shared';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';

@NgModule({
  imports: [CommonModule, CmSharedModule, SharedUiIconsModule],
  declarations: [SocialAuthButtonsComponent],
  exports: [SocialAuthButtonsComponent],
})
export class SharedUiAuthModule {}

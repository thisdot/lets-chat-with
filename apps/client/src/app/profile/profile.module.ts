import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule as CmSharedModule } from '@conf-match/shared';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { TranslocoModule } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { RouteTag } from '@conf-match/shared/route-tags';
import { SharedModule as AppSharedModule } from './../shared/shared.module';
import { EditConnectionsComponent } from './edit-connections/edit-connections.component';
import { EditInterestsComponent } from './edit-interests/edit-interests.component';
import { EditWhoIAmComponent } from './edit-who-i-am/edit-who-i-am.component';

import { ProfileComponent } from './profile.component';
import { ProfileEffects } from './state/profile.effects';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SharedDataAccessFileUploadModule } from '@conf-match/shared/data-access-file-upload';
import { ClientSharedUiInputModule } from '@conf-match/client/shared/ui-input';
import { ClientSharedUiTextFieldWrapperModule } from '@conf-match/client/shared/ui-text-field-wrapper';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent,
        data: {
          routeTags: [RouteTag.settings, RouteTag.conference, RouteTag.share],
          cmRouteColor: 'primary',
        },
      },
      {
        path: 'edit',
        component: EditProfileComponent,
        data: {
          routeTags: [RouteTag.settings, RouteTag.conference, RouteTag.share],
        },
      },
    ]),
    CmSharedModule,
    SharedUiIconsModule,
    SharedUiButtonsModule,
    ClientSharedUiTextFieldWrapperModule,
    AppSharedModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([ProfileEffects]),
    TranslocoModule,
    SharedDataAccessFileUploadModule,
    ClientSharedUiInputModule,
  ],
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    EditConnectionsComponent,
    EditInterestsComponent,
    EditWhoIAmComponent,
  ],
})
export class ProfileModule {}

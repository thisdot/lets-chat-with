import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { MessageThreadListComponent } from './message-thread-list/message-thread-list.component';
import { SharedModule as CmSharedModule } from '@conf-match/shared';
import { SharedModule as AppSharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MessageThreadComponent } from './message-thread/message-thread.component';
import { MessageListItemComponent } from './message-thread/message-list/message-list-item/message-list-item.component';
import { MessageBoxComponent } from './message-thread/message-box/message-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MessageListComponent } from './message-thread/message-list/message-list.component';
import { MessageThreadListItemComponent } from './message-thread-list/message-thread-list-item/message-thread-list-item.component';
import { MessageThreadBannerComponent } from './message-thread/message-thread-banner/message-thread-banner.component';

import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { MessageRoutingModule } from './messages-routing.module';
import { MessageAvatarComponent } from './message-thread/message-avatar/message-avatar.component';
import { ClientSharedUiInputModule } from '@conf-match/client/shared/ui-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MessageRoutingModule,

    CmSharedModule,
    AppSharedModule,
    SharedUiButtonsModule,
    ScrollingModule,
    SharedUiIconsModule,
    TranslocoModule,
    ClientSharedUiInputModule,
  ],
  declarations: [
    MessageThreadListComponent,
    MessageThreadListItemComponent,
    MessageThreadComponent,
    MessageListComponent,
    MessageListItemComponent,
    MessageBoxComponent,
    MessageAvatarComponent,
    MessageThreadBannerComponent,
  ],
})
export class MessagesModule {}

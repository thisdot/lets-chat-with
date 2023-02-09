import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferenceRoutingModule } from './conference-routing.module';
import { ConferenceComponent } from './conference.component';
import { ClientConferenceMessagesDataAccessModule } from '@conf-match/client/conference/messages/data-access';
import { ClientConferenceMatchesDataAccessModule } from '@conf-match/client/conference/matches/data-access';

@NgModule({
  declarations: [ConferenceComponent],
  imports: [
    CommonModule,
    ConferenceRoutingModule,
    ClientConferenceMessagesDataAccessModule,
    ClientConferenceMatchesDataAccessModule,
  ],
})
export class ConferenceModule {}

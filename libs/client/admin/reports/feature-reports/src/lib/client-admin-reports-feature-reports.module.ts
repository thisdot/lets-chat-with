import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './components/reports/reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsListComponent } from './components/reports-list/reports-list.component';
import { ReportsListItemComponent } from './components/reports-list-item/reports-list-item.component';
import { CardComponent } from './components/card/card.component';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { EmptyIndicatorComponent } from './components/empty-indicator/empty-indicator.component';
import { BanReasonSelectorComponent } from './components/ban-reason-selector/ban-reason-selector.component';
import { ReasonFormComponent } from './components/reason-form/reason-form.component';
import { ClientSharedUiTextFieldWrapperModule } from '@conf-match/client/shared/ui-text-field-wrapper';
import { SharedModule } from '@conf-match/shared';
import { TranslocoModule } from '@ngneat/transloco';
import { BanAttendeeModalComponent } from './components/ban-attendee-modal/ban-attendee-modal.component';
import { Subject } from 'rxjs';
import { BanAttendee, DismissAttendee } from './interfaces/reports.interfaces';
import { FormsModule } from '@angular/forms';
import { BAN_SUBJECT_TOKEN, DISMISS_SUBJECT_TOKEN } from './tokens/injection.tokens';
import { ModalHeaderComponent } from './components/modal-header/modal-header.component';
import { DismissAttendeeModalComponent } from './components/dismiss-attendee-modal/dismiss-attendee-modal.component';
import { ViewAttendeeModalComponent } from './components/view-attendee-modal/view-attendee-modal.component';
import { ReportsMenuComponent } from './components/reports-menu/reports-menu.component';
import { ReportsHeaderComponent } from './components/reports-header.component';
import { RouteConfigModule } from '@this-dot/route-config';
import { ReportsDispatcherComponent } from './components/reports-dispatcher/reports-dispatcher.component';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedUiButtonsModule,
    SharedUiIconsModule,
    ClientSharedUiTextFieldWrapperModule,
    SharedModule,
    TranslocoModule,
    FormsModule,
    SharedModule,
    RouteConfigModule,
  ],
  declarations: [
    ReportsComponent,
    ReportsListComponent,
    ReportsListItemComponent,
    CardComponent,
    EmptyIndicatorComponent,
    BanReasonSelectorComponent,
    ReasonFormComponent,
    BanAttendeeModalComponent,
    ModalHeaderComponent,
    DismissAttendeeModalComponent,
    ViewAttendeeModalComponent,
    ReportsMenuComponent,
    ReportsHeaderComponent,
    ReportsDispatcherComponent,
  ],
  providers: [
    { provide: BAN_SUBJECT_TOKEN, useValue: new Subject<BanAttendee>() },
    { provide: DISMISS_SUBJECT_TOKEN, useValue: new Subject<DismissAttendee>() },
  ],
  exports: [ReportsDispatcherComponent],
})
export class ClientAdminReportsFeatureReportsModule {}

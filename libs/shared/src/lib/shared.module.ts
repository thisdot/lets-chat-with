import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { TranslocoModule } from '@ngneat/transloco';
import { ActionButtonComponent } from './action-button/action-button.component';
import { AttendeeCardComponent } from './attendee-card/attendee-card.component';
import { AvatarImageComponent } from './avatar-image/avatar-image.component';
import { BlankModalComponent } from './blank-modal/blank-modal.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ChipListComponent } from './chip-list/chip-list.component';
import { ChipComponent } from './chip/chip.component';
import { ConferenceCardComponent } from './conference-card/conference-card.component';
import { ConnectCardComponent } from './connect-card/connect-card.component';
import { ConnectionsSelectorComponent } from './connections-selector/connections-selector.component';
import { ContextMenuButtonComponent } from './context-menu-button/context-menu-button.component';
import { CounterComponent } from './counter/counter.component';
import { DockedModalComponent } from './docked-modal/docked-modal.component';
import { EventLogoComponent } from './event-logo/event-logo.component';
import { ExpandableComponent } from './expandable/expandable.component';
import { FloatingModalComponent } from './floating-modal/floating-modal.component';
import { HamburgerMenuModule } from './hamburger-menu/hamburger-menu.module';
import {
  InputAppendWrapperComponent,
  InputPrefixDirective,
  InputSuffixDirective,
} from './icon-input-wrapper/input-append-wrapper.component';
import { WhoIAmSelectorComponent } from './who-i-am-selector/who-i-am-selector.component';
import { InterestsSelectorComponent } from './interests-selector/interests-selector.component';
import { LandingViewComponent } from './landing-view/landing-view.component';
import { ListItemComponent } from './list-item/list-item.component';
import { EllipsisComponent } from './loading-ellipsis/ellipsis.component';
import { MatchCardComponent } from './match-card/match-card.component';
import { MaxNumberReachedComponent } from './max-number-reached/max-number-reached.component';
import { ModalService } from './modal.service';
import { PhotoPickerComponent } from './photo-picker/photo-picker.component';
import { PillComponent } from './pill/pill.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { SocialInputWrapperComponent } from './social-input-wrapper/social-input-wrapper.component';
import { StepperContentComponent } from './swipe-stepper/stepper-content/stepper-content.component';
import { SwipeStepperComponent } from './swipe-stepper/swipe-stepper.component';
import { SwitchComponent } from './switch/switch.component';
import { TermsItemComponent } from './terms-item/terms-item.component';
import { TextareaWrapperComponent } from './textarea-wrapper/textarea-wrapper.component';
import { TextareaDirective } from './textarea/textarea.directive';
import { SharedUiNotificationsModule } from '@conf-match/shared/ui-notifications';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { NewConnectionComponent } from './new-connection/new-connection.component';
import { ClientSharedUiInputModule } from '@conf-match/client/shared/ui-input';
import { ChattingReasonsCardComponent } from './chatting-reasons/chatting-reasons-card.component';
import { YouAreChattersCardComponent } from './you-are-chatters/you-are-chatters-card.component';
import { StringSeparatorPipe } from './pipes/string-separator.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PortalModule,
    OverlayModule,
    SharedUiButtonsModule,
    SharedUiIconsModule,
    SharedUiNotificationsModule,
    TranslocoModule,
    A11yModule,
    HttpClientModule,
    ClientSharedUiInputModule,
  ],
  declarations: [
    ActionButtonComponent,
    CheckboxComponent,
    PillComponent,
    SocialInputWrapperComponent,
    ChipComponent,
    ChipListComponent,
    PillComponent,
    EventLogoComponent,
    CounterComponent,
    LandingViewComponent,
    TermsItemComponent,
    TextareaWrapperComponent,
    TextareaDirective,
    DockedModalComponent,
    PhotoPickerComponent,
    ConnectCardComponent,
    ChipComponent,
    ReversePipe,
    FloatingModalComponent,
    ExpandableComponent,
    SearchInputComponent,
    SwipeStepperComponent,
    StepperContentComponent,
    MatchCardComponent,
    NewConnectionComponent,
    ProfileCardComponent,
    ContextMenuButtonComponent,
    ConferenceCardComponent,
    ListItemComponent,
    SwitchComponent,
    BlankModalComponent,
    InputAppendWrapperComponent,
    InputPrefixDirective,
    InputSuffixDirective,
    ConnectionsSelectorComponent,
    WhoIAmSelectorComponent,
    InterestsSelectorComponent,
    MaxNumberReachedComponent,
    AvatarImageComponent,
    AttendeeCardComponent,
    EllipsisComponent,
    SpinnerComponent,
    ChattingReasonsCardComponent,
    YouAreChattersCardComponent,
    StringSeparatorPipe,
  ],
  exports: [
    ActionButtonComponent,
    CheckboxComponent,
    PillComponent,
    SocialInputWrapperComponent,
    ChipComponent,
    ChipListComponent,
    PillComponent,
    EventLogoComponent,
    CounterComponent,
    LandingViewComponent,
    TermsItemComponent,
    TextareaWrapperComponent,
    TextareaDirective,
    DockedModalComponent,
    FloatingModalComponent,
    PhotoPickerComponent,
    ConnectCardComponent,
    ChipComponent,
    ReversePipe,
    ExpandableComponent,
    SearchInputComponent,
    SwipeStepperComponent,
    StepperContentComponent,
    MatchCardComponent,
    NewConnectionComponent,
    ProfileCardComponent,
    ContextMenuButtonComponent,
    ConferenceCardComponent,
    ListItemComponent,
    SwitchComponent,
    InputAppendWrapperComponent,
    InputPrefixDirective,
    InputSuffixDirective,
    ConnectionsSelectorComponent,
    WhoIAmSelectorComponent,
    InterestsSelectorComponent,
    AvatarImageComponent,
    AttendeeCardComponent,
    EllipsisComponent,
    SpinnerComponent,
    HamburgerMenuModule,
    ChattingReasonsCardComponent,
    YouAreChattersCardComponent,
    StringSeparatorPipe,
  ],
  providers: [ModalService],
})
export class SharedModule {}

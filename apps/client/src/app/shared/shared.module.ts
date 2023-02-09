import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DropdownModule, SharedModule as CmSharedModule } from '@conf-match/shared';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { TranslocoModule } from '@ngneat/transloco';
import { ConferenceSwitcherItemComponent } from './conference-switcher/conference-switcher-item/conference-switcher-item.component';
import { ConferenceSwitcherSelectedElementComponent } from './conference-switcher/conference-switcher-selected-element/conference-switcher-selected-element.component';
import { ConferenceSwitcherComponent } from './conference-switcher/conference-switcher.component';
import { DockerConferenceSwitcherComponent } from './conference-switcher/docked-conference-switcher/docked-conference-switcher.component';
import { ConnectionActionMenuComponent } from './connection-action-menu/connection-action-menu.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { NoResultsComponent } from './no-results/no-results.component';
import { PurpleShapeComponent } from './purple-shape/purple-shape.component';
import { SecurityCodeFormComponent } from './security-code-form/security-code-form.component';
import { SecurityCodeInputComponent } from './security-code-form/security-code-input/security-code-input.component';
import { TopNavConferenceLogoComponent } from './top-nav-conference-logo/top-nav-conference-logo.component';
import { VisitedGuard, WizardComponent, WizardVisitedService } from './wizard';
import { SanitizerPipe } from './sanitizer.pipe';
import { ClientSharedUiInputModule } from '@conf-match/client/shared/ui-input';

@NgModule({
  declarations: [
    ConnectionActionMenuComponent,
    WizardComponent,
    MainNavComponent,
    SecurityCodeInputComponent,
    ConferenceSwitcherComponent,
    ConferenceSwitcherItemComponent,
    DockerConferenceSwitcherComponent,
    ConferenceSwitcherSelectedElementComponent,
    SecurityCodeFormComponent,
    PurpleShapeComponent,
    NoResultsComponent,
    SanitizerPipe,
    TopNavConferenceLogoComponent,
  ],
  imports: [
    TranslocoModule,
    CommonModule,
    CmSharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedUiIconsModule,
    SharedUiButtonsModule,
    ClientSharedUiInputModule,
    TranslocoModule,
    DropdownModule,
    A11yModule,
  ],
  exports: [
    ConnectionActionMenuComponent,
    WizardComponent,
    MainNavComponent,
    SecurityCodeFormComponent,
    SecurityCodeInputComponent,
    ConferenceSwitcherComponent,
    ConferenceSwitcherItemComponent,
    ConferenceSwitcherSelectedElementComponent,
    PurpleShapeComponent,
    NoResultsComponent,
    SanitizerPipe,
    TopNavConferenceLogoComponent,
  ],
  providers: [VisitedGuard, WizardVisitedService],
})
export class SharedModule {}

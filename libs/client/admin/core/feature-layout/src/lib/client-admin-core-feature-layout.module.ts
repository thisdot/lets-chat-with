import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { TopNavComponent } from './layout/top-nav/top-nav.component';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { RouteConfigModule } from '@this-dot/route-config';
import { DropdownModule, HamburgerMenuModule, SharedModule } from '@conf-match/shared';
import { ConferenceSwitcherComponent } from './layout/top-nav/conference-switcher/conference-switcher.component';
import { ConferenceSwitcherItemComponent } from './layout/top-nav/conference-switcher/conference-switcher-item/conference-switcher-item.component';
import { ConferenceSwitcherSelectedElementComponent } from './layout/top-nav/conference-switcher/conference-switcher-selected-element/conference-switcher-selected-element.component';
import { DockerConferenceSwitcherComponent } from './layout/top-nav/conference-switcher/docked-conference-switcher/docked-conference-switcher.component';

@NgModule({
  declarations: [
    LayoutComponent,
    TopNavComponent,
    ConferenceSwitcherComponent,
    ConferenceSwitcherItemComponent,
    ConferenceSwitcherSelectedElementComponent,
    DockerConferenceSwitcherComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedUiIconsModule,
    RouterModule,
    TranslocoModule,
    RouteConfigModule,
    HamburgerMenuModule,
    DropdownModule,
  ],
  exports: [
    LayoutComponent,
    TopNavComponent,
    ConferenceSwitcherComponent,
    ConferenceSwitcherItemComponent,
    ConferenceSwitcherSelectedElementComponent,
    DockerConferenceSwitcherComponent,
  ],
})
export class ClientAdminCoreFeatureLayoutModule {}

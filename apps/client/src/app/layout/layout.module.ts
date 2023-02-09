import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '../shared/shared.module';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { RouteConfigModule } from '@this-dot/route-config';
import { HamburgerMenuModule } from '@conf-match/shared';
import { TopNavComponent } from './top-nav/top-nav.component';

@NgModule({
  declarations: [LayoutComponent, TopNavComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedUiIconsModule,
    RouterModule,
    TranslocoModule,
    RouteConfigModule,
    HamburgerMenuModule,
  ],
  exports: [LayoutComponent, TopNavComponent],
})
export class LayoutModule {}

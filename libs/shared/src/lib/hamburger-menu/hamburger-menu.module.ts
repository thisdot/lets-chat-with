import { A11yModule } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { HamburgerMenuComponent } from './hamburger-menu.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { LayoutModule } from '@angular/cdk/layout';
import { HamburgerMenuItemModule } from './item/hamburger-menu-item.module';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';

@NgModule({
  declarations: [HamburgerMenuComponent],
  imports: [
    CommonModule,
    OverlayModule,
    LayoutModule,
    SharedUiIconsModule,
    SharedUiButtonsModule,
    A11yModule,
    TranslocoModule,
  ],
  exports: [HamburgerMenuComponent, HamburgerMenuItemModule],
})
export class HamburgerMenuModule {}

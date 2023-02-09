import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HamburgerMenuItemComponent } from './hamburger-menu-item.component';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';

@NgModule({
  declarations: [HamburgerMenuItemComponent],
  exports: [HamburgerMenuItemComponent],
  imports: [CommonModule, SharedUiIconsModule, RouterModule],
})
export class HamburgerMenuItemModule {}

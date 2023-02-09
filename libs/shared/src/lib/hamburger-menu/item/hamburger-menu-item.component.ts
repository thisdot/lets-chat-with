import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IconName } from '@conf-match/shared/ui-icons';
import { HamburgerMenuService } from '../hamburger-menu.service';

@Component({
  selector: 'cm-hamburger-menu-item',
  templateUrl: './hamburger-menu-item.component.html',
  styleUrls: ['./hamburger-menu-item.component.scss'],
})
export class HamburgerMenuItemComponent {
  @Input() iconName?: IconName;
  @Input() label?: string;
  @Input() routerLinkPath?: string;

  constructor(private hamburgerMenuService: HamburgerMenuService, private router: Router) {}

  onClick(): void {
    if (this.routerLinkPath) {
      this.router.navigate([this.routerLinkPath]).then(this.close.bind(this));
    } else {
      this.close();
    }
  }

  close(): void {
    this.hamburgerMenuService.closeMenu();
  }
}

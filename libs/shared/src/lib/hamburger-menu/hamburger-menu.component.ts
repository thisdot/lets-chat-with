import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RouteTag } from '@conf-match/shared/route-tags';
import { HamburgerMenuService } from './hamburger-menu.service';

@Component({
  selector: 'cm-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss'],
  providers: [HamburgerMenuService],
})
export class HamburgerMenuComponent implements AfterViewInit {
  readonly RouteTag = RouteTag;
  @ViewChild('template') menuTemplate!: TemplateRef<object>;
  @ViewChild('trigger') menuTrigger!: ElementRef;

  constructor(private hamburgerMenuService: HamburgerMenuService, private vcr: ViewContainerRef) {}

  ngAfterViewInit() {
    this.hamburgerMenuService.init(
      this.menuTrigger,
      new TemplatePortal(this.menuTemplate, this.vcr)
    );
  }

  @HostListener('click')
  @HostListener('keydown.enter')
  @HostListener('keydown.space')
  toggleOpen() {
    this.hamburgerMenuService.toggleOpen();
  }

  close() {
    this.hamburgerMenuService.closeMenu();
  }
}

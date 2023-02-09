import {
  Component,
  Input,
  ContentChild,
  OnDestroy,
  AfterContentInit,
  Renderer2,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  HostBinding,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { DropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  exportAs: 'dropdown',
  selector: 'cm-dropdown',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./dropdown.component.scss'],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    class: 'cm-dropdown',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DropdownComponent implements AfterContentInit, OnDestroy {
  private destroy$ = new Subject<void>();

  @HostBinding('class.open')
  @Input()
  get open() {
    return this._open;
  }
  set open(open: boolean) {
    this._open = coerceBooleanProperty(open);
  }

  @Input()
  get closeOnClick() {
    return this._closeOnClick;
  }
  set closeOnClick(closeOnClick: boolean) {
    this._closeOnClick = coerceBooleanProperty(closeOnClick);
  }

  @Input()
  get closeOnOutsideClick() {
    return this._closeOnOutsideClick;
  }
  set closeOnOutsideClick(closeOnOutsideClick: boolean) {
    this._closeOnOutsideClick = coerceBooleanProperty(closeOnOutsideClick);
  }

  @ContentChild(DropdownToggleDirective)
  readonly dropdownToggle?: DropdownToggleDirective;
  @ContentChild(DropdownMenuDirective)
  readonly dropdownMenu?: DropdownMenuDirective;

  private _documentListener?: () => void;
  private _open = false;
  private _closeOnClick = true;
  private _closeOnOutsideClick = true;

  constructor(private readonly renderer: Renderer2, private readonly cd: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    if (this.dropdownToggle) {
      this.dropdownToggle.toggle
        .pipe(takeUntil(this.destroy$))
        .subscribe((ev: Event) => this.onToggleClick(ev));
    }
  }

  ngOnDestroy(): void {
    if (this._documentListener) {
      this._documentListener();
    }

    if (this.destroy$) {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }

  onDocumentClick(e: Event): void {
    if (this.open && this.closeOnOutsideClick) {
      const isToggling = this.dropdownToggle?.element.contains(e.target as Node);
      const isMenuClick =
        !this.closeOnClick && this.dropdownMenu?.element.contains(e.target as Node);

      if (!isToggling && !isMenuClick) {
        this.close();
      }
    }
  }

  onToggleClick(_: Event): void {
    this.open = !this.open;

    if (this.open) {
      this._documentListener = this.renderer.listen(
        document,
        'click',
        this.onDocumentClick.bind(this)
      );
    } else {
      if (this._documentListener) {
        this._documentListener();
      }
    }
  }

  private close() {
    this.open = false;
    if (this._documentListener) {
      this._documentListener();
    }
    this.cd.markForCheck();
  }
}

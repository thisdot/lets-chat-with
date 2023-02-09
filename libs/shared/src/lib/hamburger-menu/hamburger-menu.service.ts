import { ElementRef, Injectable, OnDestroy } from '@angular/core';
import { ConnectionPositionPair, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Portal } from '@angular/cdk/portal';
import {
  distinctUntilChanged,
  map,
  mapTo,
  pluck,
  shareReplay,
  startWith,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { CmBreakpoints } from '../breakpoint/breakpoint.types';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class HamburgerMenuService implements OnDestroy {
  private toggleOpenSubject = new Subject<void>();
  private isOpen = new BehaviorSubject(false);

  private toggleMenu$ = this.toggleOpenSubject.asObservable().pipe(
    withLatestFrom(this.isOpen),
    map(([_, isOpen]) => !isOpen),
    tap((isOpen) => void this.isOpen.next(isOpen)),
    startWith(false),
    mapTo(null),
    shareReplay(1)
  );

  private isMobile$ = this.breakpointObserver.observe(CmBreakpoints.MD.DOWN).pipe(pluck('matches'));

  readonly isOpen$ = combineLatest([this.isOpen.asObservable(), this.toggleMenu$]).pipe(
    map(([isOpen]) => isOpen),
    distinctUntilChanged()
  );

  openMenu$ = combineLatest([this.isOpen$, this.isMobile$]).pipe(
    tap(([isOpen, isMobile]) => {
      if (isOpen) {
        this.attachOverlay(isMobile);
      } else {
        this.detachOverlays();
      }
    })
  );

  overlays!: { mobile: OverlayRef; desktop: OverlayRef };

  private destroy = new Subject<void>();
  private portal?: Portal<any>;

  constructor(private overlay: Overlay, private breakpointObserver: BreakpointObserver) {}

  ngOnDestroy(): void {
    this.detachOverlays();
    this.destroy.next();
    this.destroy.complete();
  }

  toggleOpen() {
    this.toggleOpenSubject.next();
  }

  openMenu() {
    this.isOpen.next(true);
  }

  closeMenu() {
    this.isOpen.next(false);
  }

  init(menuTrigger: ElementRef, portal: Portal<any>): void {
    this.portal = portal;
    this.createOverlays(menuTrigger);
    this.openMenu$.pipe(takeUntil(this.destroy)).subscribe();
  }

  private createOverlays(menuTrigger: ElementRef): void {
    this.overlays = {
      mobile: this.createMobileOverlay(),
      desktop: this.createDesktopOverlay(menuTrigger),
    };
  }

  private createMobileOverlay(): OverlayRef {
    const scrollStrategy = this.overlay.scrollStrategies.block();
    const positionStrategy = this.overlay.position().global().right();

    const overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: true,
      height: '100%',
    });

    overlayRef
      .backdropClick()
      .pipe(
        tap(() => void this.closeMenu()),
        tap((e) => void e.stopPropagation()),
        takeUntil(this.destroy)
      )
      .subscribe();

    return overlayRef;
  }

  private createDesktopOverlay(menuTrigger: ElementRef): OverlayRef {
    const scrollStrategy = this.overlay.scrollStrategies.block();
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(menuTrigger)
      .withPositions([
        new ConnectionPositionPair(
          { originX: 'start', originY: 'bottom' },
          { overlayX: 'start', overlayY: 'top' },
          0,
          8
        ),
        new ConnectionPositionPair(
          { originX: 'end', originY: 'bottom' },
          { overlayX: 'end', overlayY: 'top' },
          0,
          8
        ),
        new ConnectionPositionPair(
          { originX: 'start', originY: 'top' },
          { overlayX: 'start', overlayY: 'bottom' },
          0,
          -8
        ),
        new ConnectionPositionPair(
          { originX: 'end', originY: 'top' },
          { overlayX: 'end', overlayY: 'bottom' },
          0,
          -8
        ),
      ])
      .withPush(false);

    const overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: false,
    });

    overlayRef
      .outsidePointerEvents()
      .pipe(
        tap(() => void this.closeMenu()),
        tap((e) => void e.stopPropagation()),
        takeUntil(this.destroy)
      )
      .subscribe();

    return overlayRef;
  }

  private attachOverlay(isMobile: boolean): void {
    this.detachOverlay(!isMobile);
    this.attachOverlayRef(isMobile ? this.overlays.mobile : this.overlays.desktop);
  }

  private detachOverlay(isMobile: boolean) {
    this.detachOverlayRef(isMobile ? this.overlays.mobile : this.overlays.desktop);
  }

  private attachOverlayRef(overlayRef: OverlayRef) {
    if (!overlayRef.hasAttached()) {
      overlayRef.attach(this.portal);
    }
  }

  private detachOverlayRef(overlayRef: OverlayRef | undefined) {
    if (overlayRef && overlayRef.hasAttached()) {
      overlayRef.detach();
    }
  }

  private detachOverlays(): void {
    Object.values(this.overlays).forEach((overlay) => this.detachOverlayRef(overlay));
  }
}

import { TestBed } from '@angular/core/testing';

import { HamburgerMenuService } from './hamburger-menu.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ReplaySubject } from 'rxjs';
import { ElementRef } from '@angular/core';
import { DomPortal } from '@angular/cdk/portal';

class MockElementRef implements ElementRef {
  constructor(public nativeElement: any) {}
}

interface OverlaySpyCalls {
  attach: number;
  detach: number;
}

interface MobileDesktopState<T> {
  mobile: T;
  desktop: T;
}

interface OverlayCaseData {
  title: string;
  given?: () => void;
  when: () => void;
  hasAttached: Partial<MobileDesktopState<boolean>>;
  breakPointState: BreakpointState;
  overlaySpyCalls: Partial<MobileDesktopState<Partial<OverlaySpyCalls>>>;
}

describe('HamburgerMenuService', () => {
  let service: HamburgerMenuService;
  let observeOnMobile: ReplaySubject<BreakpointState>;

  beforeEach(() => {
    observeOnMobile = new ReplaySubject();
    TestBed.configureTestingModule({
      imports: [OverlayModule],
      providers: [
        {
          provide: BreakpointObserver,
          useValue: {
            observe: jasmine.createSpy().and.returnValue(observeOnMobile),
          },
        },
      ],
    });
    service = TestBed.inject(HamburgerMenuService);
    const mockElementRef = new MockElementRef({});
    const domPortal = new DomPortal({} as any);
    service.init(mockElementRef, domPortal);
  });

  it('should be open initially', () => {
    const openSpy = jasmine.createSpy();
    const sub = service.isOpen$.subscribe(openSpy);

    expect(openSpy.calls.allArgs()).toEqual([[false]]);

    sub.unsubscribe();
  });

  it('should toggle the menu', () => {
    const openSpy = jasmine.createSpy();
    const sub = service.isOpen$.subscribe(openSpy);

    service.toggleOpen();
    service.toggleOpen();
    service.toggleOpen();

    expect(openSpy.calls.allArgs()).toEqual([[false], [true], [false], [true]]);

    sub.unsubscribe();
  });

  const breakpoints: MobileDesktopState<BreakpointState> = {
    desktop: { matches: false, breakpoints: {} },
    mobile: { matches: true, breakpoints: {} },
  };

  const caseDataArr: OverlayCaseData[] = [
    {
      title: 'attach desktop',
      when: () => service.toggleOpen(),
      hasAttached: { desktop: false },
      breakPointState: breakpoints.desktop,
      overlaySpyCalls: { desktop: { attach: 1 } },
    },
    {
      title: 'attach mobile',
      when: () => service.toggleOpen(),
      hasAttached: { mobile: false },
      breakPointState: breakpoints.mobile,
      overlaySpyCalls: { mobile: { attach: 1 } },
    },
    {
      title: 'detach desktop',
      given: () => service.openMenu(),
      when: () => service.toggleOpen(),
      hasAttached: { desktop: true },
      breakPointState: breakpoints.desktop,
      overlaySpyCalls: { desktop: { detach: 1 } },
    },
    {
      title: 'detach mobile',
      given: () => service.openMenu(),
      when: () => service.toggleOpen(),
      hasAttached: { mobile: true },
      breakPointState: breakpoints.mobile,
      overlaySpyCalls: { mobile: { detach: 1 } },
    },
    {
      title: 'not attach desktop',
      hasAttached: { desktop: true },
      given: () => service.openMenu(),
      when: () => service.openMenu(),
      breakPointState: breakpoints.desktop,
      overlaySpyCalls: { desktop: { attach: 0 } },
    },
    {
      title: 'not attach mobile',
      given: () => service.openMenu(),
      when: () => service.openMenu(),
      hasAttached: { mobile: true },
      breakPointState: breakpoints.mobile,
      overlaySpyCalls: { mobile: { attach: 0 } },
    },
    {
      title: 'not detach desktop',
      when: () => service.closeMenu(),
      hasAttached: { desktop: false },
      breakPointState: breakpoints.desktop,
      overlaySpyCalls: { desktop: { detach: 0 } },
    },
    {
      title: 'not detach mobile',
      when: () => service.closeMenu(),
      hasAttached: { mobile: false },
      breakPointState: breakpoints.mobile,
      overlaySpyCalls: { mobile: { detach: 0 } },
    },
    {
      title: 'attach desktop only once',
      when: () => {
        service.openMenu();
        service.openMenu();
        service.openMenu();
      },
      hasAttached: { desktop: false },
      breakPointState: breakpoints.desktop,
      overlaySpyCalls: { desktop: { attach: 1 } },
    },
    {
      title: 'attach mobile only once',
      when: () => {
        service.openMenu();
        service.openMenu();
        service.openMenu();
      },
      hasAttached: { mobile: false },
      breakPointState: breakpoints.mobile,
      overlaySpyCalls: { mobile: { attach: 1 } },
    },
    {
      title: 'detach desktop only once',
      given: () => service.openMenu(),
      when: () => {
        service.closeMenu();
        service.closeMenu();
        service.closeMenu();
      },
      hasAttached: { desktop: true },
      breakPointState: breakpoints.desktop,
      overlaySpyCalls: { desktop: { detach: 1 } },
    },
    {
      title: 'detach mobile only once',
      given: () => service.openMenu(),
      when: () => {
        service.closeMenu();
        service.closeMenu();
        service.closeMenu();
      },
      hasAttached: { mobile: true },
      breakPointState: breakpoints.mobile,
      overlaySpyCalls: { mobile: { detach: 1 } },
    },
  ];

  caseDataArr.forEach((caseData) => {
    it(`should ${caseData.title}`, () => {
      observeOnMobile.next(caseData.breakPointState);
      spyOn(service.overlays.mobile, 'hasAttached').and.returnValue(caseData.hasAttached.mobile);
      spyOn(service.overlays.desktop, 'hasAttached').and.returnValue(caseData.hasAttached.desktop);

      caseData.given?.();
      const spies = {
        mobile: {
          attach: spyOn(service.overlays.mobile, 'attach').and.stub(),
          detach: spyOn(service.overlays.mobile, 'detach').and.stub(),
        },
        desktop: {
          attach: spyOn(service.overlays.desktop, 'attach').and.stub(),
          detach: spyOn(service.overlays.desktop, 'detach').and.stub(),
        },
      };

      caseData.when();

      const expectedCalls = {
        mobile: {
          attach: 0,
          detach: 0,
          ...caseData.overlaySpyCalls.mobile,
        },
        desktop: {
          attach: 0,
          detach: 0,
          ...caseData.overlaySpyCalls.desktop,
        },
      };
      expect(spies.mobile.attach).toHaveBeenCalledTimes(expectedCalls.mobile.attach);
      expect(spies.mobile.detach).toHaveBeenCalledTimes(expectedCalls.mobile.detach);
      expect(spies.desktop.attach).toHaveBeenCalledTimes(expectedCalls.desktop.attach);
      expect(spies.desktop.detach).toHaveBeenCalledTimes(expectedCalls.desktop.detach);
    });
  });
});

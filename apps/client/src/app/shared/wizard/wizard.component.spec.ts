import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Location } from '@angular/common';

import { SharedModule } from '@conf-match/shared';
import { SharedModule as AppSharedModule } from './../shared.module';
import { WizardComponent } from './wizard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { WizardVisitedService } from './wizard-visited.service';

const moveRouteWith = (w: WizardComponent, pos: number) => {
  const idx = w.routes.indexOf(w.route);
  if (w.routes[idx + pos]) {
    w.route = w.routes[idx + pos];
  } else {
    console.error('No such route');
  }
};

const firstRouteHOF = (w: WizardComponent) => () => {
  w.route = w.routes[0];
};

const lastRouteHOF = (w: WizardComponent) => () => {
  w.route = w.routes[w.routes.length - 1];
};

const nextRouteHOF = (w: WizardComponent) => () => moveRouteWith(w, 1);

const prevRouteHOF = (w: WizardComponent) => () => moveRouteWith(w, -1);

@Component({
  selector: 'cm-host',
  template: `
    <cm-wizard [routes]="routes">
      <router-outlet></router-outlet>
    </cm-wizard>
  `,
})
class HostComponent {
  @ViewChild(WizardComponent) wizard: WizardComponent;

  routes = ['./route1', './route2', './route3'];
}

describe('WizardComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let router: Router;
  let location: Location;
  let visitedService: WizardVisitedService;
  let firstRoute: () => void;
  let lastRoute: () => void;
  let nextRoute: () => void;
  let prevRoute: () => void;

  beforeEach(waitForAsync(() => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [AppSharedModule, SharedModule, RouterTestingModule.withRoutes([])],
      declarations: [HostComponent],
      providers: [
        {
          provide: Router,
          useValue: routerMock,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            url: of({}),
            snapshot: {
              url: [{ path: 'test' }],
            },
          },
        },
        WizardVisitedService,
      ],
    });

    TestBed.compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    visitedService = TestBed.inject(WizardVisitedService);
    (router as any).url = '';
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;

    (router as any).events = of(new NavigationEnd(1, '', null));

    fixture.detectChanges();

    firstRoute = firstRouteHOF(component.wizard);
    lastRoute = lastRouteHOF(component.wizard);
    nextRoute = nextRouteHOF(component.wizard);
    prevRoute = prevRouteHOF(component.wizard);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    expect(component.wizard).toBeTruthy();
  });

  it('should navigate to the previous route on back', () => {
    const backSpy = spyOn(location, 'back');
    component.wizard.onBack();

    expect(backSpy).toHaveBeenCalled();
  });

  it("should not navigate to the previous route, if it's the first route", () => {
    component.wizard.route = '/route1';

    const locationBackSpy = spyOn(location, 'back');
    component.wizard.onBack();

    expect(locationBackSpy).toHaveBeenCalled();
  });

  it('should save data for the specific route', () => {
    firstRoute();
    component.wizard.saveData({ data1: 'route1' });

    nextRoute();
    component.wizard.saveData({ data2: 'route2' });

    prevRoute();
    expect(component.wizard.getData()).toEqual(
      jasmine.objectContaining({
        data1: 'route1',
      })
    );

    nextRoute();
    expect(component.wizard.getData()).toEqual(
      jasmine.objectContaining({
        data2: 'route2',
      })
    );
  });

  it('should mark a route as visited', () => {
    (router as any).url = '/route1';

    component.wizard.markVisited();

    expect(visitedService.visited.has('/route1')).toBeTruthy();
  });

  it('should go to next route', () => {
    firstRoute();

    component.wizard.nextRoute();

    expect(router.navigate).toHaveBeenCalledWith(['./route2'], jasmine.any(Object));
  });

  it('should not navigate, if last route', () => {
    lastRoute();

    component.wizard.nextRoute();

    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should be able to pass navigation extras', () => {
    firstRoute();

    component.wizard.nextRoute({ state: { foo: 'bar' } });

    expect(router.navigate).toHaveBeenCalledWith(
      ['./route2'],
      jasmine.objectContaining({
        state: { foo: 'bar' },
      })
    );
  });
});

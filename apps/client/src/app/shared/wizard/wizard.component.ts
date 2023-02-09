import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import { WizardVisitedService } from './wizard-visited.service';
import { Subject } from 'rxjs';
import { takeUntil, filter, startWith, map, tap } from 'rxjs/operators';

@Component({
  selector: 'cm-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
})
export class WizardComponent<TData = any> implements OnInit, OnDestroy {
  private _data: TData = {} as any;
  private _onDestroy$ = new Subject<void>();

  @Input() routes: string[];

  @Output()
  completed = new EventEmitter<TData>();

  route: string;

  constructor(
    private _router: Router,
    private _location: Location,
    private _activatedRoute: ActivatedRoute,
    private _visited: WizardVisitedService
  ) {
    this.route = this._router.url;
  }

  ngOnInit() {
    this._router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        startWith({}),
        map(() => this._getRelativeRouteUrl(this._router.url)),
        takeUntil(this._onDestroy$),
        tap((url) => {
          this.route = url;
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  markVisited() {
    this._visited.visited.add(this._router.url);
  }

  onBack() {
    this._location.back();
  }

  saveData(data: Partial<TData>) {
    this._data = {
      ...this._data,
      ...data,
    };
  }

  getData() {
    return this._data;
  }

  clearData(key: keyof TData) {
    this._data[key] = undefined;
  }

  nextRoute(extras?: NavigationExtras) {
    const { routes } = this;
    const currentRouteUrl = this.route;
    const nextRouteUrlIdx = routes.indexOf(currentRouteUrl) + 1;
    const parentRoute = this._activatedRoute.snapshot.url.map((segment) => segment.path).join('/');

    if (routes[nextRouteUrlIdx]) {
      this._router.navigate([routes[nextRouteUrlIdx]], {
        ...extras,
        relativeTo: parentRoute ? this._activatedRoute : null,
      });
    } else if (routes.indexOf(currentRouteUrl) === routes.length - 1) {
      this.completed.emit(this._data);
    }
  }

  private _getRelativeRouteUrl(route) {
    const parentRoute = this._activatedRoute.snapshot.url.map((segment) => segment.path).join('/');
    const regex = new RegExp(parentRoute ? '(^.*/' + parentRoute + ')(/.*$)' : '(/.*$)');
    const result = route.match(regex);

    const idx = parentRoute ? 3 : 2;

    return result && result.length === idx ? `.${result[idx - 1]}` : null;
  }
}

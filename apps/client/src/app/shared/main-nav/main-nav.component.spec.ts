import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { SharedModule } from '@conf-match/shared';
import { MainNavComponent, MainNavLink } from './main-nav.component';
import { selectConferenceId } from '@conf-match/core';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { getTranslocoTestingModule } from '../../transloco/transloco-testing-module';

describe('MainNavComponent', () => {
  let fixture: ComponentFixture<MainNavComponent>;
  let component: MainNavComponent;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainNavComponent],
      imports: [
        RouterTestingModule,
        SharedModule,
        SharedUiIconsModule,
        getTranslocoTestingModule(),
      ],
      providers: [
        provideMockStore({
          initialState: {
            core: {},
          },
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(MainNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the links with icons and labels', () => {
    store.overrideSelector(selectConferenceId, '1');
    store.refreshState();

    fixture.detectChanges();

    component.links$.subscribe((links) => {
      links.forEach((link: MainNavLink) => {
        const linkEl = fixture.debugElement.query(
          By.css(`[data-testid="main-nav:link:${link.label}"]`)
        );
        const iconEl = fixture.debugElement.query(
          By.css(`[data-testid="main-nav:link:icon:${link.iconName}"]`)
        );
        const labelEl = fixture.debugElement.query(
          By.css(`[data-testid="main-nav:link:label:${link.label}"]`)
        );

        expect(linkEl).toBeDefined();
        expect(linkEl.nativeElement.getAttribute('ng-reflect-router-link')).toEqual(link.to);
        expect(iconEl).toBeDefined();
        expect(labelEl).toBeDefined();
        expect(labelEl.nativeElement.textContent).toContain(link.label);
      });
    });
  });
});

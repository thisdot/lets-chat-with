import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { ConferencesComponent } from './conferences.component';
import { SharedModule } from '@conf-match/shared';
import { SharedModule as AppSharedModule } from './../shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { JoinConferenceModalComponent } from './join-conference-modal/join-conference-modal.component';
import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { provideMockStore } from '@ngrx/store/testing';

import { Router } from '@angular/router';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { conferencesMock, ConferencesSelectors } from '@conf-match/core';
import { getTranslocoTestingModule } from '../transloco/transloco-testing-module';

@NgModule({
  declarations: [JoinConferenceModalComponent],
  imports: [getTranslocoTestingModule()],
  exports: [JoinConferenceModalComponent],
})
class TestHelperModule {}

describe('ConferencesComponent', () => {
  let component: ConferencesComponent;
  let fixture: ComponentFixture<ConferencesComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConferencesComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: ConferencesSelectors.selectAttendeeConferences,
              value: conferencesMock,
            },
          ],
        }),
      ],
      imports: [
        NoopAnimationsModule,
        AppSharedModule,
        SharedModule,
        NoopAnimationsModule,
        AppSharedModule,
        SharedModule,
        RouterTestingModule,
        getTranslocoTestingModule(),
        RouterTestingModule.withRoutes([]),
        SharedUiButtonsModule,
        TestHelperModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(ConferencesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`when clicking join button, modal is shown`, fakeAsync(() => {
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    getJoinConferenceButton().click();
    expect(getJoinConferenceModal()).toBeTruthy();
  }));

  it(`when clicking conference card, navigates to /connect
  `, fakeAsync(() => {
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    fixture.detectChanges();

    getConferenceCards()[0].click();
    expect(router.navigate).toHaveBeenCalledWith(['/conferences', '1', 'connect']);
  }));

  function getJoinConferenceButton(): HTMLButtonElement {
    return [...fixture.debugElement.nativeElement.querySelectorAll('button')][0];
  }
  function getConferenceCards(): HTMLElement[] {
    return [...fixture.debugElement.nativeElement.querySelectorAll('cm-conference-card')];
  }

  function getJoinConferenceModal(): HTMLElement {
    return document.querySelector('cm-join-conference-modal');
  }
});

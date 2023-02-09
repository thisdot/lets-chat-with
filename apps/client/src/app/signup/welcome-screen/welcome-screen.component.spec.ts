import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule as CmSharedModule } from '@conf-match/shared';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActionsSubject } from '@ngrx/store';

import { WelcomeScreenComponent } from './welcome-screen.component';
import { SharedModule as AppSharedModule } from '../../shared/shared.module';
import { By } from '@angular/platform-browser';
import { TestScheduler } from 'rxjs/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientSharedAuthUiAuthFormModule } from '@conf-match/client/shared/auth/ui-auth-form';
import { getTranslocoTestingModule } from '../../transloco/transloco-testing-module';

describe('WelcomeScreenComponent', () => {
  let component: WelcomeScreenComponent;
  let fixture: ComponentFixture<WelcomeScreenComponent>;
  let store: MockStore;
  let testScheduler: TestScheduler;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        CmSharedModule,
        AppSharedModule,
        ClientSharedAuthUiAuthFormModule,
        getTranslocoTestingModule(),
      ],
      declarations: [WelcomeScreenComponent],
      providers: [
        ActionsSubject,
        provideMockStore({
          initialState: {
            core: {},
          },
        }),
      ],
    }).compileComponents();

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should sign up the user on form submit', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const authForm = fixture.debugElement.query(By.css('cm-auth-form'));

    authForm.triggerEventHandler('submitForm', null);

    expect(dispatchSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        type: '[Core.Amplify / Sign Up] User Sign Up Attempted',
      })
    );
  });
});

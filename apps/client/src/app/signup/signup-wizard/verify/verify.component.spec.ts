import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VerifyComponent } from './verify.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { SecurityCodeInputComponent } from '../../../shared/security-code-form/security-code-input/security-code-input.component';
import { SecurityCodeFormComponent } from '../../../shared/security-code-form/security-code-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { getTranslocoTestingModule } from '../../../transloco/transloco-testing-module';
import { RouterTestingModule } from '@angular/router/testing';

describe('VerifyComponent', () => {
  let component: VerifyComponent;
  let fixture: ComponentFixture<VerifyComponent>;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        SharedUiButtonsModule,
        RouterTestingModule,
        getTranslocoTestingModule(),
      ],
      declarations: [VerifyComponent, SecurityCodeInputComponent, SecurityCodeFormComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should send verification code on resend', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    const codeForm = fixture.debugElement.query(By.css('cm-security-code-form'));
    codeForm.triggerEventHandler('resendCode', {});

    expect(dispatchSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        type: '[Core.Amplify / ReSendEmailVerification] ReSend Email Verification Code Attempted',
      })
    );
  });

  it('should submit verification code on submit', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    const codeForm = fixture.debugElement.query(By.css('cm-security-code-form'));
    codeForm.triggerEventHandler('submitForm', {});

    expect(dispatchSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        type: '[Core.Amplify / VerifyEmail] User Verify Email Attempted',
      })
    );
  });
});

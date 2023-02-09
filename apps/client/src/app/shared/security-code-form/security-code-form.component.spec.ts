import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SecurityCodeFormComponent } from './security-code-form.component';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecurityCodeInputComponent } from './security-code-input/security-code-input.component';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { ClientSharedUiPasswordWrapperModule } from '@conf-match/client/shared/ui-password-wrapper';
import { getTranslocoTestingModule } from '../../transloco/transloco-testing-module';

describe('SecurityCodeFormComponent', () => {
  let component: SecurityCodeFormComponent;
  let fixture: ComponentFixture<SecurityCodeFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        SharedUiButtonsModule,
        getTranslocoTestingModule(),
        ClientSharedUiPasswordWrapperModule,
      ],
      declarations: [SecurityCodeFormComponent, SecurityCodeInputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityCodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the form invalid by default', () => {
    expect(component.form.invalid).toBeTruthy();

    const button = fixture.debugElement.query(By.css('button[cm-button]'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should have button disabled, if the loading', () => {
    component.loading = true;

    const button = fixture.debugElement.query(By.css('button[cm-button]'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should have the form valid', () => {
    component.form.controls['code'].setValue('123456');

    fixture.detectChanges();

    expect(component.form.invalid).toBeFalsy();

    const button = fixture.debugElement.query(By.css('button[cm-button]'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should render invalid UI', () => {
    component.invalid = true;
    fixture.detectChanges();

    const invalidUi = fixture.debugElement.query(By.css('.cm-security-code-form__invalid'));
    expect(invalidUi).toBeTruthy();
  });

  it('should resend code on resend button click', () => {
    component.invalid = true;
    fixture.detectChanges();

    const resendSpy = spyOn(component.resendCode, 'emit');
    const resendBtn = fixture.debugElement.query(
      By.css('.cm-security-code-form__invalid > button')
    );

    resendBtn.triggerEventHandler('click', null);

    expect(resendSpy).toHaveBeenCalled();
  });

  it('should submit form', () => {
    component.form.controls['code'].setValue('123456');

    const submitSpy = spyOn(component.submitForm, 'emit');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);

    expect(submitSpy).toHaveBeenCalledWith({ code: '123456' });
  });
});

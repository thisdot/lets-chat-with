import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { NewPasswordComponent } from './new-password.component';
import { WizardComponent } from '../../../shared/wizard/wizard.component';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { WizardVisitedService } from '../../../shared/wizard';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { InputDirective } from '@conf-match/shared';
import { getTranslocoTestingModule } from '../../../transloco/transloco-testing-module';
import { ClientSharedUiPasswordWrapperModule } from '@conf-match/client/shared/ui-password-wrapper';
import { ClientSharedUiTextFieldWrapperModule } from '@conf-match/client/shared/ui-text-field-wrapper';

describe('NewPasswordComponent', () => {
  let component: NewPasswordComponent;
  let fixture: ComponentFixture<NewPasswordComponent>;
  let wizard: WizardComponent<any>;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SharedUiButtonsModule,
        SharedUiIconsModule,
        getTranslocoTestingModule(),
        ClientSharedUiPasswordWrapperModule,
        ClientSharedUiTextFieldWrapperModule,
      ],
      declarations: [NewPasswordComponent, InputDirective],
      providers: [WizardComponent, WizardVisitedService, provideMockStore()],
    }).compileComponents();

    wizard = TestBed.inject(WizardComponent);
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the form invalid by default', () => {
    expect(component.form.invalid).toBeTruthy();
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const button = buttons.find((btn) => btn.nativeElement.textContent.indexOf('Confirm') !== -1);
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should dispatch action on onSubmit', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    wizard.saveData({
      email: 'a@b.c',
      code: '123',
    });

    component.onSubmit({
      newPassword: 'abc',
      confirmPassword: 'abc',
    });

    expect(dispatchSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        type: '[Core.Amplify / RecoverPass-ChangePass] Change Password Attempted',
        password: 'abc',
      })
    );
  });

  it('should have the form valid', () => {
    component.form.controls['newPassword'].setValue('12345678');
    component.form.controls['confirmPassword'].setValue('12345678');

    fixture.detectChanges();

    expect(component.form.invalid).toBeFalsy();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });
});

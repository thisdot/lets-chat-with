import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AuthFormComponent } from './auth-form.component';
import { getTranslocoTestingModule } from '@conf-match/client/shared/testing/util-testing';
import { ClientSharedUiTextFieldWrapperModule } from '@conf-match/client/shared/ui-text-field-wrapper';
import { ClientSharedUiPasswordWrapperModule } from '@conf-match/client/shared/ui-password-wrapper';
import { InputDirective } from '@conf-match/client/shared/ui-input';

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        ClientSharedUiTextFieldWrapperModule,
        ClientSharedUiPasswordWrapperModule,
        getTranslocoTestingModule(),
      ],
      declarations: [AuthFormComponent, InputDirective],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the button label', async () => {
    component.buttonLabel = 'Sign In';
    fixture.detectChanges();
    await fixture.whenStable();

    const button = fixture.debugElement.queryAll(By.css('button')).pop();

    expect(button?.nativeElement?.innerText).toEqual('SIGN IN');
  });

  it('should check if form is initially invalid', () => {
    expect(component.form.invalid).toBeTruthy();
  });

  it('should check if the email is valid when input filled', () => {
    const email = component.form.controls.email;
    email.setValue('');
    fixture.detectChanges();

    expect(email.invalid).toBeTruthy();
    expect(email.hasError('required')).toBeTruthy();

    email.setValue('a@b.c');
    fixture.detectChanges();
    expect(email.invalid).toBeFalsy();
  });

  it('should disable the button, if loading', () => {
    const { controls } = component.form;
    controls.email.setValue('a@b.c');
    controls.password.setValue('password');
    component.loading = true;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button[cm-button]'));

    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should check if the password is valid when input filled', () => {
    const password = component.form.controls.password;
    expect(password.valid).toBeFalsy();

    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();

    password.setValue('password');
    expect(password.valid).toBeTruthy();
  });

  it('should emit form data on submit', () => {
    const submitSpy = spyOn(component.submitForm, 'emit');
    const form = fixture.debugElement.query(By.css('form'));

    component.form.controls['email'].setValue('admin@gmail.com');
    component.form.controls['password'].setValue('pass1111');

    form.triggerEventHandler('ngSubmit', null);

    expect(submitSpy).toHaveBeenCalledWith({
      email: 'admin@gmail.com',
      password: 'pass1111',
    });
  });

  it('should render errors', () => {
    component.form.controls['email'].setValue('adfa');
    component.form.controls['password'].setValue('12');

    component.form.controls.email.markAsTouched();
    component.form.controls.password.markAsTouched();

    const emailErrors = ['userAuth.errors.email.invalid'];
    const passwordErrors = ['userAuth.errors.password.minLength'];

    fixture.detectChanges();

    const [emailErrorElement, passwordErrorElement] = fixture.debugElement.queryAll(
      By.css('.cm-auth-form__errors__error')
    );

    expect(emailErrorElement.nativeElement.innerText).toEqual(emailErrors[0]);
    expect(passwordErrorElement.nativeElement.innerText).toEqual(passwordErrors[0]);
  });
});

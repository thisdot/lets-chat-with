import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { WizardComponent } from '../../../shared/wizard/wizard.component';
import { CurrentEmailComponent } from './current-email.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { WizardVisitedService } from '../../../shared/wizard';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { getTranslocoTestingModule } from '../../../transloco/transloco-testing-module';
import { ClientSharedUiPasswordWrapperModule } from '@conf-match/client/shared/ui-password-wrapper';
import { ClientSharedUiTextFieldWrapperModule } from '@conf-match/client/shared/ui-text-field-wrapper';

describe('CurrentEmailComponent', () => {
  let component: CurrentEmailComponent;
  let fixture: ComponentFixture<CurrentEmailComponent>;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SharedUiButtonsModule,
        getTranslocoTestingModule(),
        ClientSharedUiPasswordWrapperModule,
        ClientSharedUiTextFieldWrapperModule,
      ],
      declarations: [CurrentEmailComponent],
      providers: [
        WizardComponent,
        WizardVisitedService,
        provideMockStore({
          initialState: {
            securityCode: {
              errors: [],
            },
          },
        }),
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the form invalid by default', () => {
    expect(component.form.invalid).toBeTruthy();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should have the form valid', () => {
    component.form.controls['email'].setValue('a@b.c');

    fixture.detectChanges();

    expect(component.form.invalid).toBeFalsy();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should dispatch action on onNext', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.onNext({
      email: 'a@b.c',
    });

    expect(dispatchSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        type: '[Core.Amplify / RecoverPass-SendCode] Send Security Code Attempted',
        email: 'a@b.c',
      })
    );
  });
});

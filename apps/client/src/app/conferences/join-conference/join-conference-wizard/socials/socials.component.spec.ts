import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@conf-match/shared';
import { By } from '@angular/platform-browser';

import { SocialsComponent } from './socials.component';
import { WizardComponent, WizardVisitedService } from '../../../../shared/wizard';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { getTranslocoTestingModule } from '../../../../transloco/transloco-testing-module';
import { ClientSharedUiTextFieldWrapperModule } from '@conf-match/client/shared/ui-text-field-wrapper';
import { ClientSharedUiInputModule } from '@conf-match/client/shared/ui-input';

describe('SocialsComponent', () => {
  let component: SocialsComponent;
  let fixture: ComponentFixture<SocialsComponent>;
  let wizard: WizardComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterTestingModule,
        ClientSharedUiTextFieldWrapperModule,
        SharedUiButtonsModule,
        getTranslocoTestingModule(),
        ClientSharedUiInputModule,
        ClientSharedUiTextFieldWrapperModule,
      ],
      declarations: [SocialsComponent],
      providers: [WizardComponent, WizardVisitedService],
    }).compileComponents();

    wizard = TestBed.inject(WizardComponent);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the button set to skip, if form is not changed', () => {
    const button = fixture.debugElement.query(By.css('button'));

    expect(button.componentInstance.cmButtonType).toEqual('secondary');
    expect(button.nativeElement.innerText.toLowerCase()).toEqual('skip');
  });

  it('should have the button set to next, if form is changed', () => {
    component.form.controls.linkedin.setValue('@john');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));

    expect(button.componentInstance.cmButtonType).toEqual('primary');
    expect(button.nativeElement.innerText.toLowerCase()).toMatch('next');
  });

  it('should have the button set to skip, if form is changed, but then restored to initial state', () => {
    component.form.controls.linkedin.setValue('@john');
    fixture.detectChanges();

    component.form.controls.linkedin.setValue('');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));

    expect(button.componentInstance.cmButtonType).toEqual('secondary');
    expect(button.nativeElement.innerText.toLowerCase()).toEqual('skip');
  });

  it('should save the input on form change', () => {
    const saveSpy = spyOn(wizard, 'saveData');
    component.form.patchValue({ twitter: 'johndoe' });

    expect(saveSpy).toHaveBeenCalledWith(jasmine.objectContaining({ twitter: 'johndoe' }));
  });
});

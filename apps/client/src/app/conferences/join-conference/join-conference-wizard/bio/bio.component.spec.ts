import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@conf-match/shared';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { WizardComponent, WizardVisitedService } from '../../../../shared/wizard';

import { BioComponent } from './bio.component';
import { getTranslocoTestingModule } from '../../../../transloco/transloco-testing-module';
import { ClientSharedUiPasswordWrapperModule } from '@conf-match/client/shared/ui-password-wrapper';

describe('BioComponent', () => {
  let component: BioComponent;
  let fixture: ComponentFixture<BioComponent>;
  let wizard: WizardComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterTestingModule,
        SharedUiButtonsModule,
        getTranslocoTestingModule(),
        ClientSharedUiPasswordWrapperModule,
      ],
      declarations: [BioComponent],
      providers: [WizardComponent, WizardVisitedService],
    }).compileComponents();

    wizard = TestBed.inject(WizardComponent);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have textarea maxlength set to 160', () => {
    const textarea = fixture.debugElement.query(By.css('textarea'));

    expect(textarea.nativeElement.getAttribute('maxlength')).toEqual('160');
  });

  it('should save the input on form change', () => {
    const saveSpy = spyOn(wizard, 'saveData');
    component.form.patchValue({ bio: 'text' });

    expect(saveSpy).toHaveBeenCalledWith({ bio: 'text' });
  });
});

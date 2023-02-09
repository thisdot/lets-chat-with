import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@conf-match/shared';
import { BasicInfoComponent } from './basic-info.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { WizardComponent, WizardVisitedService } from '../../../../shared/wizard';
import { getTranslocoTestingModule } from '../../../../transloco/transloco-testing-module';

describe('BasicInfoComponent', () => {
  let component: BasicInfoComponent;
  let fixture: ComponentFixture<BasicInfoComponent>;
  let wizard: WizardComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        getTranslocoTestingModule(),
      ],
      declarations: [BasicInfoComponent],
      providers: [WizardComponent, WizardVisitedService],
    }).compileComponents();

    wizard = TestBed.inject(WizardComponent);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the next button disabled by default', () => {
    const button = fixture.debugElement.query(By.css('button'));

    expect(button.nativeElement.disabled).toBe(true);
  });

  it('should enable button when the name is filled', () => {
    component.form.controls.fullName.setValue('John Doe');
    const button = fixture.debugElement.query(By.css('button'));

    fixture.detectChanges();

    expect(button.nativeElement.disabled).toBe(false);
  });

  it('should not render the subscibe box', () => {
    component.subscribeBox$ = of(false);
    fixture.detectChanges();

    const subscribeBox = fixture.debugElement.query(By.css('.cm-basic-info__subscribe-box'));

    expect(subscribeBox).toBeFalsy();
  });

  it('should save the input on form change', () => {
    const saveSpy = spyOn(wizard, 'saveData');
    component.form.patchValue({ fullName: 'John' });

    expect(saveSpy).toHaveBeenCalledWith(jasmine.objectContaining({ fullName: 'John' }));
  });
});

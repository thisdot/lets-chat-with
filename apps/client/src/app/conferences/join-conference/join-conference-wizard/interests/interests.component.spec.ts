import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ModalService, SharedModule } from '@conf-match/shared';
import { TestScheduler } from 'rxjs/testing';
import { of } from 'rxjs';

import { InterestsComponent } from './interests.component';
import { WizardComponent, WizardVisitedService } from '../../../../shared/wizard';
import { getTranslocoTestingModule } from '../../../../transloco/transloco-testing-module';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { InterestModel } from '@conf-match/api';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { ClientSharedUiTextFieldWrapperModule } from '@conf-match/client/shared/ui-text-field-wrapper';

describe('InterestsComponent', () => {
  let component: InterestsComponent;
  let fixture: ComponentFixture<InterestsComponent>;
  let testScheduler: TestScheduler;
  let modalService: ModalService;
  let wizard: WizardComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([]),
        getTranslocoTestingModule(),
        SharedUiButtonsModule,
        ApolloTestingModule,
        ClientSharedUiTextFieldWrapperModule,
      ],
      declarations: [InterestsComponent],
      providers: [WizardComponent, WizardVisitedService],
    }).compileComponents();

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    modalService = TestBed.inject(ModalService);
    wizard = TestBed.inject(WizardComponent);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestsComponent);
    component = fixture.componentInstance;

    component.interestsCount$ = of(4);
    component.interests$ = of([
      { group: 'A', name: 'nameA1' },
      { group: 'A', name: 'nameA2' },
      { group: 'A', name: 'nameA3' },
      { group: 'B', name: 'nameB1' },
      { group: 'B', name: 'nameB2' },
      { group: 'C', name: 'nameC1' },
      { group: 'C', name: 'nameC2' },
    ] as InterestModel[]);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the button enabled, if at least one interest is selected', () => {
    component.selectedInterests.push('nameA1');

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBe(false);
  });

  it('should have the button disabled, if the last interest is unselected', () => {
    const button = fixture.debugElement.query(By.css('button'));

    component.selectedInterests.push('nameA1');
    fixture.detectChanges();
    expect(button.nativeElement.disabled).toBe(false);

    component.selectedInterests.splice(0, 1);
    fixture.detectChanges();
    expect(button.nativeElement.disabled).toBe(true);
  });

  it('should save the data on onInterestStateChange', () => {
    const saveSpy = spyOn(wizard, 'saveData');
    component.onInterestsSelected(['Label']);

    expect(saveSpy).toHaveBeenCalledWith(jasmine.anything());
  });
});

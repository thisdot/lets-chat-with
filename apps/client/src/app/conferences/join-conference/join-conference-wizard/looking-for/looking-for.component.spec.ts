import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@conf-match/shared';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { of } from 'rxjs';

import { LookingForComponent } from './looking-for.component';
import { WizardComponent, WizardVisitedService } from '../../../../shared/wizard';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { getTranslocoTestingModule } from '../../../../transloco/transloco-testing-module';

describe('LookingForComponent', () => {
  let component: LookingForComponent;
  let fixture: ComponentFixture<LookingForComponent>;
  let wizard: WizardComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([]),
        getTranslocoTestingModule(),
        SharedUiButtonsModule,
        ApolloTestingModule,
      ],
      declarations: [LookingForComponent],
      providers: [
        WizardComponent,
        WizardVisitedService,
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              conference: {
                identifiers: [],
              },
            }),
          },
        },
      ],
    }).compileComponents();

    wizard = TestBed.inject(WizardComponent);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookingForComponent);
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

  it('should have the button enabled, if there are at least one selected connections', () => {
    component.selectedConnections.push('CEO');

    const button = fixture.debugElement.query(By.css('button'));

    fixture.detectChanges();

    expect(button.nativeElement.disabled).toBe(false);
  });

  it('should have the button disabled, if the last selected connections is unselected', () => {
    component.selectedConnections.push('CEO');

    const button = fixture.debugElement.query(By.css('button'));

    fixture.detectChanges();
    expect(button.nativeElement.disabled).toBe(false);

    component.selectedConnections.splice(0, 1);
    fixture.detectChanges();
    expect(button.nativeElement.disabled).toBe(true);
  });

  it('should save the data on onConnectionsSelected', () => {
    const saveSpy = spyOn(wizard, 'saveData');
    component.onConnectionsSelected('Label');

    expect(saveSpy).toHaveBeenCalledWith(jasmine.anything());
  });
});

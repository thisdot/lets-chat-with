import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@conf-match/shared';
import { of } from 'rxjs';

import { WhoIAmComponent } from './who-i-am.component';
import { WizardComponent, WizardVisitedService } from '../../../../shared/wizard';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { IdentifierModel } from '@conf-match/api';

const TEST_IDENTIFIERS = {
  CEO: { id: '1', name: 'CEO' } as IdentifierModel,
  CTO: { id: '2', name: 'CTO' } as IdentifierModel,
  DEV: { id: '3', name: 'Dev' } as IdentifierModel,
};
import { getTranslocoTestingModule } from '../../../../transloco/transloco-testing-module';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { ClientSharedUiTextFieldWrapperModule } from '@conf-match/client/shared/ui-text-field-wrapper';

describe('WhoIAmComponent', () => {
  let component: WhoIAmComponent;
  let fixture: ComponentFixture<WhoIAmComponent>;
  let wizard: WizardComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([]),
        getTranslocoTestingModule(),
        ApolloTestingModule,
        SharedUiButtonsModule,
        ClientSharedUiTextFieldWrapperModule,
      ],
      declarations: [WhoIAmComponent],
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
    fixture = TestBed.createComponent(WhoIAmComponent);
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

  it('should have the button enabled, if there under 3 selected identifiers', () => {
    component.selectedIdentifiers.next([TEST_IDENTIFIERS.CEO, TEST_IDENTIFIERS.CTO]);

    const button = fixture.debugElement.query(By.css('button'));

    fixture.detectChanges();

    expect(button.nativeElement.disabled).toBe(false);
  });

  it('should have the button enabled, if there are 3 selected identifiers', () => {
    component.selectedIdentifiers.next([
      TEST_IDENTIFIERS.CEO,
      TEST_IDENTIFIERS.CTO,
      TEST_IDENTIFIERS.DEV,
    ]);

    const button = fixture.debugElement.query(By.css('button'));

    fixture.detectChanges();

    expect(button.nativeElement.disabled).toBe(false);
  });
});

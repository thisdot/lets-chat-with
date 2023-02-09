import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientSharedUiTextFieldWrapperModule } from '@conf-match/client/shared/ui-text-field-wrapper';
import { Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { getTranslocoTestingModule } from '../../transloco/transloco-testing-module';
import { NoResultsComponent } from './no-results.component';

describe(`NoResultsComponent`, () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        getTranslocoTestingModule(),
        ClientSharedUiTextFieldWrapperModule,
      ],
      declarations: [NoResultsComponent],
      providers: [
        {
          provide: Actions,
          useValue: of({ type: 'test' }),
        },
      ],
    }).compileComponents();
  }));

  it('should navigate to connect when clicking start matching', () => {
    const fixture = TestBed.createComponent(NoResultsComponent);

    fixture.detectChanges();

    const anchor = fixture.debugElement.query(By.css('.cm-matches__no-results__connect'));
    const href = anchor.nativeElement.getAttribute('href');
    expect(href).toEqual('/connect');
  });
});

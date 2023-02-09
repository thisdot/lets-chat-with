import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule as CmSharedModule } from '@conf-match/shared';
import { SharedModule as AppSharedModule } from '../../shared/shared.module';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatchProfileComponent } from './match-profile.component';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';

describe('ProfileComponent', () => {
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CmSharedModule, AppSharedModule, SharedUiIconsModule],
      declarations: [MatchProfileComponent],
      providers: [
        provideMockStore({
          initialState: {
            core: {},
          },
        }),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(MatchProfileComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  xit('should navigate to matches when clicking back', () => {
    spyOn(router, 'navigate');

    const fixture = TestBed.createComponent(MatchProfileComponent);

    fixture.detectChanges();

    const backButton = fixture.debugElement.query(
      By.css('.cm-top-nav__wrapper__back-btn-wrapper cm-icon')
    );

    backButton.triggerEventHandler('click', {});

    expect(router.navigate).toHaveBeenCalled();
  });
});

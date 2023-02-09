import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientSharedUiInputModule } from '@conf-match/client/shared/ui-input';
import { ClientSharedUiPasswordWrapperModule } from '@conf-match/client/shared/ui-password-wrapper';
import { SharedModule } from '@conf-match/shared';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { getTranslocoTestingModule } from '../transloco/transloco-testing-module';
import { SharedModule as AppSharedModule } from './../shared/shared.module';
import { EmailComponent } from './email/email.component';
import { HelpComponent, HelpService } from './help/help.component';
import { HouseRulesComponent, HouseRulesService } from './house-rules/house-rules.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PasswordComponent } from './password/password.component';
import { SettingsWrapperComponent } from './settings-wrapper.component';
import { SettingsComponent } from './settings/settings.component';

const HOUSE_RULES = [
  {
    title: 'first title',
    text: 'first description',
    icon: 'Flash',
  },
  {
    title: 'second title',
    text: 'second description',
    icon: 'Flash',
  },
];

const HELP_ITEMS = [
  {
    question: 'First questoin',
    answer: 'First answer',
  },
  {
    question: 'Second question',
    answer: 'Second answer',
  },
];

describe('SettingsWrapperComponent', () => {
  let component: SettingsWrapperComponent;
  let fixture: ComponentFixture<SettingsWrapperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        SettingsWrapperComponent,
        SettingsComponent,
        HelpComponent,
        PasswordComponent,
        EmailComponent,
        HouseRulesComponent,
        NotificationsComponent,
      ],
      imports: [
        getTranslocoTestingModule(),
        NoopAnimationsModule,
        ReactiveFormsModule,
        AppSharedModule,
        SharedModule,
        SharedUiIconsModule,
        RouterTestingModule.withRoutes([
          { path: 'settings', component: SettingsComponent },
          { path: 'settings/email', component: EmailComponent },
          { path: 'settings/password', component: PasswordComponent },
          { path: 'settings/help', component: HelpComponent },
          { path: 'settings/house-rules', component: HouseRulesComponent },
          {
            path: 'settings/notifications',
            component: NotificationsComponent,
          },
        ]),
        ClientSharedUiPasswordWrapperModule,
        ClientSharedUiInputModule,
      ],
      providers: [
        {
          provide: HouseRulesService,
          useValue: {
            getAll: () => of(HOUSE_RULES),
          },
        },
        {
          provide: HelpService,
          useValue: {
            getAll: () => of(HELP_ITEMS),
          },
        },
        provideMockStore({
          initialState: {
            core: {
              appUser: {
                notificationConfig: {
                  matches: true,
                  messages: true,
                  subscribe: true,
                },
              },
            },
          },
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should link to email form', fakeAsync(() => {
    const link = getLink('change email');
    expect(link).toBeTruthy();

    link.click();
    tick();
    fixture.detectChanges();

    expect(getInputWithAriaLabel('new email')).toBeTruthy();
    expect(getButton('send verification')).toBeTruthy();
  }));

  it('should link to password form', fakeAsync(() => {
    const link = getLink('change password');
    expect(link).toBeTruthy();

    link.click();
    tick();
    fixture.detectChanges();

    expect(getInputWithAriaLabel('new password')).toBeTruthy();
    expect(getButton('save changes')).toBeTruthy();
  }));

  it('should link to notifications settings', fakeAsync(() => {
    const link = getLink('notifications');
    expect(link).toBeTruthy();

    link.click();
    tick();
    fixture.detectChanges();

    expect(getCheckboxWithAriaLabel('toggle notifications for matches')).toBeTruthy();
    expect(getCheckboxWithAriaLabel('toggle notifications for messages')).toBeTruthy();

    expect(getCheckboxWithAriaLabel('subscribe for special tickets')).toBeFalsy();
  }));

  it('should link to house rules', fakeAsync(() => {
    const link = getLink('house rules');
    expect(link).toBeTruthy();

    link.click();
    tick();
    fixture.detectChanges();

    HOUSE_RULES.forEach((rule) => {
      expect(fixture.debugElement.nativeElement.innerText).toContain(rule.title);
      expect(fixture.debugElement.nativeElement.innerText).toContain(rule.text);
    });
  }));

  xit('should link to help section', fakeAsync(() => {
    const link = getLink('need help?');
    expect(link).toBeTruthy();

    link.click();
    tick();
    fixture.detectChanges();

    HELP_ITEMS.forEach((item) => {
      expect(fixture.debugElement.nativeElement.innerText).toContain(item.question);
      expect(fixture.debugElement.nativeElement.innerText).not.toContain(item.answer);
    });
  }));

  function getLink(text: string) {
    return [...fixture.debugElement.nativeElement.querySelectorAll('a')].find(
      (a) => a.innerText.toLowerCase() === text.toLowerCase()
    );
  }

  function getInputWithAriaLabel(label: string) {
    return [...fixture.debugElement.nativeElement.querySelectorAll('input')].find(
      (i) =>
        i.getAttribute('aria-label') &&
        i.getAttribute('aria-label').toLowerCase() === label.toLowerCase()
    );
  }

  function getCheckboxWithAriaLabel(label: string) {
    return [...fixture.debugElement.nativeElement.querySelectorAll('input[type="checkbox"]')].find(
      (i) =>
        i.getAttribute('aria-label') &&
        i.getAttribute('aria-label').toLowerCase() === label.toLowerCase()
    );
  }

  function getButton(text: string) {
    return [...fixture.debugElement.nativeElement.querySelectorAll('button')].find(
      (b) => b.innerText.toLowerCase() === text.toLowerCase()
    );
  }
});

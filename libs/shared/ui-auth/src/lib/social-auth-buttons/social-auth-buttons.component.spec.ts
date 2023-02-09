import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SocialAuthButtonsComponent } from './social-auth-buttons.component';
import { By } from '@angular/platform-browser';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';

describe('SocialAuthButtonsComponent', () => {
  let component: SocialAuthButtonsComponent;
  let fixture: ComponentFixture<SocialAuthButtonsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SocialAuthButtonsComponent],
      imports: [SharedUiIconsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialAuthButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default class', () => {
    expect(fixture.debugElement.classes['cm-social-auth-buttons']).toBe(true);
  });

  it('should add colored class, if the input is set to true', () => {
    component.colored = true;
    fixture.detectChanges();

    expect(fixture.debugElement.classes['cm-social-auth-buttons--colored']).toBe(true);
  });

  it('should call sign up method with facebook platform on facebook icon click', () => {
    const clickSpy = spyOn(component, 'onSocialSignUp');

    const button = fixture.debugElement.query(By.css('.cm-social-auth-buttons__facebook'));

    button.nativeElement.click();

    expect(clickSpy).toHaveBeenCalledWith('facebook');
  });

  it('should call sign up method with twitter platform on twitter icon click', () => {
    const clickSpy = spyOn(component, 'onSocialSignUp');

    const button = fixture.debugElement.query(By.css('.cm-social-auth-buttons__twitter'));

    button.nativeElement.click();

    expect(clickSpy).toHaveBeenCalledWith('twitter');
  });

  it('should call sign up method with linkedin platform on linkedin icon click', () => {
    const clickSpy = spyOn(component, 'onSocialSignUp');

    const button = fixture.debugElement.query(By.css('.cm-social-auth-buttons__linkedin'));

    button.nativeElement.click();

    expect(clickSpy).toHaveBeenCalledWith('linkedin');
  });
});

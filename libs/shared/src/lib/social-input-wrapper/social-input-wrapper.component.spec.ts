import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SocialInputWrapperComponent } from './social-input-wrapper.component';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { InputDirective } from '@conf-match/client/shared/ui-input';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'cm-social-input-wrapper-test',
  template: `
    <cm-social-input-wrapper [platform]="platform">
      <input cmInput />
    </cm-social-input-wrapper>
  `,
})
class SocialInputWrapperTestComponent {
  platform: string;
}

describe('SocialInputWrapperTestComponent', () => {
  let component: SocialInputWrapperTestComponent;
  let fixture: ComponentFixture<SocialInputWrapperTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SocialInputWrapperComponent, InputDirective, SocialInputWrapperTestComponent],
      imports: [SharedUiIconsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialInputWrapperTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add input class to the input', () => {
    const input = fixture.debugElement.query(By.css('.cm-social-input-wrapper__input'));

    expect(input).toBeTruthy();
  });

  it('should render linkedin icon', () => {
    component.platform = 'linkedin';

    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('cm-icon'));

    expect(icon).toBeTruthy();
    expect(icon.componentInstance.name).toEqual('SocialLinkedIn');
  });

  it('should render twitter icon', () => {
    component.platform = 'twitter';

    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('cm-icon'));

    expect(icon).toBeTruthy();
    expect(icon.componentInstance.name).toEqual('SocialTwitter');
  });

  it('should render facebook icon', () => {
    component.platform = 'fb';

    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('cm-icon'));

    expect(icon).toBeTruthy();
    expect(icon.componentInstance.name).toEqual('SocialFacebook');
  });

  [{ url: 'https://fb.com/user/john.doe/', expected: 'john.doe' }].forEach(({ url, expected }) => {
    it(`should strip the username from ${url} link`, () => {
      const input = fixture.debugElement.query(By.css('input'));
      const event = {
        target: {
          value: url,
        },
      };
      input.triggerEventHandler('input', event);

      expect(event.target.value).toEqual(expected);
    });
  });
});

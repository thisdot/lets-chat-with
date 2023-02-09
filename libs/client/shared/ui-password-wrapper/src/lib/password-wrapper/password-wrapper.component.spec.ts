import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { InputDirective } from '@conf-match/client/shared/ui-input';
import { ClientSharedUiPasswordWrapperModule } from './../client-shared-ui-password-wrapper.module';
import { getTranslocoTestingModule } from '@conf-match/client/shared/testing/util-testing';

@Component({
  selector: 'cm-password-wrapper-test',
  template: `
    <cm-password-wrapper>
      <input cmInput />
    </cm-password-wrapper>
  `,
})
class PasswordWrapperTestComponent {}

describe('PasswordWrapperComponent', () => {
  let component: PasswordWrapperTestComponent;
  let fixture: ComponentFixture<PasswordWrapperTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InputDirective, PasswordWrapperTestComponent],
      imports: [
        SharedUiIconsModule,
        ClientSharedUiPasswordWrapperModule,
        getTranslocoTestingModule(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordWrapperTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not have the reveal button rendered by default', () => {
    const button = fixture.debugElement.query(By.css('button'));

    expect(window.getComputedStyle(button.nativeElement).display).toEqual('none');
  });

  it('should have the reveal button rendered, if the input has a value', () => {
    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.value = 'Test';
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));

    expect(window.getComputedStyle(button.nativeElement).display).toEqual('block');
  });

  it('should add input class to the input', () => {
    const input = fixture.debugElement.query(By.css('.cm-password-wrapper__input'));

    expect(input).toBeTruthy();
  });

  it('should add passsword type to the input', () => {
    const input = fixture.debugElement.query(By.css('input'));

    expect(input.nativeElement.type).toEqual('password');
  });

  it('should change input type to text when the icon is clicked', () => {
    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();

    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.type).toEqual('text');
  });
});

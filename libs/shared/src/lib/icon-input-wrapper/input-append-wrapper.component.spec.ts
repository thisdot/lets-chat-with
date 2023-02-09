import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {
  InputAppendWrapperComponent,
  InputPrefixDirective,
  InputSuffixDirective,
} from './input-append-wrapper.component';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { InputDirective } from '@conf-match/client/shared/ui-input';
import { By } from '@angular/platform-browser';
import { getTranslocoTestingModule } from '@conf-match/client/shared/testing/util-testing';

@Component({
  template: `
    <cm-input-append-wrapper>
      <cm-icon cmInputPrefix [name]="icon" size="xl"></cm-icon>
      <input cmInput />
    </cm-input-append-wrapper>
  `,
})
class IconInputWrapperTestComponent {
  icon: string;
}

@Component({
  template: `
    <cm-input-append-wrapper>
      <input cmInput />
      <cm-icon cmInputSuffix [name]="icon" size="xl"></cm-icon>
    </cm-input-append-wrapper>
  `,
})
class IconInputWrapperTestSuffixComponent {
  icon: string;
}

describe('InputAppendWrapperComponent', () => {
  let component: IconInputWrapperTestComponent;
  let fixture: ComponentFixture<IconInputWrapperTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        InputAppendWrapperComponent,
        InputDirective,
        IconInputWrapperTestComponent,
        IconInputWrapperTestSuffixComponent,
        InputPrefixDirective,
        InputSuffixDirective,
      ],
      imports: [SharedUiIconsModule, getTranslocoTestingModule()],
    }).compileComponents();
  }));

  it('should create the component', () => {
    fixture = TestBed.createComponent(IconInputWrapperTestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should add default class to the input', () => {
    fixture = TestBed.createComponent(IconInputWrapperTestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('cm-input-append-wrapper'));

    expect(input).toBeTruthy();
  });

  it('should add prefix class to the input', () => {
    fixture = TestBed.createComponent(IconInputWrapperTestComponent);

    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('.cm-input-append-wrapper--prefix'));

    expect(input).toBeTruthy();
  });

  it('should add suffix class to the input', () => {
    fixture = TestBed.createComponent(IconInputWrapperTestSuffixComponent);

    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('.cm-input-append-wrapper--suffix'));

    expect(input).toBeTruthy();
  });
});

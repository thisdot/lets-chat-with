import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextFieldWrapperComponent } from './text-field-wrapper.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  selector: 'cm-text-field-wrapper-test',
  template: `
    <cm-text-field-wrapper [label]="label" [errors]="errors" [info]="info" [name]="name">
      <input />
    </cm-text-field-wrapper>
  `,
})
class TextFieldWrapperTestComponent {
  label = '';
  errors: string[] = [];
  info = '';
  name = '';
}

describe('TextFieldWrapperComponent', () => {
  let component: TextFieldWrapperTestComponent;
  let fixture: ComponentFixture<TextFieldWrapperTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TextFieldWrapperComponent, TextFieldWrapperTestComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFieldWrapperTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render a label', () => {
    component.label = 'Label';

    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('.cm-text-field-wrapper__label'));
    expect(label).toBeTruthy();
    expect(label.nativeElement.innerHTML).toContain('Label');
  });

  it('should render errors', () => {
    component.errors = ['first', 'second'];

    fixture.detectChanges();

    const errors = fixture.debugElement.nativeElement.querySelectorAll(
      '.cm-text-field-wrapper__errors__error'
    );
    expect(errors).toBeTruthy();

    expect(errors.length).toEqual(2);

    const [first, second] = errors;
    expect(first.innerHTML).toEqual('first');
    expect(second.innerHTML).toEqual('second');
  });

  it('should render additional info', () => {
    component.info = 'Additional info';

    fixture.detectChanges();

    const info = fixture.debugElement.query(By.css('.cm-text-field-wrapper__info'));
    expect(info).toBeTruthy();
    expect(info.nativeElement.innerHTML).toContain('Additional info');
  });
});

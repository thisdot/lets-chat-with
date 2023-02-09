import { Component } from '@angular/core';
import { TextareaDirective } from './textarea.directive';

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'cm-textarea-directive-test',
  template: ` <textarea cmTextarea></textarea> `,
})
export class TextareaDirectiveTestComponent {}

describe('TextareaDirective', () => {
  let component: TextareaDirectiveTestComponent;
  let fixture: ComponentFixture<TextareaDirectiveTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TextareaDirective, TextareaDirectiveTestComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaDirectiveTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add cm-textarea class to the textarea element', () => {
    const textarea = fixture.debugElement.query(By.css('textarea'));

    expect(textarea.nativeElement.classList.contains('cm-textarea')).toBe(true);
  });
});

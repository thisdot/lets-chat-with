import { Component } from '@angular/core';
import { InputDirective } from './input.directive';

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'cm-input-directive-test',
  template: ` <input cmInput /> `,
})
export class InputDirectiveTestComponent {}

describe('InputDirective', () => {
  let component: InputDirectiveTestComponent;
  let fixture: ComponentFixture<InputDirectiveTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InputDirective, InputDirectiveTestComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDirectiveTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add cm-input class to the input element', () => {
    const input = fixture.debugElement.query(By.css('input'));

    expect(input.nativeElement.classList.contains('cm-input')).toBe(true);
  });
});

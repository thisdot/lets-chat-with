import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextareaWrapperComponent } from './textarea-wrapper.component';
import { CounterComponent } from '../counter/counter.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TextareaDirective } from '../textarea/textarea.directive';

@Component({
  selector: 'cm-textarea-wrapper-test',
  template: `
    <cm-textarea-wrapper>
      <textarea cmTextarea [attr.maxlength]="maxLength"></textarea>
    </cm-textarea-wrapper>
  `,
})
export class TextareaWrapperTestComponent {
  maxLength: number;
}

describe('TextareaWrapperComponent', () => {
  let component: TextareaWrapperTestComponent;
  let fixture: ComponentFixture<TextareaWrapperTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        CounterComponent,
        TextareaDirective,
        TextareaWrapperComponent,
        TextareaWrapperTestComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaWrapperTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not render counter by default', () => {
    const wrapper = fixture.debugElement.query(By.css('cm-textarea-wrapper'));
    const counter = wrapper.query(By.css('cm-counter'));

    expect(counter).toBeFalsy();
  });

  it('should render the counter, if maxlength is provided', () => {
    component.maxLength = 20;
    fixture.detectChanges();

    const wrapper = fixture.debugElement.query(By.css('cm-textarea-wrapper'));
    // As if the element was created with the maxlength attribute set
    wrapper.componentInstance.ngAfterContentInit();

    fixture.detectChanges();

    const counter = wrapper.query(By.css('cm-counter'));

    expect(counter).toBeTruthy();
    expect(counter.nativeElement.innerText).toEqual('0 / 20');
  });

  it('should change counter on typing', () => {
    component.maxLength = 20;
    fixture.detectChanges();

    const wrapper = fixture.debugElement.query(By.css('cm-textarea-wrapper'));
    // As if the element was created with the maxlength attribute set
    wrapper.componentInstance.ngAfterContentInit();

    fixture.detectChanges();

    const textarea = fixture.debugElement.query(By.css('textarea'));
    textarea.triggerEventHandler('input', { target: { value: 'abc' } });

    fixture.detectChanges();

    const counter = wrapper.query(By.css('cm-counter'));
    expect(counter.nativeElement.innerText).toEqual('3 / 20');
  });
});

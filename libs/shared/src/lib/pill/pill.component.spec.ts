import { TestBed, waitForAsync } from '@angular/core/testing';
import { PillComponent } from './pill.component';
import { FormsModule } from '@angular/forms';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <cm-pill
      [(ngModel)]="model"
      [trueValue]="trueValue"
      [falseValue]="falseValue"
      [disabled]="disabled"
      (tryUpdateWhenDisabled)="tryUpdateWhenDisabled()"
    >
      Checkbox Pill
    </cm-pill>
  `,
})
class TestCheckboxPillComponent {
  trueValue: any;
  falseValue: any;
  model: any;
  disabled: boolean;
  tryUpdateWhenDisabled() {}
}

@Component({
  template: ` <cm-pill [(ngModel)]="model" [disabled]="disabled"> Checkbox Pill </cm-pill> `,
})
class TestCheckboxWithoutDefaultPillComponent {
  model: any;
  disabled: boolean;
}

@Component({
  template: `
    <cm-pill #pill1 role="button" tabindex="0"> pill1 </cm-pill>
    <cm-pill #pill2 role="button" tabindex="0"> pill2 </cm-pill>
  `,
})
class TestKeyboardPillComponent {
  @ViewChild('pill1', { read: ElementRef }) pill1: ElementRef;
  @ViewChild('pill2', { read: ElementRef }) pill2: ElementRef;
}

describe('CheckboxPillComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestCheckboxPillComponent,
        PillComponent,
        TestKeyboardPillComponent,
        TestCheckboxWithoutDefaultPillComponent,
      ],
      imports: [FormsModule],
    }).compileComponents();
  }));

  it('should create the Checkbox Pill', () => {
    const fixture = TestBed.createComponent(TestCheckboxPillComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should apply the primary class by default', () => {
    const fixture = TestBed.createComponent(PillComponent);

    fixture.detectChanges();

    expect(fixture.debugElement.classes['cm-pill']).toBe(true);
    expect(fixture.debugElement.classes['cm-pill--primary']).toBe(true);
  });

  it('should apply the secondary class when type is secondary', () => {
    const fixture = TestBed.createComponent(PillComponent);

    fixture.componentInstance.type = 'secondary';
    fixture.detectChanges();

    expect(fixture.debugElement.classes['cm-pill']).toBe(true);
    expect(fixture.debugElement.classes['cm-pill--secondary']).toBe(true);
  });

  it('should apply the active class when keypress enter or space', () => {
    const fixture = TestBed.createComponent(TestKeyboardPillComponent);
    const enter = new KeyboardEvent('keypress', {
      key: 'Enter',
    });
    const space = new KeyboardEvent('keypress', {
      key: ' ',
    });

    fixture.detectChanges();
    const pill1 = fixture.componentInstance.pill1;
    const pill2 = fixture.componentInstance.pill2;

    expect(pill1.nativeElement.classList.contains('cm-pill')).toBe(true);
    expect(pill1.nativeElement.classList.contains('cm-pill--active')).toBe(false);
    expect(pill2.nativeElement.classList.contains('cm-pill')).toBe(true);
    expect(pill2.nativeElement.classList.contains('cm-pill--active')).toBe(false);

    pill1.nativeElement.dispatchEvent(enter);
    fixture.detectChanges();
    expect(pill1.nativeElement.classList.contains('cm-pill')).toBe(true);
    expect(pill1.nativeElement.classList.contains('cm-pill--active')).toBe(true);
    pill1.nativeElement.dispatchEvent(enter);
    fixture.detectChanges();
    expect(pill1.nativeElement.classList.contains('cm-pill')).toBe(true);
    expect(pill1.nativeElement.classList.contains('cm-pill--active')).toBe(false);

    pill2.nativeElement.dispatchEvent(space);
    fixture.detectChanges();
    expect(pill2.nativeElement.classList.contains('cm-pill')).toBe(true);
    expect(pill2.nativeElement.classList.contains('cm-pill--active')).toBe(true);
    pill2.nativeElement.dispatchEvent(space);
    fixture.detectChanges();
    expect(pill2.nativeElement.classList.contains('cm-pill')).toBe(true);
    expect(pill2.nativeElement.classList.contains('cm-pill--active')).toBe(false);
  });

  it('should apply the active class if the label is clicked', () => {
    const fixture = TestBed.createComponent(PillComponent);

    fixture.componentInstance.trueValue = 'value';
    fixture.detectChanges();

    const label = fixture.debugElement.nativeElement.querySelector('label');
    label.click();
    fixture.detectChanges();

    expect(fixture.debugElement.classes['cm-pill']).toBe(true);
    expect(fixture.debugElement.classes['cm-pill--active']).toBe(true);
  });

  it('should render with the active class if ngModel value is equal to the default trueValue', async () => {
    const fixture = TestBed.createComponent(TestCheckboxWithoutDefaultPillComponent);

    fixture.componentInstance.model = true;
    fixture.detectChanges();

    await fixture.whenStable();

    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('cm-pill')).classes['cm-pill']).toBe(true);
    expect(fixture.debugElement.query(By.css('cm-pill')).classes['cm-pill--active']).toBe(true);

    fixture.componentInstance.model = false;
    fixture.detectChanges();

    await fixture.whenStable();

    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('cm-pill')).classes['cm-pill']).toBe(true);
    expect(fixture.debugElement.query(By.css('cm-pill')).classes['cm-pill--active']).toBeFalsy();
  });

  it('should render with the active class if ngModel value is equal to trueValue', async () => {
    const fixture = TestBed.createComponent(TestCheckboxPillComponent);

    fixture.componentInstance.trueValue = 'value';
    fixture.componentInstance.model = 'value';
    fixture.detectChanges();

    await fixture.whenStable();

    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('cm-pill')).classes['cm-pill']).toBe(true);
    expect(fixture.debugElement.query(By.css('cm-pill')).classes['cm-pill--active']).toBe(true);

    fixture.componentInstance.model = 'new value';
    fixture.detectChanges();

    await fixture.whenStable();

    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('cm-pill')).classes['cm-pill']).toBe(true);
    expect(fixture.debugElement.query(By.css('cm-pill')).classes['cm-pill--active']).toBeFalsy();
  });

  it('should update model to trueValue when Clicked', () => {
    const fixture = TestBed.createComponent(TestCheckboxPillComponent);

    fixture.componentInstance.trueValue = 'trueValue';
    fixture.componentInstance.falseValue = 'falseValue';
    fixture.componentInstance.model = '';

    fixture.detectChanges();

    const checkbox = fixture.debugElement.nativeElement.querySelector('input');
    checkbox.click();

    expect(fixture.componentInstance.model).toBe('trueValue');

    checkbox.click();

    expect(fixture.componentInstance.model).toBe('falseValue');
  });

  it('should support disabling', async () => {
    const fixture = TestBed.createComponent(TestCheckboxPillComponent);

    fixture.componentInstance.disabled = true;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const pill = fixture.debugElement.query(By.css('cm-pill'));
    const input = pill.query(By.css('input'));

    expect(input.nativeElement.disabled).toBe(true);
  });

  it('should emit tryUpdateOnDisabled correctly', async () => {
    const fixture = TestBed.createComponent(TestCheckboxPillComponent);
    spyOn(fixture.componentInstance, 'tryUpdateWhenDisabled');

    fixture.componentInstance.disabled = true;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const pill = fixture.debugElement.query(By.css('cm-pill'));
    const input = pill.query(By.css('input'));
    expect(input.nativeElement.disabled).toBe(true);

    expect(fixture.componentInstance.tryUpdateWhenDisabled).not.toHaveBeenCalled();
    const mouseEvt = document.createEvent('MouseEvent');
    mouseEvt.initEvent('mousedown', true, true);

    input.nativeElement.dispatchEvent(mouseEvt);
    expect(fixture.componentInstance.tryUpdateWhenDisabled).toHaveBeenCalled();
  });
});

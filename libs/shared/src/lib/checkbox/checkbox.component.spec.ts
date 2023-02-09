import { Component, OnInit, ViewChild } from '@angular/core';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';

function getCheckboxElem(fixture: ComponentFixture<any>) {
  return fixture.debugElement.query(By.css('input'));
}

function getLabelElem(fixture: ComponentFixture<any>) {
  return fixture.debugElement.query(By.css('.label'));
}

function toggleCheckbox(fixture: ComponentFixture<any>) {
  const input = getCheckboxElem(fixture);
  const clickEvt = document.createEvent('MouseEvent');
  clickEvt.initEvent('click', true, true);
  input.nativeElement.dispatchEvent(clickEvt);
}

function clickButton(fixture: ComponentFixture<any>) {
  const button = fixture.debugElement.query(By.css('button'));
  const clickEvt = document.createEvent('MouseEvent');
  clickEvt.initEvent('click', true, true);
  button.nativeElement.dispatchEvent(clickEvt);
}

@Component({
  template: `
    <form [formGroup]="myForm" (ngSubmit)="submit()">
      <cm-checkbox formControlName="cmCheckbox" id="checkbox1"></cm-checkbox>
      <button type="submit"></button>
    </form>
  `,
})
class TestCheckboxReactiveComponent implements OnInit {
  myForm: UntypedFormGroup;
  checkboxValue: boolean;

  @ViewChild(CheckboxComponent) checkboxComp: CheckboxComponent;

  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      cmCheckbox: [true],
    });
  }

  submit() {
    this.checkboxValue = (this.myForm.controls.cmCheckbox as any).value;
  }
}

@Component({
  template: ` <cm-checkbox [(ngModel)]="checkboxValue" id="checkbox2"></cm-checkbox> `,
})
class TestCheckboxTemplateComponent {
  @ViewChild(CheckboxComponent) checkboxComp: CheckboxComponent;
  checkboxValue = false;

  constructor() {}
}

describe('CheckboxComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxComponent],
    }).compileComponents();
  }));

  it('should create the checkbox', () => {
    const fixture = TestBed.createComponent(CheckboxComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should be unchecked and enabled by default', () => {
    const fixture = TestBed.createComponent(CheckboxComponent);

    fixture.detectChanges();

    expect(fixture.componentInstance.value).toBe(false);
    expect(fixture.componentInstance.disabled).toBe(false);
  });

  it('should be able set id and value to the underlying input', () => {
    const fixture = TestBed.createComponent(CheckboxComponent);

    fixture.componentInstance.id = 'checkboxID';
    fixture.detectChanges();

    expect(getCheckboxElem(fixture).nativeElement.id).toEqual('checkboxID');
  });

  it('should be able set label to the underlying label span', () => {
    const fixture = TestBed.createComponent(CheckboxComponent);

    fixture.componentInstance.label = 'checkboxLabel';
    fixture.detectChanges();

    expect(getLabelElem(fixture).nativeElement.innerText).toEqual('checkboxLabel');
  });

  it('should be toggle checked status when clicked', () => {
    const fixture = TestBed.createComponent(CheckboxComponent);

    fixture.detectChanges();

    toggleCheckbox(fixture);
    expect(fixture.componentInstance.value).toBe(true);
    toggleCheckbox(fixture);
    expect(fixture.componentInstance.value).toBe(false);
  });
});

describe('CheckboxComponent reactive', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CheckboxComponent, TestCheckboxReactiveComponent],
    }).compileComponents();
  }));

  it('should create the reactive checkbox component', () => {
    const fixture = TestBed.createComponent(TestCheckboxReactiveComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the reactive checkbox component', () => {
    const fixture = TestBed.createComponent(TestCheckboxReactiveComponent);
    const app = fixture.componentInstance;

    app.checkboxValue = true;
    fixture.detectChanges();
    const logs: boolean[] = [];
    // register valueChange
    app.myForm.get('cmCheckbox').valueChanges.subscribe((newValue) => {
      logs.push(newValue);
    });

    expect(getCheckboxElem(fixture).nativeElement.id).toEqual('checkbox1');
    expect(getCheckboxElem(fixture).nativeElement.checked).toBe(true);

    toggleCheckbox(fixture);
    clickButton(fixture);
    fixture.detectChanges();

    expect(app.checkboxValue).toBe(false);
    expect(logs).toEqual([false]);
  });
});

describe('CheckboxComponent template', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CheckboxComponent, TestCheckboxTemplateComponent],
    }).compileComponents();
  }));

  it('should create the template checkbox component', () => {
    const fixture = TestBed.createComponent(TestCheckboxTemplateComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the template checkbox component', waitForAsync(async () => {
    const fixture = TestBed.createComponent(TestCheckboxTemplateComponent);
    const app = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
    const checkboxElem = getCheckboxElem(fixture);
    expect(checkboxElem.nativeElement.id).toEqual('checkbox2');
    expect(checkboxElem.nativeElement.checked).toBe(false);

    toggleCheckbox(fixture);
    fixture.detectChanges();

    await fixture.whenStable();
    expect(app.checkboxValue).toBe(true);
  }));
});

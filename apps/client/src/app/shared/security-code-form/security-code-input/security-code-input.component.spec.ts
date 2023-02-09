import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SecurityCodeInputComponent } from './security-code-input.component';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { SharedModule } from '@conf-match/shared';
import { FormsModule } from '@angular/forms';
import { ClientSharedUiInputModule } from '@conf-match/client/shared/ui-input';

@Component({
  selector: 'cm-test-security-code-input',
  template: `
    <cm-security-code-input
      [invalid]="invalid"
      [securityCodeSize]="securityCodeSize"
      [disabled]="disabled"
      [(ngModel)]="code"
    ></cm-security-code-input>
  `,
})
class TestSecurityCodeInputComponent {
  securityCodeSize: number;
  invalid = false;
  code: string;
  disabled = false;

  @ViewChild(SecurityCodeInputComponent) sciComp: SecurityCodeInputComponent;
}

describe('SecurityCodeInputComponent', () => {
  let component: SecurityCodeInputComponent;
  let fixture: ComponentFixture<SecurityCodeInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, ClientSharedUiInputModule],
      declarations: [SecurityCodeInputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityCodeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should write a value', () => {
    const code = '123456';
    component.writeValue(code);

    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.css('input'));

    inputs.forEach((input: DebugElement, idx: number) => {
      expect(input.nativeElement.value).toEqual(code[idx]);
    });
  });

  it('should disable the input', () => {
    component.setDisabledState(true);

    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.css('input'));

    inputs.forEach((input: DebugElement) => {
      expect(input.nativeElement.disabled).toEqual(true);
    });
  });

  it('should return value', () => {
    component.writeValue('123456');

    expect((component as any)._getValue()).toEqual('123456');
  });

  it('should render invalid', () => {
    component.invalid = true;
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.css('input'));

    inputs.forEach((input: DebugElement) => {
      expect(input.classes['cm-input--invalid']).toBeTruthy();
    });
  });
});

function sendKeysToInputs(data: string, inputs: DebugElement[]) {
  for (let i = 0; i < data.length; i++) {
    if (i < inputs.length) {
      inputs[i].nativeElement.value = data[i];
    } else {
      inputs[i].nativeElement.value = '';
    }
    inputs[i].nativeElement.dispatchEvent(
      new Event('input', {
        bubbles: true,
        cancelable: true,
      })
    );
  }
}

function sendKeyboardEvent(keyCode: number, target: HTMLInputElement) {
  const keyboardEvent = document.createEvent('KeyboardEvent');
  const initMethod =
    typeof (keyboardEvent as any).initKeyboardEvent !== 'undefined'
      ? 'initKeyboardEvent'
      : 'initKeyEvent';

  keyboardEvent[initMethod](
    'keydown', // event type: keydown, keyup, keypress
    true, // bubbles
    true, // cancelable
    window, // view: should be window
    false, // ctrlKey
    false, // altKey
    false, // shiftKey
    false, // metaKey
    keyCode, // keyCode: unsigned long - the virtual key code, else 0
    0 // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
  );
  target.dispatchEvent(keyboardEvent);
}

describe('TestSecurityCodeInputComponent', () => {
  let component: TestSecurityCodeInputComponent;
  let fixture: ComponentFixture<TestSecurityCodeInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, ClientSharedUiInputModule],
      declarations: [SecurityCodeInputComponent, TestSecurityCodeInputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSecurityCodeInputComponent);
    component = fixture.componentInstance;
  });

  it('test', () => {
    expect(true).toBeTrue();
  });

  it('should two way bind correctly to SecurityCodeInputComponent', async () => {
    component.securityCodeSize = 6;
    component.code = '123456';
    fixture.detectChanges();
    await fixture.whenStable();
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    inputs.forEach((input: DebugElement, idx: number) => {
      expect(input.nativeElement.value).toEqual(component.code[idx]);
    });

    component.code = '124567';
    fixture.detectChanges();
    await fixture.whenStable();
    inputs.forEach((input: DebugElement, idx: number) => {
      expect(input.nativeElement.value).toEqual(component.code[idx]);
    });

    component.code = '78901';
    fixture.detectChanges();
    await fixture.whenStable();
    inputs.forEach((input: DebugElement, idx: number) => {
      if (idx < component.code.length) {
        expect(input.nativeElement.value).toEqual(component.code[idx]);
      } else {
        expect(input.nativeElement.value).toEqual('');
      }
    });

    let newCode = '135789';
    sendKeysToInputs(newCode, inputs);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.code).toEqual(newCode);

    newCode = '24680';
    sendKeysToInputs(newCode, inputs);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.code).toEqual(newCode + '9');
  });

  it('should be able to bind size correctly', async () => {
    component.securityCodeSize = 5;
    component.code = '12345';
    fixture.detectChanges();
    await fixture.whenStable();
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    inputs.forEach((input: DebugElement, idx: number) => {
      expect(input.nativeElement.value).toEqual(component.code[idx]);
    });

    const newCode = '78901';
    sendKeysToInputs(newCode, inputs);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.code).toEqual(newCode);
  });

  it('should render invalid', () => {
    component.invalid = true;
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.css('input'));

    inputs.forEach((input: DebugElement) => {
      expect(input.classes['cm-input--invalid']).toBeTruthy();
    });
  });

  it('should disable the input', async () => {
    component.disabled = true;

    fixture.detectChanges();
    await fixture.whenStable();

    const inputs = fixture.debugElement.queryAll(By.css('input'));

    inputs.forEach((input: DebugElement) => {
      expect(input.nativeElement.disabled).toEqual(true);
    });
  });

  it('input should focus on the next input', async () => {
    component.securityCodeSize = 6;
    fixture.detectChanges();
    await fixture.whenStable();
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    inputs[0].nativeElement.focus();
    sendKeyboardEvent(49, inputs[0].nativeElement);
    expect(document.activeElement).toEqual(inputs[1].nativeElement);
    sendKeyboardEvent(50, inputs[1].nativeElement);
    expect(document.activeElement).toEqual(inputs[2].nativeElement);
    sendKeyboardEvent(51, inputs[2].nativeElement);
    expect(document.activeElement).toEqual(inputs[3].nativeElement);
    sendKeyboardEvent(52, inputs[3].nativeElement);
    expect(document.activeElement).toEqual(inputs[4].nativeElement);
    sendKeyboardEvent(53, inputs[4].nativeElement);
    expect(document.activeElement).toEqual(inputs[5].nativeElement);
    sendKeyboardEvent(54, inputs[5].nativeElement);
    // should keep the focus since this is the last input
    expect(document.activeElement).toEqual(inputs[5].nativeElement);
  });

  it('backspace should focus on the previous input', async () => {
    component.securityCodeSize = 6;
    component.code = '123456';
    fixture.detectChanges();
    await fixture.whenStable();
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    inputs[5].nativeElement.focus();
    sendKeyboardEvent(8, inputs[5].nativeElement);
    expect(document.activeElement).toEqual(inputs[4].nativeElement);
    sendKeyboardEvent(8, inputs[4].nativeElement);
    expect(document.activeElement).toEqual(inputs[3].nativeElement);
    sendKeyboardEvent(8, inputs[3].nativeElement);
    expect(document.activeElement).toEqual(inputs[2].nativeElement);
    sendKeyboardEvent(8, inputs[2].nativeElement);
    expect(document.activeElement).toEqual(inputs[1].nativeElement);
    sendKeyboardEvent(8, inputs[1].nativeElement);
    expect(document.activeElement).toEqual(inputs[0].nativeElement);
    sendKeyboardEvent(8, inputs[0].nativeElement);
    // should keep the focus since this is the first input
    expect(document.activeElement).toEqual(inputs[0].nativeElement);
  });

  it('should only be able to input valid char in the input', async () => {
    component.securityCodeSize = 6;
    component.code = '123456';
    fixture.detectChanges();
    await fixture.whenStable();
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    inputs[0].nativeElement.focus();
    sendKeyboardEvent(173, inputs[0].nativeElement);
    expect(inputs[0].nativeElement.value).toEqual('1');
  });

  it('should be able to copy paste data in the input', async () => {
    component.securityCodeSize = 6;
    fixture.detectChanges();
    await fixture.whenStable();
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    const dt = new DataTransfer();
    const pasteEvent = new ClipboardEvent('paste', { clipboardData: dt });
    pasteEvent.clipboardData.setData('text/plain', '123456');
    inputs[0].nativeElement.focus();
    inputs[0].nativeElement.dispatchEvent(pasteEvent);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(inputs[0].nativeElement.value).toEqual('1');
    expect(inputs[1].nativeElement.value).toEqual('2');
    expect(inputs[2].nativeElement.value).toEqual('3');
    expect(inputs[3].nativeElement.value).toEqual('4');
    expect(inputs[4].nativeElement.value).toEqual('5');
    expect(inputs[5].nativeElement.value).toEqual('6');
    expect(component.code).toEqual('123456');
  });
});

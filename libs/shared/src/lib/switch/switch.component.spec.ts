import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SwitchComponent } from './switch.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('SwitchComponent', () => {
  let component: SwitchComponent;
  let fixture: ComponentFixture<SwitchComponent>;
  let input: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SwitchComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    input = fixture.debugElement.query(By.css('input'));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the default value set to off', () => {
    expect(component.on).toBeFalsy();
    expect(input.nativeElement.checked).toBeFalsy();
  });

  it('should have the checkbox checked', () => {
    component.on = true;

    fixture.detectChanges();

    expect(input.nativeElement.checked).toBeTruthy();
  });

  it('should have the checkbox not checked', () => {
    component.on = false;

    fixture.detectChanges();

    expect(input.nativeElement.checked).toBeFalsy();
  });

  it('should have the checkbox disabled', () => {
    component.disabled = true;

    fixture.detectChanges();

    expect(input.nativeElement.disabled).toBeTruthy();
  });

  it('should have the aria-label', () => {
    component.label = 'Switch';

    fixture.detectChanges();

    expect(input.nativeElement.getAttribute('aria-label')).toBe('Switch');
  });

  it('should call registerOnChange callback on checkbox change', () => {
    const cb = jasmine.createSpy();
    component.registerOnChange(cb);

    input.triggerEventHandler('change', null);

    expect(cb).toHaveBeenCalled();
  });
});

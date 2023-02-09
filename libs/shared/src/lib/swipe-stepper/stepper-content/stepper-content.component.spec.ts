import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StepperContentComponent, ContentPosition } from './stepper-content.component';
import { ElementRef } from '@angular/core';
import { getTranslocoTestingModule } from '@conf-match/client/shared/testing/util-testing';

describe('StepperContentComponent', () => {
  let component: StepperContentComponent;
  let fixture: ComponentFixture<StepperContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule()],
      declarations: [StepperContentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add contain element ref', () => {
    expect(component.ref).toBeTruthy();
    expect(component.ref instanceof ElementRef).toBe(true);
  });

  it('should have main class', () => {
    expect(fixture.debugElement.classes['cm-stepper-content']).toBe(true);
  });

  it('should have focused class, if focused', () => {
    component.position = ContentPosition.Focused;

    fixture.detectChanges();

    expect(fixture.debugElement.classes['cm-stepper-content--focused']).toBe(true);
  });

  it('should have left class, if left', () => {
    component.position = ContentPosition.Left;

    fixture.detectChanges();

    expect(fixture.debugElement.classes['cm-stepper-content--left']).toBe(true);
  });

  it('should have right class, if right', () => {
    component.position = ContentPosition.Right;

    fixture.detectChanges();

    expect(fixture.debugElement.classes['cm-stepper-content--right']).toBe(true);
  });

  it('should have hidden class, if hidden', () => {
    component.position = ContentPosition.Hidden;

    fixture.detectChanges();

    expect(fixture.debugElement.classes['cm-stepper-content--hidden']).toBe(true);
  });
});

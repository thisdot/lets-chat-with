import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { SwipeStepperComponent } from './swipe-stepper.component';
import { Component, ViewChild } from '@angular/core';
import { StepperContentComponent } from './stepper-content/stepper-content.component';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'cm-host',
  template: `
    <cm-swipe-stepper>
      <cm-stepper-content>1</cm-stepper-content>
      <cm-stepper-content>2</cm-stepper-content>
      <cm-stepper-content>3</cm-stepper-content>
      <cm-stepper-content>4</cm-stepper-content>
    </cm-swipe-stepper>
  `,
  styles: [
    `
      cm-swipe-stepper {
        width: 500px !important;
        display: block;
      }
    `,
  ],
})
export class HostComponent {
  @ViewChild(SwipeStepperComponent) stepper: SwipeStepperComponent;
}

const getPrivateProp = (obj: any, prop: string) => obj[prop];

const xEvent = (clientX: number) => ({ clientX } as any as MouseEvent);

const swipeHOF = (cmp: SwipeStepperComponent) => (from: number, to: number) => {
  cmp.onContentTouchStart(xEvent(from));
  cmp.onDocumentTouchMove(xEvent((to - from) / 4));
  cmp.onDocumentTouchMove(xEvent((to - from) / 2));
  cmp.onDocumentTouchMove(xEvent(to));
  cmp.onDocumentTouchEnd();
};

const focusContentHOC = (fixture: ComponentFixture<HostComponent>) => (idx: number) => {
  const component = fixture.componentInstance;
  (component.stepper as any)._focusedIdx = idx;
  (component.stepper as any)._updatePositions();
  fixture.detectChanges();
};

describe('SwipeStepperComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let swipe: (from: number, to: number) => void;
  let focusContent: (idx: number) => void;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SwipeStepperComponent, StepperContentComponent, HostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    swipe = swipeHOF(component.stepper);
    focusContent = focusContentHOC(fixture);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    expect(component.stepper).toBeTruthy();
  });

  it('should have default focused content index equal to zero', () => {
    expect(getPrivateProp(component.stepper, '_focusedIdx')).toEqual(0);
  });

  it('should have a right swipe direction', () => {
    swipe(0, 100);

    expect(getPrivateProp(component.stepper, '_direction')).toEqual('right');
  });

  it('should have a left swipe direction', () => {
    swipe(0, -100);

    expect(getPrivateProp(component.stepper, '_direction')).toEqual('left');
  });

  it('should swipe back, if threshold is not reached', () => {
    const swipeBackSpy = spyOn(component.stepper as any, '_swipeBack');

    swipe(0, 50);
    swipe(0, -50);

    expect(swipeBackSpy).toHaveBeenCalledTimes(2);
  });

  it('should perform a left swipe', () => {
    const swipeSpy = spyOn(component.stepper as any, '_swipe');
    swipe(0, -200);

    expect(swipeSpy).toHaveBeenCalledWith('left');
  });

  it('should perform a right swipe', () => {
    // Since the focused content idx is 0 by default
    focusContent(1);

    const swipeSpy = spyOn(component.stepper as any, '_swipe');
    swipe(0, 200);

    expect(swipeSpy).toHaveBeenCalledWith('right');
  });

  it('should not perform a right swipe, if the focused is the first one', () => {
    const swipeSpy = spyOn(component.stepper as any, '_swipe');
    const swipeBackSpy = spyOn(component.stepper as any, '_swipeBack');

    swipe(0, 200);

    expect(swipeSpy).not.toHaveBeenCalled();
    expect(swipeBackSpy).toHaveBeenCalled();
  });

  it('should not perform a left swipe, if the focused is the last one', () => {
    focusContent(component.stepper.children.length - 1);

    const swipeSpy = spyOn(component.stepper as any, '_swipe');
    const swipeBackSpy = spyOn(component.stepper as any, '_swipeBack');

    swipe(0, -200);

    expect(swipeSpy).not.toHaveBeenCalled();
    expect(swipeBackSpy).toHaveBeenCalled();
  });

  it('swiping should emit a change event', fakeAsync(() => {
    const emitChangeSpy = spyOn(component.stepper.change, 'emit');

    swipe(0, -200);

    tick(1000);

    expect(emitChangeSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        current: 1,
        total: component.stepper.children.length,
      })
    );
  }));

  it('should properly update the content on swipe', fakeAsync(() => {
    swipe(0, -200);
    tick(1000);

    swipe(0, -200);
    tick(1000);

    expect(getPrivateProp(component.stepper, '_focusedIdx')).toEqual(2);

    const content = fixture.debugElement.queryAll(By.css('cm-stepper-content'));
    expect(getPrivateProp(component.stepper, '_left')).toEqual(content[1].componentInstance);
    expect(getPrivateProp(component.stepper, '_focused')).toEqual(content[2].componentInstance);
    expect(getPrivateProp(component.stepper, '_right')).toEqual(content[3].componentInstance);
  }));

  it('should call perform left swipe on swipeLeft call', () => {
    const swipeSpy = spyOn(component.stepper as any, '_swipe');

    component.stepper.swipeLeft();

    expect(swipeSpy).toHaveBeenCalledWith('left');
  });

  it('should call perform right swipe on swipeRight call', () => {
    const swipeSpy = spyOn(component.stepper as any, '_swipe');

    component.stepper.swipeRight();

    expect(swipeSpy).toHaveBeenCalledWith('right');
  });
});

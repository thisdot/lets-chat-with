import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CounterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default count and total set to zero', () => {
    expect(component.count).toEqual(0);
    expect(component.total).toEqual(0);
  });

  it('should set zero reached class when count is equal to 0', () => {
    component.count = 5;
    component.total = 10;

    fixture.detectChanges();

    expect(fixture.debugElement.classes['cm-counter--zero-reached']).toBeFalsy();

    component.count = 0;
    fixture.detectChanges();

    expect(fixture.debugElement.classes['cm-counter--zero-reached']).toBe(true);
  });

  it('should hide background', () => {
    expect(fixture.debugElement.classes['cm-counter--bg']).toBe(true);

    component.background = false;
    fixture.detectChanges();

    expect(fixture.debugElement.classes['cm-counter--bg']).toBeFalsy();
  });
});

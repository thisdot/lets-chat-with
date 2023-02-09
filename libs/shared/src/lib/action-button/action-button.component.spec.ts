import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActionButtonComponent } from './action-button.component';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';

describe('ActionButtonComponent', () => {
  let component: ActionButtonComponent;
  let fixture: ComponentFixture<ActionButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ActionButtonComponent],
      imports: [SharedUiIconsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply default class', () => {
    expect(fixture.debugElement.classes['cm-action-button']).toBeTruthy();
  });

  it('should apply match class', () => {
    fixture.componentInstance.type = 'match';
    fixture.detectChanges();

    expect(fixture.debugElement.classes['cm-action-button--match']).toBeTruthy();
  });

  it('should apply no-match class', () => {
    fixture.componentInstance.type = 'no-match';
    fixture.detectChanges();

    expect(fixture.debugElement.classes['cm-action-button--no-match']).toBeTruthy();
  });

  it('should apply info class', () => {
    fixture.componentInstance.type = 'info';
    fixture.detectChanges();

    expect(fixture.debugElement.classes['cm-action-button--info']).toBeTruthy();
  });

  it('should apply chat class', () => {
    fixture.componentInstance.type = 'chat';
    fixture.detectChanges();

    expect(fixture.debugElement.classes['cm-action-button--chat']).toBeTruthy();
  });

  it('should apply undo class', () => {
    fixture.componentInstance.type = 'undo';
    fixture.detectChanges();

    expect(fixture.debugElement.classes['cm-action-button--undo']).toBeTruthy();
  });
});

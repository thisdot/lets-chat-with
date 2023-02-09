import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpandableComponent } from './expandable.component';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { By } from '@angular/platform-browser';

describe('ExpandableComponent', () => {
  let component: ExpandableComponent;
  let fixture: ComponentFixture<ExpandableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExpandableComponent],
      imports: [SharedUiIconsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not have visibility class modifier, if visible = false', () => {
    component.visible = false;
    fixture.detectChanges();

    expect(fixture.debugElement.classes['cm-expandable--visible']).toBeFalsy();
  });

  it('should not have visibility class modifier, if visible = false', () => {
    component.visible = true;
    fixture.detectChanges();

    expect(fixture.debugElement.classes['cm-expandable--visible']).toBe(true);
  });

  it('should emit visible = true', () => {
    component.visible = false;
    fixture.detectChanges();

    const emitSpy = spyOn(component.toggle, 'emit');
    const header = fixture.debugElement.query(By.css('.cm-expandable__header'));
    header.triggerEventHandler('click', null);

    expect(emitSpy).toHaveBeenCalledWith(true);
  });

  it('should emit visible = false', () => {
    component.visible = true;
    fixture.detectChanges();

    const emitSpy = spyOn(component.toggle, 'emit');
    const header = fixture.debugElement.query(By.css('.cm-expandable__header'));
    header.triggerEventHandler('click', null);

    expect(emitSpy).toHaveBeenCalledWith(false);
  });
});

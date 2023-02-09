import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../shared.module';
import { ModalService } from '../modal.service';
import { TestScheduler } from 'rxjs/testing';

import { InterestsSelectorComponent } from './interests-selector.component';
import { DebugElement } from '@angular/core';

describe('InterestsSelectorComponent', () => {
  let component: InterestsSelectorComponent;
  let fixture: ComponentFixture<InterestsSelectorComponent>;
  let testScheduler: TestScheduler;
  let modalService: ModalService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule.withRoutes([])],
      declarations: [InterestsSelectorComponent],
    }).compileComponents();

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    modalService = TestBed.inject(ModalService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestsSelectorComponent);
    component = fixture.componentInstance;

    component.limit = 4;
    component.interests = [
      { group: 'A', name: 'nameA1', id: 'a1' },
      { group: 'A', name: 'nameA2', id: 'a2' },
      { group: 'A', name: 'nameA3', id: 'a3' },
      { group: 'B', name: 'nameB1', id: 'b1' },
      { group: 'B', name: 'nameB2', id: 'b2' },
      { group: 'C', name: 'nameC1', id: 'c1' },
      { group: 'C', name: 'nameC2', id: 'c2' },
    ];

    component.ngOnChanges({
      interests: true as any,
    });

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should expand all lists, if filters are searched', () => {
    component.visibleGroups.set('A', false);
    component.visibleGroups.set('C', false);

    const searchInput = fixture.debugElement.query(By.css('cm-search-input'));
    searchInput.triggerEventHandler('search', 'the search string');

    expect([...component.visibleGroups.values()].find((s) => !s)).toBeFalsy();
  });

  it('should filter interests', () => {
    const searchInput = fixture.debugElement.query(By.css('cm-search-input'));
    searchInput.triggerEventHandler('search', '1');

    expect(component.interestGroups).toEqual([
      { name: 'A', interests: [{ group: 'A', name: 'nameA1', id: 'a1' }] },
      { name: 'B', interests: [{ group: 'B', name: 'nameB1', id: 'b1' }] },
      { name: 'C', interests: [{ group: 'C', name: 'nameC1', id: 'c1' }] },
    ]);
  });

  it('should have the selected pills enabled while non-selected - disabled, when max selected is reached', async () => {
    component.onInterestStateChange({ group: 'A', name: 'nameA1', id: 'a1' });
    component.onInterestStateChange({ group: 'A', name: 'nameA2', id: 'a2' });
    component.onInterestStateChange({ group: 'A', name: 'nameA3', id: 'a3' });
    component.onInterestStateChange({ group: 'B', name: 'nameB1', id: 'b1' });

    fixture.detectChanges();
    await fixture.whenStable();

    const pills = fixture.debugElement.queryAll(By.css('cm-pill'));
    const selected = ['nameA1', 'nameA2', 'nameA3', 'nameB1'];

    pills.forEach((pill) => {
      if (selected.includes(pill.nativeElement.innerText)) {
        expect(pill.componentInstance.disabled).toBe(false);
      } else {
        expect(pill.componentInstance.disabled).toBe(true);
      }
    });
  });

  it('should call onInterestMouseDown with disabled = true', async () => {
    component.onInterestStateChange({ group: 'A', name: 'nameA1', id: 'a1' });
    component.onInterestStateChange({ group: 'A', name: 'nameA2', id: 'a2' });
    component.onInterestStateChange({ group: 'A', name: 'nameA3', id: 'a3' });
    component.onInterestStateChange({ group: 'B', name: 'nameB1', id: 'b1' });

    fixture.detectChanges();
    await fixture.whenStable();

    const pills = fixture.debugElement.queryAll(By.css('cm-pill'));
    const disabled = pills.find((de: DebugElement) => de.componentInstance.disabled);

    const mouseDownSpy = spyOn(component, 'onInterestMouseDown');
    disabled.triggerEventHandler('mousedown', null);

    expect(mouseDownSpy).toHaveBeenCalledWith(true);
  });

  it('should open the max number reached modal', () => {
    const openModalSpy = spyOn(modalService, 'openFloatingModal');
    component.onInterestMouseDown(true);

    expect(openModalSpy).toHaveBeenCalled();
  });
});

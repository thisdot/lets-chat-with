import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { getTranslocoTestingModule } from '@conf-match/client/shared/testing/util-testing';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { SharedModule } from '../shared.module';

import { ConnectionsSelectorComponent } from './connections-selector.component';

describe('ConnectionsSelectorComponent', () => {
  let component: ConnectionsSelectorComponent;
  let fixture: ComponentFixture<ConnectionsSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([]),
        getTranslocoTestingModule(),
        SharedUiIconsModule,
      ],
      declarations: [ConnectionsSelectorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it("should add connection, if it's not in the set on onConnectionStateChange", () => {
    component.onIdentifierStateChange({ name: 'CEO', id: 'CEO' });

    expect(component.selectedIdentifiers.find((i) => i.id === 'CEO')).toBeTruthy();
  });

  it("should remove connection, if it's in the set on onConnectionStateChange", () => {
    component.selectedIdentifiers.push({ name: 'CEO', id: 'CEO' });
    component.onIdentifierStateChange({ name: 'CEO', id: 'CEO' });

    expect(component.selectedIdentifiers.indexOf({ name: 'CEO', id: 'CEO' }) > -1).toBe(false);
  });

  it("should call onConnectionStateChange on connection click with it's name", () => {
    const changeSpy = spyOn(component.connectionSelect, 'emit');
    component.identifiers = [
      { name: 'CEO', id: 'CEO' },
      { name: 'CTO', id: 'CTO' },
      { name: 'Dev', id: 'Dev' },
    ];

    fixture.detectChanges();

    const pill = fixture.debugElement.queryAll(By.css('cm-pill'));
    const pillInput = pill[0].nativeElement.querySelector('input');
    pillInput.click();

    expect(changeSpy).toHaveBeenCalledWith([{ name: 'CEO', id: 'CEO' }]);
  });

  it('should NOT call onConnectionStateChange on connection click, if the set is full', async () => {
    const changeSpy = spyOn(component.connectionSelect, 'emit');
    component.selectedIdentifiers.push({ name: 'CTO', id: 'CTO' });
    component.selectedIdentifiers.push({ name: 'Dev', id: 'Dev' });
    component.selectedIdentifiers.push({ name: 'QA', id: 'QA' });

    component.limit = 3;

    component.identifiers = [
      { name: 'CEO', id: 'CEO' },
      { name: 'CTO', id: 'CTO' },
      { name: 'Dev', id: 'Dev' },
      { name: 'QA', id: 'QA' },
    ];

    fixture.detectChanges();
    await fixture.whenStable();

    const pill = fixture.debugElement.queryAll(By.css('cm-pill'));
    const pillInput = pill[0].nativeElement.querySelector('input');
    pillInput.click();

    expect(changeSpy).not.toHaveBeenCalled();
  });
});

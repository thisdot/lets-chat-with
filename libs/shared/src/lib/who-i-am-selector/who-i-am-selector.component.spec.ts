import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../shared.module';

import { WhoIAmSelectorComponent } from './who-i-am-selector.component';
import { IdentifierModel } from '@conf-match/api';
import { getTranslocoTestingModule } from '@conf-match/client/shared/testing/util-testing';

const TEST_IDENTIFIERS = {
  CEO: { id: '1', name: 'CEO' } as IdentifierModel,
  CTO: { id: '2', name: 'CTO' } as IdentifierModel,
  DEV: { id: '3', name: 'Dev' } as IdentifierModel,
};

describe('WhoIAmSelectorComponent', () => {
  let component: WhoIAmSelectorComponent;
  let fixture: ComponentFixture<WhoIAmSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule.withRoutes([]), getTranslocoTestingModule()],
      declarations: [WhoIAmSelectorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoIAmSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it("should add identifier, if it's not in the set on onIdentifierStateChange", () => {
    component.onIdentifierStateChange(TEST_IDENTIFIERS.CEO);

    expect(component.selectedIdentifiers.indexOf(TEST_IDENTIFIERS.CEO) > -1).toBe(true);
  });

  it("should remove identifier, if it's in the set on onIdentifierStateChange", () => {
    component.selectedIdentifiers.push(TEST_IDENTIFIERS.CEO);
    component.onIdentifierStateChange(TEST_IDENTIFIERS.CEO);

    expect(component.selectedIdentifiers.indexOf(TEST_IDENTIFIERS.CEO) > -1).toBe(false);
  });

  it("should call onIdentifierStateChange on identifier click with it's name", () => {
    const changeSpy = spyOn(component, 'onIdentifierStateChange');
    component.identifiers = [TEST_IDENTIFIERS.CEO, TEST_IDENTIFIERS.CTO, TEST_IDENTIFIERS.DEV];

    fixture.detectChanges();

    const pill = fixture.debugElement.queryAll(By.css('cm-pill'));
    const pillInput = pill[0].nativeElement.querySelector('input');
    pillInput.click();

    expect(changeSpy).toHaveBeenCalledWith(TEST_IDENTIFIERS.CEO);
  });

  it('should NOT call onIdentifierStateChange on identifier click, if the set is full', async () => {
    const changeSpy = spyOn(component, 'onIdentifierStateChange');
    component.selectedIdentifiers.push(TEST_IDENTIFIERS.CTO);
    component.selectedIdentifiers.push(TEST_IDENTIFIERS.CEO);

    component.limit = 2;

    component.identifiers = [TEST_IDENTIFIERS.CEO, TEST_IDENTIFIERS.CTO, TEST_IDENTIFIERS.DEV];

    fixture.detectChanges();
    await fixture.whenStable();

    const pill = fixture.debugElement.queryAll(By.css('cm-pill'));
    const pillInput = pill[2].nativeElement.querySelector('input');
    pillInput.click();

    expect(changeSpy).not.toHaveBeenCalled();
  });
});

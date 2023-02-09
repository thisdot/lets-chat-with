import { TestBed, waitForAsync } from '@angular/core/testing';
import { EventLogoComponent } from '../event-logo/event-logo.component';
import { ChipComponent } from './chip.component';

describe('ChipComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChipComponent, EventLogoComponent],
    }).compileComponents();
  }));

  it('should create the chip', () => {
    const fixture = TestBed.createComponent(ChipComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should apply the primary class by default', () => {
    const fixture = TestBed.createComponent(ChipComponent);

    fixture.detectChanges();

    expect(fixture.debugElement.classes['cm-chip']).toBe(true);
    expect(fixture.debugElement.classes['cm-chip--primary']).toBe(true);
  });

  it('should apply the secondary class when type is secondary', () => {
    const fixture = TestBed.createComponent(ChipComponent);

    fixture.componentInstance.type = 'secondary';
    fixture.detectChanges();

    expect(fixture.debugElement.classes['cm-chip']).toBe(true);
    expect(fixture.debugElement.classes['cm-chip--secondary']).toBe(true);
  });
});

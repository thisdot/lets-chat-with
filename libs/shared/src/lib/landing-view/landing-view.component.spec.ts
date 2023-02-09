import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LandingViewComponent } from './landing-view.component';
import { By } from '@angular/platform-browser';
import { getTranslocoTestingModule } from '@conf-match/client/shared/testing/util-testing';

describe('LandingViewComponent', () => {
  let component: LandingViewComponent;
  let fixture: ComponentFixture<LandingViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule()],
      declarations: [LandingViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should has main class', () => {
    expect(fixture.debugElement.classes['cm-landing-view']).toBe(true);
  });

  it('should contain main elements', () => {
    const header = fixture.debugElement.query(By.css('.cm-landing-view__header'));
    const content = fixture.debugElement.query(By.css('.cm-landing-view__content'));

    expect(header).toBeTruthy();
    expect(content).toBeTruthy();
  });
});

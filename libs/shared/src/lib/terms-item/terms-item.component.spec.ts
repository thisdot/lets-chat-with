import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TermsItemComponent } from './terms-item.component';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';

describe('TermsItemComponent', () => {
  let component: TermsItemComponent;
  let fixture: ComponentFixture<TermsItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TermsItemComponent],
      imports: [SharedUiIconsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and description', () => {
    const title = 'I will have empathy';
    const text = 'We all express ourselfs differently. Do not judge.';
    component.title = title;
    component.text = text;

    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.cm-terms__content__title')).nativeElement.textContent
    ).toEqual(title);
    expect(
      fixture.debugElement.query(By.css('.cm-terms__content__text')).nativeElement.textContent
    ).toContain(text);
  });

  it('should render the icon', () => {
    component.icon = 'Flash';

    fixture.detectChanges();

    expect(
      fixture.debugElement
        .query(By.css('.cm-terms__icon svg use'))
        .nativeElement.getAttribute('xlink:href')
    ).toContain('#Flash');
  });
});

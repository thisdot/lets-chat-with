import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchInputComponent } from './search-input.component';
import { By } from '@angular/platform-browser';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchInputComponent],
      imports: [SharedUiIconsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have search icon', () => {
    const icon = fixture.debugElement.query(By.css('cm-icon'));

    expect(icon).toBeTruthy();
    expect(icon.componentInstance.name).toEqual('Search');
  });

  it('should ', () => {
    const searchEmitSpy = spyOn(component.search, 'emit');

    const input = fixture.debugElement.query(By.css('input'));
    input.triggerEventHandler('input', {
      target: { value: 'search string' },
    });

    expect(searchEmitSpy).toHaveBeenCalledWith('search string');
  });
});

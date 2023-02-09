import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContextMenuButtonComponent } from './context-menu-button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { By } from '@angular/platform-browser';
import { getTranslocoTestingModule } from '@conf-match/client/shared/testing/util-testing';

describe('ContextMenuButtonComponent', () => {
  let component: ContextMenuButtonComponent;
  let fixture: ComponentFixture<ContextMenuButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedUiIconsModule, getTranslocoTestingModule()],
      declarations: [ContextMenuButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create a button internally, by default', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button).toBeTruthy();
  });

  it('should create an anchor internally, if routerLink is provided', () => {
    component.routerLink = 'link';
    fixture.detectChanges();

    const anchor = fixture.debugElement.query(By.css('a'));
    expect(anchor).toBeTruthy();
  });
});

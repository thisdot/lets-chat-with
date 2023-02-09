import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { MessageBoxComponent } from './message-box.component';
import { SharedModule } from '@conf-match/shared';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';
import { ClientSharedUiInputModule } from '@conf-match/client/shared/ui-input';

describe('MessageBoxComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslocoTestingModule,
        RouterTestingModule,
        FormsModule,
        SharedModule,
        SharedUiIconsModule,
        ClientSharedUiInputModule,
      ],
      declarations: [MessageBoxComponent],
      providers: [],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(MessageBoxComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call output when submitting form', () => {
    const fixture = TestBed.createComponent(MessageBoxComponent);
    const component = fixture.componentInstance;

    component.message = 'Hello world';

    spyOn(component.send, 'emit').and.callThrough();

    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', {
      preventDefault: jasmine.createSpy(),
    });

    expect(component.send.emit).toHaveBeenCalledWith('Hello world');
  });

  it('should clear message after submit', () => {
    const fixture = TestBed.createComponent(MessageBoxComponent);
    const component = fixture.componentInstance;

    component.message = 'Hello world';

    spyOn(component.send, 'emit').and.callThrough();

    fixture.detectChanges();

    component.submit({
      preventDefault: () => {},
    });

    expect(component.message).toBe(null);
  });
});

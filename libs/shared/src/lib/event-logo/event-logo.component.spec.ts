import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventLogoComponent } from './event-logo.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { getTranslocoTestingModule } from '@conf-match/client/shared/testing/util-testing';

@Component({
  selector: 'cm-event-logo-demo',
  template: ` <cm-event-logo [event]="event"></cm-event-logo> `,
})
class EventLogoDemoComponent {
  event: any;
}

describe('EventLogoComponent', () => {
  let component: EventLogoDemoComponent;
  let fixture: ComponentFixture<EventLogoDemoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule()],
      declarations: [EventLogoComponent, EventLogoDemoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventLogoDemoComponent);
    component = fixture.componentInstance;

    component.event = {
      logoUrl: 'key.jpg',
      name: 'Event',
    };

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  // TODO: update conference api to provide conferenceAvatarUrl or something like that instead of S3
  it('should render an image element referring to an S3 element', () => {
    const img = fixture.debugElement.query(By.css('img'));

    fixture.detectChanges();

    expect(img).toBeTruthy();
    expect(img.nativeElement.src).toContain('key.jpg');
    expect(img.nativeElement.alt).toEqual('Event');
  });
});

import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { NotificationType } from './utils';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cm-host',
  template: '',
})
class HostComponent {
  constructor(@Inject(DOCUMENT) public document: any, public ns: NotificationService) {}
}

const selectNotification = (component: HostComponent) => {
  const cont = component.document.querySelector('.cdk-overlay-container');
  return cont.querySelector('cm-notification');
};

const selectNotifications = (component: HostComponent) => {
  const cont = component.document.querySelector('.cdk-overlay-container');
  return [...cont.querySelectorAll('cm-notification')];
};

const getTitle = (n: HTMLElement) => n.querySelector('h6').innerText;
const getMessage = (n: HTMLElement) => n.querySelector('p').innerText;

describe('NotificationComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [OverlayModule, PortalModule, SharedUiIconsModule],
      declarations: [HostComponent, NotificationComponent],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [NotificationComponent],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a notification', () => {
    component.ns.createNotification({
      title: 'Title',
    });

    fixture.detectChanges();

    const n = selectNotification(component);
    expect(n).toBeTruthy();
    expect(getTitle(n)).toEqual('Title');
  });

  it('should create multiple notifications', () => {
    component.ns.createNotification({
      title: 'Title 1',
    });
    component.ns.createNotification({
      title: 'Title 2',
    });
    component.ns.createNotification({
      title: 'Title 3',
    });

    fixture.detectChanges();

    const ns = selectNotifications(component);
    expect(ns.length).toEqual(3);
  });

  it('should render notification message', () => {
    component.ns.createNotification({
      title: 'Title',
      message: 'Message',
    });

    fixture.detectChanges();

    const n = selectNotification(component);

    expect(getMessage(n)).toEqual('Message');
  });

  it('should have an icon, if type is provided', () => {
    component.ns.createNotification({
      title: 'Title',
      type: NotificationType.Success,
    });

    fixture.detectChanges();

    const n = selectNotification(component);
    expect(n.querySelector('cm-icon')).toBeTruthy();
  });

  it('should be removed after default TTL expires', fakeAsync(() => {
    let n: HTMLElement;
    component.ns.createNotification({
      title: 'Title',
    });

    fixture.detectChanges();

    n = selectNotification(component);
    expect(n).toBeTruthy();

    tick(10100);

    n = selectNotification(component);
    expect(n).toBeFalsy();
  }));

  it('should not be removed, if TTL is 0', fakeAsync(() => {
    component.ns.createNotification({
      title: 'Title',
      ttl: 0,
    });

    fixture.detectChanges();

    tick(10100);

    const n = selectNotification(component);
    expect(n).toBeTruthy();
  }));

  it('should support custom TTL', fakeAsync(() => {
    let n: HTMLElement;
    component.ns.createNotification({
      title: 'Title',
      ttl: 5000,
    });

    fixture.detectChanges();

    n = selectNotification(component);
    expect(n).toBeTruthy();

    tick(5100);

    n = selectNotification(component);
    expect(n).toBeFalsy();
  }));
});

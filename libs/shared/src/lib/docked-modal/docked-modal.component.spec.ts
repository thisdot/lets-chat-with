import { Component, OnInit, Inject } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { DockedModalComponent } from './docked-modal.component';
import { WindowRef } from '../window.service';
import { ModalService } from '../modal.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DOCUMENT } from '@angular/common';
import { ModalController } from '../modal.controller';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';
import { SharedUiIconsModule } from '@conf-match/shared/ui-icons';

@Component({
  selector: 'cm-content',
  template: '<p>Modal Content</p>',
})
class ContentComponent {}

@Component({
  selector: 'cm-host',
  template: '',
})
class HostComponent implements OnInit {
  ctrl: ModalController<unknown>;

  constructor(@Inject(DOCUMENT) public document: any, public modalService: ModalService) {}

  ngOnInit() {
    this.ctrl = this.modalService.openDockedModal(ContentComponent);
  }
}

const selectModal = (component: HostComponent) => {
  const cont = component.document.querySelector('.cdk-overlay-container');
  return cont.querySelector('cm-docked-modal');
};

describe('DockedModalComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PortalModule, OverlayModule, SharedUiButtonsModule, SharedUiIconsModule],
      declarations: [DockedModalComponent, ContentComponent, HostComponent],
      providers: [WindowRef, ModalService],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [DockedModalComponent, ContentComponent],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    if (component && component.ctrl) {
      component.ctrl.close();
    }
  });

  it('should create the component', () => {
    const dockedModal = selectModal(component);
    expect(dockedModal).toBeTruthy();
  });

  it('should destroy the component', () => {
    component.ctrl.close();

    const dockedModal = selectModal(component);
    expect(dockedModal).toBeFalsy();
  });

  it('should render the content', () => {
    fixture.detectChanges();

    const dockedModal = selectModal(component);
    const content = dockedModal.querySelector('cm-content');

    expect(content).toBeTruthy();
  });

  it('should close the modal on "Cancel" click', () => {
    fixture.detectChanges();

    const closeSpy = spyOn(component.ctrl, 'close');
    const dockedModal = selectModal(component);
    const button = dockedModal.querySelector('button');

    button.click();

    expect(closeSpy).toHaveBeenCalled();
  });
});

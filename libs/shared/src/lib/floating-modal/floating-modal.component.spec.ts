import { Component, OnInit, Inject } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { FloatingModalComponent } from './floating-modal.component';
import { ModalService } from '../modal.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DOCUMENT } from '@angular/common';
import { ModalController } from '../modal.controller';
import { SharedUiButtonsModule } from '@conf-match/shared/ui-buttons';

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
    this.ctrl = this.modalService.openFloatingModal(ContentComponent);
  }
}

const selectModal = (component: HostComponent) => {
  const cont = component.document.querySelector('.cdk-overlay-container');
  return cont.querySelector('cm-floating-modal');
};

describe('FloatingModalComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PortalModule, OverlayModule, SharedUiButtonsModule],
      declarations: [FloatingModalComponent, ContentComponent, HostComponent],
      providers: [ModalService],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [FloatingModalComponent, ContentComponent],
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
    const floatingModal = selectModal(component);
    expect(floatingModal).toBeTruthy();
  });

  it('should destroy the component', () => {
    component.ctrl.close();

    const floatingModal = selectModal(component);
    expect(floatingModal).toBeFalsy();
  });

  it('should render the content', () => {
    fixture.detectChanges();

    const floatingModal = selectModal(component);
    const content = floatingModal.querySelector('cm-content');

    expect(content).toBeTruthy();
  });
});

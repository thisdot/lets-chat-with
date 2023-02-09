import { fakeAsync, tick } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { ModalController } from './modal.controller';
import { ModalService } from './modal.service';

describe('ModalService', () => {
  const modalService = new ModalService(null, null, 500, 200);
  describe('Spinner', () => {
    let showSpinnerSpy: jasmine.Spy;
    let closeSpy: jasmine.Spy;
    beforeEach(() => {
      closeSpy = null;
      showSpinnerSpy = spyOn(modalService, 'showSpinner').and.callFake(() => {
        const ctrl = new ModalController<any>(null);
        closeSpy = spyOn(ctrl, 'close').and.callFake(() => {});
        return ctrl;
      });
    });

    it('should not show spinner if the request less than 200ms', fakeAsync(() => {
      const subject = modalService.initSpinner();
      const reqSub = new Subject<string>();
      subject.next({ subPerOperation: reqSub, context: {} });
      setTimeout(() => {
        reqSub.next('FINISH');
      }, 150);
      tick(700);
      expect(showSpinnerSpy).not.toHaveBeenCalled();
      expect(closeSpy).toBeFalsy();
    }));

    it('should show spinner if the request more than 200ms', fakeAsync(() => {
      const subject = modalService.initSpinner();
      const reqSub = new Subject<string>();
      subject.next({ subPerOperation: reqSub, context: {} });
      setTimeout(() => {
        reqSub.next('FINISH');
      }, 250);
      tick(250);
      expect(showSpinnerSpy).toHaveBeenCalled();
      tick(750);
      expect(closeSpy).toHaveBeenCalled();
    }));

    it('should only show one spinner if there are multiple requests at the same time', fakeAsync(() => {
      const subject = modalService.initSpinner();
      const reqSub1 = new Subject<string>();
      const reqSub2 = new Subject<string>();
      subject.next({ subPerOperation: reqSub1, context: {} });
      setTimeout(() => {
        subject.next({ subPerOperation: reqSub2, context: {} });
      }, 100);
      setTimeout(() => {
        reqSub1.next('FINISH');
      }, 250);
      setTimeout(() => {
        reqSub2.next('FINISH');
      }, 300);
      tick(200);
      expect(showSpinnerSpy.calls.count()).toEqual(1);
      expect(closeSpy).not.toHaveBeenCalled();
      tick(250);
      expect(closeSpy).not.toHaveBeenCalled();
      tick(700);
      expect(closeSpy.calls.count()).toEqual(1);
    }));
  });
});

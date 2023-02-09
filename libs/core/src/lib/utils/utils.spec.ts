import { Storage, WindowRef } from '@conf-match/shared';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { updateLocalEmailVerificationValue } from './utils';

describe('Utils', () => {
  describe('updateLocalEmailVerificationValue', () => {
    let storage: Storage;
    const StorageKey = 'aws.saf32wedfsf3rfdsf.userData';

    const setValue = (s: Storage, emailVerified: boolean) => {
      s.setItem(StorageKey, {
        UserAttributes: [{ Name: 'email_verified', Value: emailVerified }],
      });
    };

    const getValue = (s: Storage) => s.getItem(StorageKey).UserAttributes[0].Value;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [Storage, WindowRef],
      }).compileComponents();

      storage = TestBed.inject(Storage);
    }));

    it('should verify email in the storage', () => {
      setValue(storage, false);

      updateLocalEmailVerificationValue(storage, true);

      expect(getValue(storage)).toBeTruthy();
    });

    it('should de-verify email in the storage', () => {
      setValue(storage, true);

      updateLocalEmailVerificationValue(storage, false);

      expect(getValue(storage)).toBeFalsy();
    });
  });
});

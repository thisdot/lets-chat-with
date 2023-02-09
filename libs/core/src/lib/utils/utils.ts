import { Storage } from '@conf-match/shared';

export const updateLocalEmailVerificationValue = (storage: Storage, value: boolean) =>
  new Promise((resolve: Function, reject: Function) => {
    const userDataKey = Object.entries(storage.allItems())
      .find(([key]) => key.endsWith('userData'))
      .shift();

    if (!userDataKey) {
      reject('Unable to find key');
    }

    try {
      const userData = storage.getItem(userDataKey);
      userData.UserAttributes.forEach((attr) => {
        if (attr.Name === 'email_verified') {
          attr.Value = value;
        }
      });
      storage.setItem(userDataKey, userData);
      resolve();
    } catch (_) {
      reject('Unable to update');
    }
  });

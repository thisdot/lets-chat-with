import { Injectable } from '@angular/core';
import Auth from '@aws-amplify/auth';
import { from, defer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
// TODO this logic should go to @conf-match/core/amplify/auth.service.ts
export class AuthService {
  changePassword(oldPassword: string, newPassword: string) {
    return defer(() => from(Auth.currentAuthenticatedUser())).pipe(
      mergeMap((user) => from(Auth.changePassword(user, oldPassword, newPassword)))
    );
  }

  changeEmail(email: string) {
    return defer(() => from(Auth.currentAuthenticatedUser())).pipe(
      mergeMap((user) =>
        from(
          Auth.updateUserAttributes(user, {
            email,
          })
        )
      )
    );
  }

  verifyChangeEmail(code: string) {
    return defer(() => from(Auth.verifyCurrentUserAttributeSubmit('email', code)));
  }
}

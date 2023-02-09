import { generateEntries } from './entries';
import userTemplate from '../seed-templates/user';
import { CognitoUser } from '../types';

export function generateUsers(cognitoUsers: Array<CognitoUser>) {
  return cognitoUsers
    .map(({ id, email }) =>
      generateEntries(userTemplate, {
        '<ownerId>': () => [id],
        '<email>': () => [email],
      })
    )
    .flat();
}

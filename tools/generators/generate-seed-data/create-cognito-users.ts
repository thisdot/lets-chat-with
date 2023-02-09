import { cognitoCommand } from './cognito-command';
import { CognitoUser } from './types';

async function getCognitoUser({
  cognitoUserPoolId,
  email,
  profile,
}: {
  cognitoUserPoolId: string;
  email: string;
  profile: string;
}) {
  try {
    const result = await cognitoCommand('admin-get-user', {
      cognitoUserPoolId,
      params: [...(profile ? [`--profile ${profile}`] : []), `--username ${email}`],
    });
    return JSON.parse(result);
  } catch (e) {
    console.warn(`Failed to get a user '${email}' because of the following error`, e);
  }
}

async function createCognitoUser({
  cognitoUserPoolId,
  email,
  profile,
}: {
  cognitoUserPoolId: string;
  email: string;
  profile: string;
}) {
  try {
    const result = await cognitoCommand('admin-create-user', {
      cognitoUserPoolId,
      params: [
        ...(profile ? [`--profile ${profile}`] : []),
        `--username ${email}`,
        `--temporary-password TestPassword1.`,
        `--message-action SUPPRESS`,
        `--user-attributes Name=email,Value=${email} Name=email_verified,Value=True`,
      ],
    });
    await cognitoCommand('admin-set-user-password', {
      cognitoUserPoolId,
      params: [
        ...(profile ? [`--profile ${profile}`] : []),
        `--username ${email}`,
        `--password TestPassword1.`,
        `--permanent`,
      ],
    });
    return JSON.parse(result);
  } catch (e) {
    console.warn(`Failed to create a user '${email}' because of the following error`, e);
  }
}

export async function createCognitoUsers({
  emails,
  cognitoUserPoolId,
  profile,
}: {
  emails: string[];
  cognitoUserPoolId: string;
  profile: string;
}) {
  const cognitoUsers = Array<CognitoUser>();
  for (let i = 0; i < emails.length; i++) {
    const email = emails[i];
    const existingUser = await getCognitoUser({ cognitoUserPoolId, email, profile });
    if (existingUser) {
      cognitoUsers.push({ id: existingUser.Username, email });
      continue;
    }
    const result = await createCognitoUser({ cognitoUserPoolId, email, profile });
    if (result) {
      cognitoUsers.push({ id: result.User.Username, email });
    }
  }

  return cognitoUsers;
}

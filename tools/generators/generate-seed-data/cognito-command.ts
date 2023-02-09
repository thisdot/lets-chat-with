import { exec } from 'node:child_process';
import { promisify } from 'util';

const execP = promisify(exec);

type CognitoCommand =
  | 'admin-delete-user'
  | 'admin-create-user'
  | 'admin-set-user-password'
  | 'admin-get-user';

export async function cognitoCommand(
  command: CognitoCommand,
  { params = [], cognitoUserPoolId }: { params?: string[]; cognitoUserPoolId: string }
) {
  const { stdout } = await execP(
    `aws cognito-idp ${command} --user-pool-id ${cognitoUserPoolId} ${params.join(' ')}`
  );
  return stdout;
}
